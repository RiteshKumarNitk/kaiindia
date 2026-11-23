import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/contact");

export default function Page() {
  return <PageView path="/contact" />;
}
