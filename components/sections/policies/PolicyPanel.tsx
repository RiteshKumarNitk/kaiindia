import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { siteConfig } from "@/config/site";
import type { ComingSoonCopy } from "@/lib/types";

export function PolicyPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  return (
    <div className="narrow">
      <ComingSoon {...comingSoon} variant="section" icon="file" label="Document pending" />
      {siteConfig.contact.email && (
        <p className="fine-print">
          For questions in the meantime, email{" "}
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
        </p>
      )}
      <p className="fine-print">
        Related: <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/refund-policy">Refund Policy</Link> ·{" "}
        <Link href="/rti-governance">RTI &amp; Governance</Link>
      </p>
    </div>
  );
}
