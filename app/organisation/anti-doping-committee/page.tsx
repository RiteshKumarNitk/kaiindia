import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/anti-doping-committee");

export default function Page() {
  return <PageView path="/organisation/anti-doping-committee" />;
}
