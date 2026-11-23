import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getPage, pageLabel, pageSummary } from "@/content/pages";
import type { ComingSoonCopy, PageBody, RoutePath } from "@/lib/types";

type Hub = Extract<PageBody, { kind: "hub" }>;

/** Row-style link used by directory and editorial layouts. */
function LinkRow({ href }: { href: RoutePath }) {
  return (
    <li>
      <Link href={href} className="link-row">
        <span className="link-row__text">
          <span className="link-row__title">{pageLabel(href)}</span>
          <span className="link-row__desc">{pageSummary(href)}</span>
        </span>
        <Icon name="arrow" className="link-row__arrow" size={18} />
      </Link>
    </li>
  );
}

function Editorial({ hub, pending }: { hub: Hub; pending: ComingSoonCopy }) {
  return (
    <div className="editorial">
      <div className="editorial__main">
        <h2 className="section-title">The association</h2>
        <p className="lead">
          This section will set out who we are, what we do for karate in India and how the association works with
          athletes, coaches, officials and clubs.
        </p>
        <ComingSoon {...pending} variant="compact" headingLevel={3} />
      </div>
      <div className="editorial__aside">
        {hub.groups.map((g) => (
          <nav key={g.title} aria-label={g.title} className="link-group">
            {g.title && <h2 className="link-group__title">{g.title}</h2>}
            <ul className="link-list">
              {g.links.map((href) => (
                <LinkRow key={href} href={href} />
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </div>
  );
}

function Directory({ hub }: { hub: Hub }) {
  return (
    <div className="directory">
      {hub.groups.map((g) => (
        <section key={g.title} className="directory__group" aria-labelledby={`dir-${g.title}`}>
          <h2 id={`dir-${g.title}`} className="directory__heading">
            {g.title}
          </h2>
          <ul className="link-list link-list--grid">
            {g.links.map((href) => (
              <LinkRow key={href} href={href} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const featureIcons: Partial<Record<RoutePath, IconName>> = {
  "/media/news": "news",
  "/media/photo-gallery": "photo",
  "/media/video-gallery": "video",
};

function Features({ hub }: { hub: Hub }) {
  return (
    <ul className="feature-grid">
      {hub.groups.flatMap((g) => g.links).map((href) => (
        <li key={href}>
          <Link href={href} className="feature">
            <span className="feature__icon">
              <Icon name={featureIcons[href] ?? "file"} size={26} />
            </span>
            <span className="feature__title">{pageLabel(href)}</span>
            <span className="feature__desc">{pageSummary(href)}</span>
            <span className="feature__cta">
              Open {pageLabel(href).toLowerCase()} <Icon name="arrow" size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Documents({ hub }: { hub: Hub }) {
  return (
    <section aria-labelledby="collections">
      <h2 id="collections" className="section-title">
        Document collections
      </h2>
      <ul className="resource-list">
        {hub.groups.flatMap((g) => g.links).map((href) => (
          <li key={href}>
            <Link href={href} className="resource">
              <span className="resource__icon">
                <Icon name="file" size={22} />
              </span>
              <span className="resource__text">
                <span className="resource__title">{pageLabel(href)}</span>
                <span className="resource__desc">{pageSummary(href)}</span>
              </span>
              <span className="resource__cta">
                View <Icon name="arrow" size={16} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Pathways({ hub }: { hub: Hub }) {
  return (
    <ul className="pathways">
      {hub.groups.flatMap((g) => g.links).map((href) => {
        const page = getPage(href);
        const steps = page.body.kind === "membership" ? page.body.sections.map((s) => s.title) : [];
        return (
          <li key={href} className="pathway">
            <p className="eyebrow">{page.eyebrow.split("·").pop()?.trim()}</p>
            <h2 className="pathway__title">
              <Link href={href}>{page.title}</Link>
            </h2>
            <p className="pathway__desc">{pageSummary(href)}</p>
            {steps.length > 0 && (
              <ol className="pathway__steps" aria-label="Information to be published">
                {steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            )}
            <span className="pathway__cta" aria-hidden="true">
              View details <Icon name="arrow" size={16} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Section landing page. One contextual empty-state notice plus a layout suited to the section. */
export function HubView({ hub, comingSoon }: { hub: Hub; comingSoon: ComingSoonCopy }) {
  const pending = hub.pending ?? comingSoon;
  if (hub.layout === "editorial") return <Editorial hub={hub} pending={pending} />;
  return (
    <>
      <ComingSoon {...pending} variant="compact" />
      {hub.layout === "directory" && <Directory hub={hub} />}
      {hub.layout === "features" && <Features hub={hub} />}
      {hub.layout === "documents" && <Documents hub={hub} />}
      {hub.layout === "pathways" && <Pathways hub={hub} />}
    </>
  );
}
