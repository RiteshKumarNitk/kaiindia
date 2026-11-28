import { createHash } from "node:crypto";
import { certificateVerificationAvailable, getAadhaarHmacKey, getCertificateRepository } from "@/lib/certificates/repository";
import type { VerificationResponse } from "@/lib/certificates/types";
import { validateVerification } from "@/lib/certificates/validation";
import { verifyCertificate } from "@/lib/certificates/verify";
import { createRateLimiter } from "@/lib/rate-limit";

/**
 * POST /api/certificate-verification
 *
 * Verifies a KAI Player/Coach certificate against the authorised certificate store.
 * - Same-origin requests only; JSON body up to 2 KB; honeypot field for simple bots.
 * - Rate limited per client (5 per minute and 20 per hour).
 * - Server-side validation; all four fields must match; generic result on any mismatch.
 * - Responds { result: "unavailable" } (503) until a real store is connected — it never
 *   invents a result. Request bodies (names, Aadhaar digits) are never logged or stored.
 */

const perMinute = createRateLimiter({ limit: 5, windowMs: 60_000 });
const perHour = createRateLimiter({ limit: 20, windowMs: 60 * 60_000 });
const MAX_BODY = 2048;

const headers = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
  "X-Content-Type-Options": "nosniff",
};

function reply(body: VerificationResponse, status: number, extra?: Record<string, string>) {
  return Response.json(body, { status, headers: { ...headers, ...extra } });
}

/** Opaque per-client key: a hash of the forwarded IP, never the raw address. */
function clientKey(request: Request): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
  return createHash("sha256").update(`kai-rl:${ip}`).digest("hex").slice(0, 32);
}

function sameOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients are still rate limited
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host"));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply({ result: "invalid_request" }, 403);

  const key = clientKey(request);
  for (const limiter of [perMinute, perHour]) {
    const r = limiter(key);
    if (!r.ok) return reply({ result: "rate_limited", retryAfterSeconds: r.retryAfterSeconds }, 429, { "Retry-After": String(r.retryAfterSeconds) });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return reply({ result: "invalid_request" }, 415);
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY) return reply({ result: "invalid_request" }, 413);

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return reply({ result: "invalid_request" }, 413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply({ result: "invalid_request" }, 400);
    body = parsed as Record<string, unknown>;
  } catch {
    return reply({ result: "invalid_request" }, 400);
  }

  // Honeypot: a hidden field real visitors never fill. Give bots the generic answer.
  if (typeof body.website === "string" && body.website.length > 0) return reply({ result: "not_verified" }, 200);

  const checked = validateVerification(body);
  if (!checked.ok) return reply({ result: "invalid_request" }, 400);

  const repository = getCertificateRepository();
  const secret = getAadhaarHmacKey();
  if (!certificateVerificationAvailable() || !repository || !secret) return reply({ result: "unavailable" }, 503);

  try {
    const result = await verifyCertificate(checked.value, repository, secret);
    return reply(result, 200);
  } catch {
    // Deliberately no request details in logs.
    console.error("[certificate-verification] lookup failed");
    return reply({ result: "unavailable" }, 503);
  }
}
