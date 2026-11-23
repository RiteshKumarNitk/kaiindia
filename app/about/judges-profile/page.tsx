import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/judges-profile");

export default function Page() {
  return <PageView path="/about/judges-profile" />;
}
