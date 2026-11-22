import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { email, phone } = siteConfig.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="brand brand--footer">
            <Image
              src={siteConfig.crest.src}
              width={siteConfig.crest.width}
              height={siteConfig.crest.height}
              alt={`${siteConfig.name} crest`}
              className="brand__crest"
              unoptimized
            />
            <span className="brand__name">
              Karate Association
              <br />
              of India
            </span>
          </Link>
          <p className="site-footer__note">
            Official website under development. Sections are updated as verified information is approved.
          </p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="site-footer__col">
            <h2>{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
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
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </li>
              )}
            </ul>
          ) : (
            <p className="site-footer__muted">Official contact information will be available soon.</p>
          )}
          <Link href="/contact" className="text-link">
            Contact page <span aria-hidden="true">→</span>
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
