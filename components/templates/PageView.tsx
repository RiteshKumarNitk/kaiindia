import { MemberDirectory } from "@/components/sections/committee/MemberDirectory";
import { ExecutiveDirectory } from "@/components/sections/about/ExecutiveDirectory";
import { StateDirectory } from "@/components/sections/about/StateDirectory";
import { DocumentLibrary } from "@/components/sections/documents/DocumentLibrary";
import { ContactPanel } from "@/components/sections/contact/ContactPanel";
import { DonationsPanel } from "@/components/sections/donations/DonationsPanel";
import { GovernancePanel } from "@/components/sections/governance/GovernancePanel";
import { InfoSections } from "@/components/sections/about/ArticleSections";
import { MessagePanel } from "@/components/sections/about/LeadershipMessage";
import { PolicyPanel } from "@/components/sections/policies/PolicyPanel";
import { MembershipPanel } from "@/components/sections/membership/MembershipPanel";
import { HubView } from "@/components/sections/hub/HubView";
import { NewsList, PhotoGallery, VideoGallery } from "@/components/sections/media/MediaLists";
import { PortalPreview } from "@/components/sections/about/PortalPreview";
import { getPage } from "@/content/pages";
import type { PageEntry, RoutePath } from "@/lib/types";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHero } from "@/components/ui/PageHero";

function Body({ page }: { page: PageEntry }) {
  const { body, comingSoon } = page;
  switch (body.kind) {
    case "hub":
      return <HubView hub={body} comingSoon={comingSoon} />;
    case "portal":
      return <PortalPreview role={body.role} features={body.features} comingSoon={comingSoon} />;
    case "executive":
      return <ExecutiveDirectory />;
    case "directory":
      return (
        <MemberDirectory
          committee={body.committee}
          focus={body.focus}
          comingSoon={comingSoon}
          icon={body.icon}
          showProfileNote={body.showProfileNote}
        >
          {body.notice && <p className="fine-print committee-notice">{body.notice}</p>}
        </MemberDirectory>
      );
    case "states":
      return <StateDirectory />;
    case "message":
      return <MessagePanel comingSoon={comingSoon} />;
    case "info":
      return <InfoSections sections={body.sections} pending={body.pending} related={body.related} />;
    case "news":
      return <NewsList comingSoon={comingSoon} />;
    case "photos":
      return <PhotoGallery comingSoon={comingSoon} />;
    case "videos":
      return <VideoGallery comingSoon={comingSoon} />;
    case "documents":
      return <DocumentLibrary collection={body.collection} comingSoon={comingSoon} />;
    case "membership":
      return <MembershipPanel category={body.category} sections={body.sections} />;
    case "policy":
      return <PolicyPanel comingSoon={comingSoon} />;
    case "donations":
      return <DonationsPanel comingSoon={comingSoon} />;
    case "governance":
      return <GovernancePanel topics={body.topics} comingSoon={comingSoon} />;
    case "contact":
      return <ContactPanel comingSoon={comingSoon} />;
    case "home":
      return null;
  }
}

/** Renders any registered page from `content/pages.ts`. */
export function PageView({ path }: { path: RoutePath }) {
  const page = getPage(path);
  return (
    <>
      <PageHero path={path} eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} intro={page.intro} />
      <PageContainer>
        <Body page={page} />
      </PageContainer>
    </>
  );
}
