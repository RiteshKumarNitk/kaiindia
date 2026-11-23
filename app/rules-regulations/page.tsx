import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/rules-regulations");

export default function Page() {
  return <PageView path="/rules-regulations" />;
}
