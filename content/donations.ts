/**
 * Donation bank details. The client has supplied only the bank name (25 Nov 2026).
 *
 * Account details are shown on /donations ONLY when every field below is filled in AND
 * `verified` is true (confirmed in writing by the association, e.g. via a cancelled cheque or
 * bank letter). Never guess or partially publish account numbers or IFSC codes, and do not add
 * payment QR codes until the account is confirmed.
 */
export type BankDetails = {
  bankName: string;
  accountHolder: string | null;
  accountNumber: string | null;
  ifsc: string | null;
  branch: string | null;
  /** Optional, e.g. "Current account". */
  accountType: string | null;
  verified: boolean;
};

export const bankDetails: BankDetails = {
  bankName: "IDFC Bank",
  accountHolder: "Karate Association of India", // supplied by the client, 25 Nov 2026
  accountNumber: null,
  ifsc: null,
  branch: null,
  accountType: null,
  verified: false,
};

/**
 * True when the full account can be published (all required fields present and verified).
 * The bank name and account holder name are shown as soon as they are supplied; the account
 * number, IFSC, branch and type only when this returns true.
 */
export function bankDetailsPublishable(b: BankDetails): boolean {
  return b.verified && Boolean(b.accountHolder && b.accountNumber && b.ifsc && b.branch);
}
