import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/donations");

export default function Page() {
  return <PageView path="/donations" />;
}
