import Link from "next/link";
import { pageLabel, pages } from "@/content/pages";
import { routePaths, type RoutePath } from "@/lib/types";

/** URL sections that group pages but have no page of their own (shown as plain text). */
const sectionLabels: Record<string, string> = {
  "/committee": "Committee",
};

function isRoute(path: string): path is RoutePath {
  return (routePaths as readonly string[]).includes(path) && path in pages;
}

type Crumb = { label: string; href?: RoutePath };

/** Breadcrumb trail derived from the URL segments of a registered route. */
export function Breadcrumbs({ path }: { path: RoutePath }) {
  if (path === "/") return null;
  const segments = path.split("/").filter(Boolean);
  const trail: Crumb[] = [{ label: pageLabel("/"), href: "/" }];
  segments.forEach((_, i) => {
    const candidate = `/${segments.slice(0, i + 1).join("/")}`;
    if (isRoute(candidate)) trail.push({ label: pageLabel(candidate), href: candidate });
    else if (sectionLabels[candidate]) trail.push({ label: sectionLabels[candidate] });
  });

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${crumb.label}-${i}`}>
              {last ? (
                <span aria-current="page">{crumb.label}</span>
              ) : crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
