import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { RoutePath } from "@/lib/types";

type PageHeroProps = {
  path: RoutePath;
  eyebrow: string;
  title: string;
  intro: string;
};

/** Standard inner-page header: breadcrumbs, eyebrow, H1 and introduction. */
export function PageHero({ path, eyebrow, title, intro }: PageHeroProps) {
  return (
    <div className="page-hero">
      <div className="container">
        <Breadcrumbs path={path} />
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__intro">{intro}</p>
      </div>
    </div>
  );
}
