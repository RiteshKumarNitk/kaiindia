import Link from "next/link";
import { pageLabel, pages } from "@/lib/page-content";
import { routePaths, type RoutePath } from "@/lib/types";

function isRoute(path: string): path is RoutePath {
  return (routePaths as readonly string[]).includes(path) && path in pages;
}

/** Breadcrumb trail derived from the URL segments of a registered route. */
export function Breadcrumbs({ path }: { path: RoutePath }) {
  if (path === "/") return null;
  const segments = path.split("/").filter(Boolean);
  const trail: RoutePath[] = ["/"];
  segments.forEach((_, i) => {
    const candidate = `/${segments.slice(0, i + 1).join("/")}`;
    if (isRoute(candidate)) trail.push(candidate);
  });

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {trail.map((href, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={href}>
              {last ? (
                <span aria-current="page">{pageLabel(href)}</span>
              ) : (
                <Link href={href}>{pageLabel(href)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
