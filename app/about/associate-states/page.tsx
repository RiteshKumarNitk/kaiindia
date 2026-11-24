import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/associate-states");

export default function Page() {
  return <PageView path="/about/associate-states" />;
}
