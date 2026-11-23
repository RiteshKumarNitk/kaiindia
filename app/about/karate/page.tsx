import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/karate");

export default function Page() {
  return <PageView path="/about/karate" />;
}
