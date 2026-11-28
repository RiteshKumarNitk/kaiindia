/**
 * Simple fixed-window rate limiter held in server memory.
 *
 * Suitable for a single server process. On serverless or multi-instance hosting each instance
 * keeps its own counters, so replace this with a shared store (e.g. Redis) before relying on it
 * in production. Keys should be opaque (e.g. a hashed IP) — never personal data.
 */
type Bucket = { count: number; resetAt: number };

export type RateLimitResult = { ok: true; remaining: number } | { ok: false; retryAfterSeconds: number };

export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const buckets = new Map<string, Bucket>();

  return function check(key: string, now: number = Date.now()): RateLimitResult {
    let b = buckets.get(key);
    if (!b || b.resetAt <= now) {
      if (buckets.size >= maxKeys) {
        for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
        if (buckets.size >= maxKeys) buckets.delete(buckets.keys().next().value as string);
      }
      b = { count: 0, resetAt: now + windowMs };
      buckets.set(key, b);
    }
    b.count += 1;
    if (b.count > limit) return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((b.resetAt - now) / 1000)) };
    return { ok: true, remaining: limit - b.count };
  };
}
