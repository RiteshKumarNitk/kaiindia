import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/chairman-message");

export default function Page() {
  return <PageView path="/organisation/chairman-message" />;
}
