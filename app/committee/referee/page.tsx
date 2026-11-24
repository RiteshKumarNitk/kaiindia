import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/committee/referee");

export default function Page() {
  return <PageView path="/committee/referee" />;
}
