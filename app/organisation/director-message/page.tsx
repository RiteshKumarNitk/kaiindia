import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/director-message");

export default function Page() {
  return <PageView path="/organisation/director-message" />;
}
