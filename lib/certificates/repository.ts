import "server-only";
import type { CertificateLookup } from "./verify";

/**
 * Connection point for the authorised KAI certificate store.
 *
 * STATUS: no certificate database has been provided or approved, so this returns null and
 * public verification stays disabled ("Online certificate verification will be available soon").
 *
 * To connect a real store (see docs/certificate-verification.md):
 *   1. Provision an approved database in India-region hosting with restricted, read-only
 *      credentials for this lookup (server-side environment variables only).
 *   2. Implement CertificateLookup.findBySerial as a parameterised query on the unique
 *      (certificate_type, serial_number) key — never a search by name.
 *   3. Set CERTIFICATE_AADHAAR_HMAC_KEY (32+ random bytes) — the same key used when importing.
 *   4. Return the implementation below, rebuild and redeploy (with approval).
 *
 * Never import fixtures or sample records here: a verification result must come from real records.
 */
export function getCertificateRepository(): CertificateLookup | null {
  return null;
}

/** Server-side secret for Aadhaar last-4 fingerprints. Never exposed to the browser. */
export function getAadhaarHmacKey(): string | null {
  const key = process.env.CERTIFICATE_AADHAAR_HMAC_KEY;
  return key && key.length >= 32 ? key : null;
}

/** True only when a real certificate store AND the server secret are both configured. */
export function certificateVerificationAvailable(): boolean {
  return getCertificateRepository() !== null && getAadhaarHmacKey() !== null;
}
