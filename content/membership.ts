import type { ApplicationType, MembershipCategory } from "@/lib/types";

/**
 * Membership fees and form labels — the single source of truth for membership amounts.
 * Supplied by the client, 25 November 2026: the same fees apply to Club and Academy membership.
 *
 * The browser only displays these amounts. A future server-side endpoint must calculate the
 * fee itself from `category` + `applicationType` and never trust an amount sent by the browser.
 */
export const membershipConfig = {
  currency: "INR",
  validity: "1 year",
  fees: {
    new: 5100,
    renewal: 3100,
  } satisfies Record<ApplicationType, number>,
  categories: {
    club: { label: "Club", orgLabel: "Club Name" },
    academy: { label: "Academy", orgLabel: "Academy Name" },
  } satisfies Record<MembershipCategory, { label: string; orgLabel: string }>,
  applicationTypes: {
    new: { label: "New Membership", feeLabel: "Membership Fee" },
    renewal: { label: "Membership Renewal", feeLabel: "Renewal Fee" },
  } satisfies Record<ApplicationType, { label: string; feeLabel: string }>,
} as const;

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

/** Formats a whole-rupee amount, e.g. 5100 → "₹5,100". */
export const formatINR = (amount: number) => inr.format(amount);
