import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/media");

export default function Page() {
  return <PageView path="/media" />;
}
