import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Icon } from "@/components/shared/Icon";
import { mainNav } from "@/lib/navigation";
import { pageSummary } from "@/lib/page-content";
import type { NavLink } from "@/lib/types";

/** Homepage directory of every section, derived from the main navigation. */
export function QuickLinks() {
  const sections = mainNav.filter((item) => item.children);
  const more: NavLink[] = mainNav.filter((item) => !item.children && item.href !== "/");

  return (
    <section className="home-directory" aria-labelledby="directory-title">
      <div className="container">
        <SectionHeading id="directory-title" title="Explore the website" />
        <div className="site-directory">
          {sections.map((item) => (
            <nav key={item.href} className="site-directory__block" aria-label={item.label}>
              <h3>
                <Link href={item.href} className="site-directory__head">
                  {item.label}
                  <Icon name="arrow" size={18} />
                </Link>
              </h3>
              <p>{pageSummary(item.href)}</p>
              <ul>
                {item.children
                  ?.filter((c) => c.href !== item.href)
                  .map((c) => (
                    <li key={c.href}>
                      <Link href={c.href}>{c.label}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))}
          <nav className="site-directory__block" aria-label="More">
            <h3 className="site-directory__head site-directory__head--plain">More</h3>
            <p>Support, transparency and contact.</p>
            <ul>
              {more.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
