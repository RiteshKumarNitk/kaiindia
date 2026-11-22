import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { Icon, type IconName } from "./Icon";

export type ComingSoonProps = {
  title: string;
  description: string;
  /** hero: prominent empty state · section: bordered panel · compact: inline notice */
  variant?: "hero" | "section" | "compact";
  showIllustration?: boolean;
  /** Small status label, e.g. "Coming soon" or "Document pending". */
  label?: string;
  icon?: IconName;
  headingLevel?: 2 | 3;
  children?: ReactNode;
};

function slug(text: string) {
  return `cs-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

/**
 * The single, reusable empty state used wherever approved content is not yet available.
 * Use at most one per page; pass contextual copy from `lib/page-content.ts`.
 */
export function ComingSoon({
  title,
  description,
  variant = "section",
  showIllustration = false,
  label = "Coming soon",
  icon = "clock",
  headingLevel = 2,
  children,
}: ComingSoonProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const id = slug(title);
  return (
    <section
      className={`empty-state empty-state--${variant}${showIllustration ? " has-art" : ""}`}
      aria-labelledby={id}
    >
      {variant !== "compact" && (
        <span className="empty-state__icon">
          <Icon name={icon} size={22} />
        </span>
      )}
      <div className="empty-state__body">
        <p className="empty-state__label">{label}</p>
        <Heading id={id} className="empty-state__title">
          {title}
        </Heading>
        <p className="empty-state__text">{description}</p>
        {children}
      </div>
      {showIllustration && (
        <Image
          src={siteConfig.illustration.src}
          width={siteConfig.illustration.width}
          height={siteConfig.illustration.height}
          alt=""
          className="empty-state__art"
          sizes="14rem"
          unoptimized
        />
      )}
    </section>
  );
}
