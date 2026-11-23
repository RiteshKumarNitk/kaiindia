import { PageView } from "@/components/templates/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/membership/academy");

export default function Page() {
  return <PageView path="/membership/academy" />;
}
