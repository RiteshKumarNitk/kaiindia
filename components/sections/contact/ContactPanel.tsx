import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import type { ComingSoonCopy } from "@/lib/types";
import { ContactForm } from "./ContactForm";

type Row = { label: string; icon: IconName; value: string | null; href?: string };

/**
 * Contact page body: association details + enquiry form.
 * Only details confirmed in config/site.ts are shown; unknown ones are labelled "Awaiting confirmation".
 * The map link appears only when a verified address AND map link exist.
 */
export function ContactPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  const { email, phone, address, officeHours, mapUrl } = siteConfig.contact;
  const rows: Row[] = [
    { label: "Official address", icon: "map", value: address },
    { label: "Official email", icon: "mail", value: email, href: email ? `mailto:${email}` : undefined },
    { label: "Phone number", icon: "phone", value: phone, href: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined },
    { label: "Office hours", icon: "clock", value: officeHours },
  ];
  const anyMissing = rows.some((r) => !r.value);

  return (
    <div className="contact">
      <aside className="contact-info" aria-labelledby="contact-org">
        <div className="contact-info__brand">
          <Image
            src={siteConfig.crest.src}
            width={siteConfig.crest.width}
            height={siteConfig.crest.height}
            alt=""
            sizes="56px"
          />
          <div>
            <h2 id="contact-org">Karate Association of India (KAI)</h2>
            <p>Official communication</p>
          </div>
        </div>

        <dl className="contact-info__list">
          {rows.map((r) => (
            <div key={r.label} className={`contact-info__row${r.value ? "" : " is-pending"}`}>
              <dt>
                <Icon name={r.icon} size={18} />
                {r.label}
              </dt>
              <dd>
                {r.value ? r.href ? <a href={r.href}>{r.value}</a> : r.value : <span>Awaiting confirmation</span>}
              </dd>
            </div>
          ))}
        </dl>

        {address && mapUrl && (
          <a className="button button--ghost contact-info__map" href={mapUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="map" size={18} /> View on map
          </a>
        )}

        {anyMissing && <p className="contact-info__note">{comingSoon.description}</p>}
      </aside>

      <ContactForm endpoint={siteConfig.contactForm.endpoint} fallbackEmail={email} />
    </div>
  );
}
