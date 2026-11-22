import Image from "next/image";
import Link from "next/link";
import { ComingSoon } from "@/components/shared/ComingSoon";
import { Icon } from "@/components/shared/Icon";
import { chairmanMessage, isPublished } from "@/lib/content-data";
import { pageLabel, pageSummary } from "@/lib/page-content";
import { siteConfig } from "@/lib/site-config";
import type { ComingSoonCopy, InfoSection, RoutePath } from "@/lib/types";

/* ------------------------------------------- Long-form article (About Karate) */

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

/* ------------------------------------------------ Process steps (membership) */

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

/* ------------------------------------------------------ Chairman's message */

export function MessagePanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const msg = chairmanMessage;
  if (!isPublished(msg) || msg.paragraphs.length === 0) {
    return <ComingSoon {...comingSoon} variant="section" />;
  }
  const [first, ...rest] = msg.paragraphs;
  return (
    <article className="leader-message" aria-labelledby="message-signature">
      {msg.portrait && msg.name && (
        <Image
          src={msg.portrait}
          alt={`Portrait of ${msg.name}`}
          width={360}
          height={440}
          className="leader-message__portrait"
        />
      )}
      <div className="leader-message__body">
        <span className="leader-message__mark" aria-hidden="true">
          “
        </span>
        <p className="leader-message__lead">{first}</p>
        {rest.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        {msg.name && (
          <footer className="leader-message__sign" id="message-signature">
            <span className="leader-message__rule" aria-hidden="true" />
            <strong>{msg.name}</strong>
            {msg.designation && <span>{msg.designation}</span>}
          </footer>
        )}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- Policies */

export function PolicyPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  return (
    <div className="narrow">
      <ComingSoon {...comingSoon} variant="section" icon="file" label="Document pending" />
      <p className="fine-print">
        Related: <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/refund-policy">Refund Policy</Link> ·{" "}
        <Link href="/rti-governance">RTI &amp; Governance</Link>
      </p>
    </div>
  );
}

/* --------------------------------------------------------------- Donations */

export function DonationsPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  return (
    <div className="narrow">
      <ComingSoon {...comingSoon} variant="section" icon="heart" />
      <p className="fine-print">
        Any future announcement about donations will be made on the <Link href="/media/news">News</Link> page. For
        enquiries, see <Link href="/contact">Contact Us</Link>.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------- Governance */

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

/* ----------------------------------------------------------------- Contact */

export function ContactPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const { email, phone, address } = siteConfig.contact;
  const rows = [
    { label: "Address", value: address, icon: "map" as const },
    { label: "Email", value: email, href: email ? `mailto:${email}` : undefined, icon: "mail" as const },
    { label: "Phone", value: phone, href: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined, icon: "phone" as const },
  ].filter((r) => r.value);

  return (
    <section className="contact-card" aria-labelledby="contact-heading">
      <div className="contact-card__brand">
        <Image src={siteConfig.crest.src} width={siteConfig.crest.width} height={siteConfig.crest.height} alt="" unoptimized />
        <div>
          <h2 id="contact-heading">{siteConfig.name}</h2>
          <p>Official correspondence</p>
        </div>
      </div>
      {rows.length > 0 ? (
        <dl className="contact-card__list">
          {rows.map((r) => (
            <div key={r.label}>
              <dt>
                <Icon name={r.icon} size={18} /> {r.label}
              </dt>
              <dd>{r.href ? <a href={r.href}>{r.value}</a> : r.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="contact-card__pending">
          <p className="empty-state__label">Coming soon</p>
          <p>{comingSoon.description}</p>
        </div>
      )}
    </section>
  );
}
