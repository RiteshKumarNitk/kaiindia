import { ComingSoon } from "@/components/ui/ComingSoon";
import { isPublished } from "@/lib/content-status";
import type { ComingSoonCopy, InfoSection } from "@/lib/types";

export function GovernancePanel({ topics, comingSoon }: { topics: InfoSection[]; comingSoon: ComingSoonCopy }) {
  return (
    <>
      <ComingSoon {...comingSoon} variant="compact" />
      <section aria-labelledby="gov-heading">
        <h2 id="gov-heading" className="section-title">
          What will be published here
        </h2>
        <dl className="topic-list">
          {topics.map((t) => (
            <div key={t.id} className="topic">
              <dt>{t.title}</dt>
              <dd>{isPublished(t) ? t.body?.join(" ") : t.pending}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
