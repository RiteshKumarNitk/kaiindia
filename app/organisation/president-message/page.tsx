import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/president-message");

export default function Page() {
  return <PageView path="/organisation/president-message" />;
}
