import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/certificate-verification");

export default function Page() {
  return <PageView path="/certificate-verification" />;
}
