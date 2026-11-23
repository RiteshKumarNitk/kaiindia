import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/athlete-login");

export default function Page() {
  return <PageView path="/about/athlete-login" />;
}
