import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/refund-policy");

export default function Page() {
  return <PageView path="/refund-policy" />;
}
