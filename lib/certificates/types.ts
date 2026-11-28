/**
 * Certificate verification — shared types.
 *
 * Only `PublicCertificate` ever leaves the server. `CertificateRecord` lives in the authorised
 * KAI certificate store (not yet provided) and is never sent to the browser.
 * See docs/certificate-verification.md.
 */

export const certificateTypes = ["PLAYER", "COACH"] as const;
export type CertificateType = (typeof certificateTypes)[number];

export const certificateTypeLabels: Record<CertificateType, string> = {
  PLAYER: "Player Certificate",
  COACH: "Coach Certificate",
};

export type CertificateStatus = "ACTIVE" | "EXPIRED" | "REVOKED";

/** One row in the authorised certificate store (server-side only). */
export type CertificateRecord = {
  id: string;
  /** Unique per certificate type; stored in canonical form (see normaliseSerial). */
  serialNumber: string;
  certificateType: CertificateType;
  fullName: string;
  /**
   * HMAC-SHA256 of the holder's Aadhaar last four digits, keyed with a server-side secret and
   * bound to the serial number (see hashAadhaarLast4). Never the digits themselves.
   */
  aadhaarLast4Hash?: string;
  issueDate?: Date;
  expiryDate?: Date;
  status: CertificateStatus;
};

/** Visitor input after validation and normalisation. */
export type VerificationInput = {
  certificateType: CertificateType;
  serialNumber: string;
  fullName: string;
  aadhaarLast4: string;
};

/** The only certificate fields approved for public display. No Aadhaar data, no internal id. */
export type PublicCertificate = {
  certificateType: CertificateType;
  serialNumber: string;
  holderName: string;
  /** ISO date (YYYY-MM-DD), when recorded. */
  issueDate: string | null;
  /** ISO date (YYYY-MM-DD), when recorded. */
  validUntil: string | null;
  status: CertificateStatus;
};

/** JSON body returned by POST /api/certificate-verification. */
export type VerificationResponse =
  | { result: "verified"; certificate: PublicCertificate }
  /** Generic: never says which field did not match, or whether the serial exists. */
  | { result: "not_verified" }
  | { result: "unavailable" }
  | { result: "rate_limited"; retryAfterSeconds: number }
  | { result: "invalid_request" };
