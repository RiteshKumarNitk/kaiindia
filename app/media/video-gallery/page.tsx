import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/media/video-gallery");

export default function Page() {
  return <PageView path="/media/video-gallery" />;
}
