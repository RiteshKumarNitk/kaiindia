import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/medical-physio-committee");

export default function Page() {
  return <PageView path="/organisation/medical-physio-committee" />;
}
