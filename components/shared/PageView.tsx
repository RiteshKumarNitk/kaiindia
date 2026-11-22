import { MemberDirectory, StateDirectory } from "@/components/sections/directories";
import { DocumentLibrary } from "@/components/sections/documents";
import {
  ContactPanel,
  DonationsPanel,
  GovernancePanel,
  InfoSections,
  MessagePanel,
  PolicyPanel,
  ProcessSteps,
} from "@/components/sections/info";
import { HubView } from "@/components/sections/hubs";
import { NewsList, PhotoGallery, VideoGallery } from "@/components/sections/media";
import { PortalPreview } from "@/components/sections/portal";
import { getPage } from "@/lib/page-content";
import type { PageEntry, RoutePath } from "@/lib/types";
import { ComingSoon } from "./ComingSoon";
import { PageContainer } from "./PageContainer";
import { PageHero } from "./PageHero";

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
      return <StateDirectory comingSoon={comingSoon} />;
    case "message":
      return <MessagePanel comingSoon={comingSoon} />;
    case "info":
      return <InfoSections sections={body.sections} pending={body.pending} />;
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

/** Renders any registered page from `lib/page-content.ts`. */
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
