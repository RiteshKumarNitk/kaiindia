import { ComingSoon } from "@/components/ui/ComingSoon";
import type { ComingSoonCopy } from "@/lib/types";

/**
 * Overview of a planned sign-in portal. No sign-in form is shown: nothing on this page
 * suggests that accounts exist or that credentials can be entered.
 */
export function PortalPreview({
  role,
  features,
  comingSoon,
}: {
  role: "Athlete" | "Coach";
  features: string[];
  comingSoon: ComingSoonCopy;
}) {
  const id = role.toLowerCase();
  return (
    <div className="split">
      <section aria-labelledby={`${id}-features`}>
        <h2 id={`${id}-features`} className="section-title">
          What the {id} portal will offer
        </h2>
        <ul className="tick-list">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="fine-print">Planned features are indicative and subject to the association&apos;s approval.</p>
      </section>
      <ComingSoon {...comingSoon} variant="section" icon="user" />
    </div>
  );
}
