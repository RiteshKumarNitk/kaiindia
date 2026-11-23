import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/kumite-committee");

export default function Page() {
  return <PageView path="/organisation/kumite-committee" />;
}
