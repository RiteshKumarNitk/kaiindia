import { siteConfig } from "@/config/site";
import { formatINR, membershipConfig } from "@/content/membership";
import type { ApplicationType, InfoSection, MembershipCategory } from "@/lib/types";
import { MembershipForm } from "./MembershipForm";

/** Club / Academy membership page body: application form + fee table + information still pending. */
export function MembershipPanel({ category, sections }: { category: MembershipCategory; sections: InfoSection[] }) {
  const { fees, applicationTypes, validity, categories } = membershipConfig;
  const pending = sections.filter((s) => s.status !== "published");

  return (
    <div className="membership">
      <MembershipForm
        defaultCategory={category}
        endpoint={siteConfig.membershipForm.endpoint}
        fallbackEmail={siteConfig.contact.email}
      />

      <aside className="membership__aside" aria-labelledby="fees-heading">
        <section className="fee-card">
          <h2 id="fees-heading" className="fee-card__title">
            {categories[category].label} membership fees
          </h2>
          <dl className="fee-card__list">
            {(Object.keys(fees) as ApplicationType[]).map((t) => (
              <div key={t}>
                <dt>{applicationTypes[t].label}</dt>
                <dd>
                  <strong>{formatINR(fees[t])}</strong> <span>for {validity}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="fee-card__note">Fees are shown for information. No payment is collected on this website.</p>
        </section>

        {pending.length > 0 && (
          <section className="fee-card fee-card--muted" aria-labelledby="pending-heading">
            <h2 id="pending-heading" className="fee-card__title">
              Still to be published
            </h2>
            <ul className="plain-list">
              {pending.map((s) => (
                <li key={s.id}>
                  <strong>{s.title}.</strong> {s.pending}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  );
}
