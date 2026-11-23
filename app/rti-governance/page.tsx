import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/rti-governance");

export default function Page() {
  return <PageView path="/rti-governance" />;
}
