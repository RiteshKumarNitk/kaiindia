import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/organisation/associate-states");

export default function Page() {
  return <PageView path="/organisation/associate-states" />;
}
