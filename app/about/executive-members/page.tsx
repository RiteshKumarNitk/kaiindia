import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/executive-members");

export default function Page() {
  return <PageView path="/about/executive-members" />;
}
