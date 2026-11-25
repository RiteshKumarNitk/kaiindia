import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { Region } from "@/content/states";
import type { StateAssociation } from "@/lib/types";

/** Neutral banner placeholder for states whose approved banner has not been supplied. */
function BannerPlaceholder({ regionName }: { regionName: string }) {
  return (
    <div className="assoc-banner assoc-banner--placeholder" role="img" aria-label={`${regionName}: state association banner awaited`}>
      <span className="assoc-banner__stripes" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="assoc-banner__placeholder-text">State Association Banner Awaited</span>
    </div>
  );
}

const telHref = (phone: string) => `tel:+91${phone.replace(/\D/g, "").replace(/^(?:91|0)(?=\d{10}$)/, "")}`;

/**
 * Details for one state/UT association: header, banner (full aspect ratio, never cropped),
 * officials and contact links. Unknown fields are omitted — never shown as empty labels.
 */
export function StateAssociationDetails({ region, association }: { region: Region; association: StateAssociation }) {
  const live = association.status === "published";
  const officials = live ? (association.officials ?? []) : [];
  const phones = live ? (association.phones ?? []) : [];
  const hasContact = phones.length > 0 || (live && (association.email || association.website));

  return (
    <article className="assoc" aria-labelledby="assoc-title">
      <header className="assoc__head">
        <p className="eyebrow">{region.kind === "ut" ? "Union Territory" : "State"}</p>
        <h3 id="assoc-title" className="assoc__state">
          {region.name}
        </h3>
        {live && association.associationName && (
          <p className="assoc__name">
            {association.associationName}
            {association.abbreviation && <span className="assoc__abbr"> ({association.abbreviation})</span>}
          </p>
        )}
      </header>

      {live && association.banner ? (
        <div className="assoc-banner">
          <Image
            src={association.banner.src}
            width={association.banner.width}
            height={association.banner.height}
            alt={`Official banner of the ${association.associationName ?? `${region.name} karate association`}`}
            sizes="(max-width: 76rem) 100vw, 76rem"
            className="assoc-banner__img"
          />
        </div>
      ) : (
        <BannerPlaceholder regionName={region.name} />
      )}

      {!live && (
        <p className="assoc__pending">Official association details for {region.name} will be published soon.</p>
      )}

      {(officials.length > 0 || hasContact) && (
        <div className="assoc__grid">
          {officials.length > 0 && (
            <section aria-labelledby="assoc-officials">
              <h4 id="assoc-officials" className="assoc__label">
                Officials
              </h4>
              <dl className="assoc__list">
                {officials.map((o) => (
                  <div key={`${o.role}-${o.name}`}>
                    <dt>{o.role}</dt>
                    <dd>
                      {o.name}
                      {o.note && <span className="assoc__note">{o.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {hasContact && (
            <section aria-labelledby="assoc-contact">
              <h4 id="assoc-contact" className="assoc__label">
                Contact
              </h4>
              <ul className="assoc__contact">
                {phones.map((p) => (
                  <li key={p}>
                    <Icon name="phone" size={18} />
                    <a href={telHref(p)}>{p}</a>
                  </li>
                ))}
                {association.email && (
                  <li>
                    <Icon name="mail" size={18} />
                    <a href={`mailto:${association.email}`}>{association.email}</a>
                  </li>
                )}
                {association.website && (
                  <li>
                    <Icon name="globe" size={18} />
                    <a href={association.website} target="_blank" rel="noopener noreferrer">
                      {association.website.replace(/^https?:\/\//, "")}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>
      )}
    </article>
  );
}
