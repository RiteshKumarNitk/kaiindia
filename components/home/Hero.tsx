import Image from "next/image";
import Link from "next/link";
import { getPage } from "@/lib/page-content";
import { siteConfig } from "@/lib/site-config";

/** The original Coming Soon poster with a single welcome line and two calls to action. */
export function Hero() {
  const page = getPage("/");
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="container home-hero__grid">
        <div className="announcement">
          <p className="eyebrow">{siteConfig.name}</p>
          <h1 id="home-title" className="poster-title">
            Coming <span>soon<span className="period">.</span></span>
          </h1>
          <div className="brush" aria-hidden="true" />
          <p className="home-hero__lead">{page.intro}</p>
          <div className="button-row">
            <Link href="/about" className="button button--primary">
              About KAI
            </Link>
            <Link href="/about/karate" className="button button--ghost">
              Discover karate
            </Link>
          </div>
        </div>
        <Image
          className="athlete"
          src={siteConfig.illustration.src}
          width={siteConfig.illustration.width}
          height={siteConfig.illustration.height}
          alt="Ink illustration of a karate athlete performing a high side kick in front of a vermilion sun"
          sizes="(max-width: 48rem) 80vw, 40vw"
          preload
          unoptimized
        />
      </div>
    </section>
  );
}
