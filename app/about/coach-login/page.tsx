import { PageView } from "@/components/shared/PageView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/about/coach-login");

export default function Page() {
  return <PageView path="/about/coach-login" />;
}
