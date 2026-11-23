import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/management-committee");

export default function Page() {
  return <PageView path="/organisation/management-committee" />;
}
