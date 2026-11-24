import Link from "next/link";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { siteConfig } from "@/config/site";
import type { ComingSoonCopy } from "@/lib/types";

export function DonationsPanel({ comingSoon }: { comingSoon: ComingSoonCopy }) {
  return (
    <div className="narrow">
      <ComingSoon {...comingSoon} variant="section" icon="heart" />
      <p className="fine-print">
        Any future announcement about donations will be made on the <Link href="/media/news">News</Link> page. For
        enquiries, see <Link href="/contact">Contact Us</Link>
        {siteConfig.contact.email && (
          <>
            {" "}
            or email <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          </>
        )}
        .
      </p>
    </div>
  );
}
