import { createHmac, timingSafeEqual } from "node:crypto";
import type { CertificateRecord, CertificateStatus, PublicCertificate, VerificationInput, VerificationResponse } from "./types";
import { normaliseName, normaliseSerial } from "./validation";

/**
 * Server-side certificate matching. Pure functions (no I/O) so they can be unit-tested with a
 * test repository; the route handler supplies the real repository and secret.
 */

/** Looks up ONE record by exact type + canonical serial. Never by name alone. */
export interface CertificateLookup {
  findBySerial(certificateType: CertificateRecord["certificateType"], serialNumber: string): Promise<CertificateRecord | null>;
}

/**
 * Aadhaar last-4 fingerprint stored in place of the digits.
 * A plain hash of 4 digits is trivially reversible (10,000 possibilities), so this is an HMAC
 * keyed with a server-only secret and bound to the serial number, so equal digits on two
 * certificates give different values. The digits themselves are never stored or logged.
 */
export function hashAadhaarLast4(secret: string, serialNumber: string, last4: string): string {
  return createHmac("sha256", secret).update(`kai-cert-v1:${normaliseSerial(serialNumber)}:${last4}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  if (x.length !== y.length) {
    timingSafeEqual(x, x); // keep timing similar
    return false;
  }
  return timingSafeEqual(x, y);
}

const isoDate = (d?: Date) => (d && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : null);

/** Actual status: an ACTIVE record past its expiry date is reported as EXPIRED. */
export function effectiveStatus(record: CertificateRecord, now: Date): CertificateStatus {
  if (record.status === "REVOKED") return "REVOKED";
  if (record.status === "EXPIRED") return "EXPIRED";
  if (record.expiryDate && record.expiryDate.getTime() < now.getTime()) return "EXPIRED";
  return "ACTIVE";
}

export function toPublicCertificate(record: CertificateRecord, now: Date): PublicCertificate {
  return {
    certificateType: record.certificateType,
    serialNumber: record.serialNumber,
    holderName: record.fullName,
    issueDate: isoDate(record.issueDate),
    validUntil: isoDate(record.expiryDate),
    status: effectiveStatus(record, now),
  };
}

/**
 * Verifies a certificate against the authorised store.
 * All four inputs must match: type, serial, normalised name and Aadhaar last 4. Records without
 * an Aadhaar fingerprint cannot be verified (policy: the last-4 check is mandatory).
 * Any mismatch, or an unknown serial, gives the same generic `not_verified` result.
 */
export async function verifyCertificate(
  input: VerificationInput,
  lookup: CertificateLookup,
  secret: string,
  now: Date = new Date(),
): Promise<Extract<VerificationResponse, { result: "verified" | "not_verified" }>> {
  const serial = normaliseSerial(input.serialNumber);
  const record = await lookup.findBySerial(input.certificateType, serial);

  // Always compute the HMAC so unknown serials take about as long as known ones.
  const presented = hashAadhaarLast4(secret, serial, input.aadhaarLast4);
  if (!record) return { result: "not_verified" };

  const typeOk = record.certificateType === input.certificateType;
  const serialOk = normaliseSerial(record.serialNumber) === serial;
  const nameOk = normaliseName(record.fullName) === normaliseName(input.fullName);
  const aadhaarOk = Boolean(record.aadhaarLast4Hash) && safeEqual(record.aadhaarLast4Hash ?? "", presented);

  if (!(typeOk && serialOk && nameOk && aadhaarOk)) return { result: "not_verified" };
  return { result: "verified", certificate: toPublicCertificate(record, now) };
}
