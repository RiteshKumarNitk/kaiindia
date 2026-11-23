import { isPublished } from "@/lib/content-status";
import type { InfoSection } from "@/lib/types";

/** Numbered process steps (club and academy membership). */
export function ProcessSteps({ sections, heading }: { sections: InfoSection[]; heading: string }) {
  return (
    <section aria-labelledby="process-heading" className="process">
      <h2 id="process-heading" className="section-title">
        {heading}
      </h2>
      <ol className="steps">
        {sections.map((s) => (
          <li key={s.id} className={`step${isPublished(s) ? " is-live" : ""}`}>
            <h3 className="step__title">{s.title}</h3>
            {isPublished(s) ? (
              s.body?.map((p) => <p key={p.slice(0, 24)}>{p}</p>)
            ) : (
              <p className="step__pending">{s.pending}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
