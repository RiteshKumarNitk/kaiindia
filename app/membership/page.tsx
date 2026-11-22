import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/membership");

export default function Page() {
  return <PageView path="/membership" />;
}
