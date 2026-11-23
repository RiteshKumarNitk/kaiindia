import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import type { ComingSoonCopy } from "@/lib/types";

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
        <Image src={siteConfig.crest.src} width={siteConfig.crest.width} height={siteConfig.crest.height} alt="" sizes="56px" />
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
