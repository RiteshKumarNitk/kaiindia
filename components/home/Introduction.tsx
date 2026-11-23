import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { associationIntro } from "@/content/association";
import { isPublished } from "@/lib/content-status";
import { siteConfig } from "@/config/site";

/** Official association introduction (client-supplied) shown below the homepage hero. */
export function Introduction() {
  if (!isPublished(associationIntro)) return null;
  const { title, subtitle, paragraphs } = associationIntro;
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <div className="intro__heading">
          <Image
            src={siteConfig.crest.src}
            width={siteConfig.crest.width}
            height={siteConfig.crest.height}
            alt=""
            className="intro__crest"
            sizes="72px"
          />
          <h2 id="intro-title" className="intro__title">
            {title}
          </h2>
          <p className="intro__subtitle">{subtitle}</p>
          <span className="tricolour-rule" aria-hidden="true" />
        </div>
        <div className="intro__text">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <Link href="/about" className="text-link">
            Read more about KAI <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
