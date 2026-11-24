import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/committee/objection");

export default function Page() {
  return <PageView path="/committee/objection" />;
}
