import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/membership/club");

export default function Page() {
  return <PageView path="/membership/club" />;
}
