import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import type { ComingSoonCopy } from "@/lib/types";

export function PolicyPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  return (
    <div className="narrow">
      <ComingSoon {...comingSoon} variant="section" icon="file" label="Document pending" />
      <p className="fine-print">
        Related: <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/refund-policy">Refund Policy</Link> ·{" "}
        <Link href="/rti-governance">RTI &amp; Governance</Link>
      </p>
    </div>
  );
}
