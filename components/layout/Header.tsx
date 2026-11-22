import Image from "next/image";
import Link from "next/link";
import { mainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./MobileMenu";
import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} — home`}>
          <Image
            src={siteConfig.crest.src}
            width={siteConfig.crest.width}
            height={siteConfig.crest.height}
            alt={`${siteConfig.name} crest`}
            className="brand__crest"
            unoptimized
            preload
          />
          <span className="brand__name">
            Karate Association
            <br />
            of India
          </span>
        </Link>
        <p className="site-header__tagline">{siteConfig.tagline}</p>
        <MobileMenu items={mainNav} />
      </div>
      <div className="tricolour" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="site-header__nav">
        <div className="container">
          <Navbar items={mainNav} />
        </div>
      </div>
    </header>
  );
}
