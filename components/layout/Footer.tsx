import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { email, phone } = siteConfig.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="tricolour tricolour--thin" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="brand brand--footer" prefetch={false}>
            <Image
              src={siteConfig.crest.src}
              width={siteConfig.crest.width}
              height={siteConfig.crest.height}
              alt={`${siteConfig.name} crest`}
              className="brand__crest"
              sizes="48px"
            />
            <span className="brand__name">
              Karate Association
              <br />
              of India
            </span>
          </Link>
          <p className="site-footer__note">
            Official national federation for karate in India, incorporated in 2013.
          </p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="site-footer__col">
            <h2>{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  {/* No viewport prefetch for ~20 footer links: saves bandwidth on every page. */}
                  <Link href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="site-footer__col">
          <h2>Contact us</h2>
          {email || phone ? (
            <ul>
              {email && (
                <li>
                  {/* <wbr> lets the address wrap neatly before "@" in narrow columns. */}
                  <a href={`mailto:${email}`}>
                    {email.split("@")[0]}
                    <wbr />@{email.split("@")[1]}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </li>
              )}
            </ul>
          ) : (
            <p className="site-footer__muted">
              Questions about membership, events or the association? Send us an enquiry.
            </p>
          )}
          {siteConfig.social.youtube && (
            <p className="site-footer__social">
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
                YouTube channel <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          )}
          <Link href="/contact" className="button button--primary site-footer__cta" prefetch={false}>
            Contact Us
          </Link>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
