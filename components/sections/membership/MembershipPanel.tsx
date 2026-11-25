import { siteConfig } from "@/config/site";
import { membershipConfig } from "@/content/membership";
import type { InfoSection, MembershipCategory } from "@/lib/types";
import { MembershipForm } from "./MembershipForm";

/**
 * Club / Academy membership page body: two-step application form + "how to apply" card +
 * information still pending. Fee amounts are deliberately NOT shown here (client request,
 * 25 Nov 2026); they appear only on the form's second step.
 */
export function MembershipPanel({ category, sections }: { category: MembershipCategory; sections: InfoSection[] }) {
  const { applicationTypes, validity, categories } = membershipConfig;
  const pending = sections.filter((s) => s.status !== "published");

  return (
    <div className="membership">
      <MembershipForm
        defaultCategory={category}
        endpoint={siteConfig.membershipForm.endpoint}
        fallbackEmail={siteConfig.contact.email}
      />

      <aside className="membership__aside" aria-labelledby="howto-heading">
        <section className="fee-card">
          <h2 id="howto-heading" className="fee-card__title">
            How to apply
          </h2>
          <ol className="how-to">
            <li>
              <strong>Applicant details.</strong> Choose {categories[category].label.toLowerCase()} membership —{" "}
              {applicationTypes.new.label.toLowerCase()} or {applicationTypes.renewal.label.toLowerCase()} — and fill in
              your details.
            </li>
            <li>
              <strong>Fee &amp; payment.</strong> The applicable fee is shown on the next step. Membership is valid for{" "}
              {validity}.
            </li>
          </ol>
          <p className="fee-card__note">No payment is collected on this website.</p>
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
