import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Icon } from "@/components/ui/Icon";
import { pageLabel, pageSummary } from "@/content/pages";
import { isPublished } from "@/lib/content-status";
import type { ComingSoonCopy, InfoSection, RoutePath } from "@/lib/types";

/** Long-form article with an "On this page" contents list (About KAI, About Karate). */
export function InfoSections({
  sections,
  pending,
  related,
}: {
  sections: InfoSection[];
  pending?: ComingSoonCopy;
  related?: { title: string; links: RoutePath[] };
}) {
  const live = sections.filter(isPublished);
  return (
    <div className="article-layout">
      <nav className="toc" aria-label="On this page">
        <p className="toc__title">On this page</p>
        <ol>
          {live.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="article">
        {live.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`}>{s.title}</h2>
            {s.body?.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </section>
        ))}
        {related && (
          <nav aria-labelledby="related-heading" className="related">
            <h2 id="related-heading" className="related__title">
              {related.title}
            </h2>
            <ul className="link-list">
              {related.links.map((href) => (
                <li key={href}>
                  <Link href={href} className="link-row">
                    <span className="link-row__text">
                      <span className="link-row__title">{pageLabel(href)}</span>
                      <span className="link-row__desc">{pageSummary(href)}</span>
                    </span>
                    <Icon name="arrow" className="link-row__arrow" size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {pending && <ComingSoon {...pending} variant="section" icon="shield" />}
      </div>
    </div>
  );
}
