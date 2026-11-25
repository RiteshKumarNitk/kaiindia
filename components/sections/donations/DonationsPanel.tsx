import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { bankDetails, bankDetailsPublishable } from "@/content/donations";
import type { ComingSoonCopy } from "@/lib/types";

/**
 * Donations page body: bank details card. Account fields are shown only when fully verified
 * (content/donations.ts); otherwise only the bank name and account holder name appear, with a verification notice.
 */
export function DonationsPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const live = bankDetailsPublishable(bankDetails);
  const rows: { label: string; value: string | null }[] = [
    { label: "Bank Name", value: bankDetails.bankName },
    // Bank and account holder names are not sensitive; shown once supplied.
    { label: "Account Holder Name", value: bankDetails.accountHolder },
    { label: "Account Number", value: live ? bankDetails.accountNumber : null },
    { label: "IFSC Code", value: live ? bankDetails.ifsc : null },
    { label: "Branch", value: live ? bankDetails.branch : null },
    ...(live && bankDetails.accountType ? [{ label: "Account Type", value: bankDetails.accountType }] : []),
  ];
  const email = siteConfig.contact.email;

  return (
    <div className="narrow donations">
      <section className="bank-card" aria-labelledby="bank-heading">
        <div className="bank-card__head">
          <span className="bank-card__icon" aria-hidden="true">
            <Icon name="heart" size={22} />
          </span>
          <h2 id="bank-heading">Bank Details</h2>
        </div>
        <dl className="bank-card__list">
          {rows.map((r) => (
            <div key={r.label} className={r.value ? undefined : "is-pending"}>
              <dt>{r.label}</dt>
              <dd>{r.value ?? <span>Awaiting verification</span>}</dd>
            </div>
          ))}
        </dl>
        {!live && (
          <p className="bank-card__notice" role="note">
            <strong>Bank account details will be published after verification.</strong> Online donation facilities are
            not yet available.
          </p>
        )}
      </section>

      <p className="fine-print">{comingSoon.description}</p>
      <p className="fine-print">
        Any announcement about donations will be made on the <Link href="/media/news">News</Link> page. For enquiries,
        see <Link href="/contact">Contact Us</Link>
        {email && (
          <>
            {" "}
            or email <a href={`mailto:${email}`}>{email}</a>
          </>
        )}
        .
      </p>
    </div>
  );
}
