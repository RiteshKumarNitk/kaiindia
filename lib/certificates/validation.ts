import { certificateTypes, type CertificateType, type VerificationInput } from "./types";

/**
 * Input validation and normalisation shared by the browser form and the server route.
 * The server ALWAYS re-validates; client checks are only for helpful messages.
 */

export const CERT_LIMITS = { serialMin: 3, serialMax: 40, nameMin: 2, nameMax: 100 } as const;

export type VerificationField = "serialNumber" | "fullName" | "aadhaarLast4";
export type VerificationErrors = Partial<Record<VerificationField | "certificateType", string>>;

/** Removes control characters and surrounding whitespace. */
const clean = (v: string) => v.replace(/[\u0000-\u001F\u007F]/g, " ").trim();

/** Names: letters from any script plus spaces, apostrophes, hyphens and full stops. */
const NAME = /^[^\d!"#$%&()*+,/:;<=>?@[\]\\^_`{|}~]+$/;

/**
 * Serial numbers: letters, digits, hyphens and slashes, starting with a letter or digit.
 * KAI has not yet confirmed its serial format; tighten this once it does.
 */
const SERIAL = /^[A-Z0-9][A-Z0-9/-]*$/;

/** Canonical serial: upper case, spaces removed (e.g. "kai/pl 2026-001" → "KAI/PL2026-001"). */
export function normaliseSerial(raw: string): string {
  return clean(raw).normalize("NFKC").toUpperCase().replace(/\s+/g, "");
}

/**
 * Canonical name for comparison only (never displayed): Unicode NFKC, lower case,
 * full stops removed, whitespace collapsed. "Dr.  Ravi  KUMAR" → "dr ravi kumar".
 */
export function normaliseName(raw: string): string {
  return clean(raw)
    .normalize("NFKC")
    .toLocaleLowerCase("en-IN")
    .replace(/\./g, " ")
    .replace(/\s*([-'’])\s*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCertificateType(v: unknown): v is CertificateType {
  return typeof v === "string" && (certificateTypes as readonly string[]).includes(v);
}

export function validateVerification(raw: {
  certificateType?: unknown;
  serialNumber?: unknown;
  fullName?: unknown;
  aadhaarLast4?: unknown;
}): { ok: true; value: VerificationInput } | { ok: false; errors: VerificationErrors } {
  const errors: VerificationErrors = {};
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  if (!isCertificateType(raw.certificateType)) errors.certificateType = "Please choose Player or Coach certificate.";

  const serial = normaliseSerial(str(raw.serialNumber));
  if (!serial) errors.serialNumber = "Please enter the certificate serial number.";
  else if (serial.length < CERT_LIMITS.serialMin || serial.length > CERT_LIMITS.serialMax || !SERIAL.test(serial))
    errors.serialNumber = `Use ${CERT_LIMITS.serialMin}–${CERT_LIMITS.serialMax} letters, numbers, hyphens or slashes, exactly as printed on the certificate.`;

  const name = clean(str(raw.fullName)).replace(/\s+/g, " ");
  if (!name) errors.fullName = "Please enter the full name as printed on the certificate.";
  else if (name.length < CERT_LIMITS.nameMin || name.length > CERT_LIMITS.nameMax || !NAME.test(name))
    errors.fullName = `Use letters, spaces, apostrophes, hyphens or full stops (${CERT_LIMITS.nameMin}–${CERT_LIMITS.nameMax} characters).`;

  const last4 = str(raw.aadhaarLast4).trim();
  if (!last4) errors.aadhaarLast4 = "Please enter the last 4 digits of the certificate holder's Aadhaar.";
  else if (!/^\d{4}$/.test(last4)) errors.aadhaarLast4 = "Enter exactly 4 digits (0–9).";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    value: {
      certificateType: raw.certificateType as CertificateType,
      serialNumber: serial,
      fullName: name,
      aadhaarLast4: last4,
    },
  };
}
