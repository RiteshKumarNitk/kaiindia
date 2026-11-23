import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/privacy-policy");

export default function Page() {
  return <PageView path="/privacy-policy" />;
}
