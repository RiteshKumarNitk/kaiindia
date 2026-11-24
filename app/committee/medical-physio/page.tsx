import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/committee/medical-physio");

export default function Page() {
  return <PageView path="/committee/medical-physio" />;
}
