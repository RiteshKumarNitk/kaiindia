import { MemberDirectory } from "@/components/sections/organisation/MemberDirectory";
import { StateDirectory } from "@/components/sections/organisation/StateDirectory";
import { DocumentLibrary } from "@/components/sections/documents/DocumentLibrary";
import { ContactPanel } from "@/components/sections/contact/ContactPanel";
import { DonationsPanel } from "@/components/sections/donations/DonationsPanel";
import { GovernancePanel } from "@/components/sections/governance/GovernancePanel";
import { InfoSections } from "@/components/sections/about/ArticleSections";
import { MessagePanel } from "@/components/sections/organisation/LeadershipMessage";
import { PolicyPanel } from "@/components/sections/policies/PolicyPanel";
import { ProcessSteps } from "@/components/sections/membership/ProcessSteps";
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
    case "directory":
      return <MemberDirectory committee={body.committee} focus={body.focus} comingSoon={comingSoon} />;
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
      return (
        <>
          <ComingSoon {...comingSoon} variant="compact" />
          <ProcessSteps sections={body.sections} heading="How membership will work" />
        </>
      );
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
      <PageHero path={path} eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <PageContainer>
        <Body page={page} />
      </PageContainer>
    </>
  );
}
