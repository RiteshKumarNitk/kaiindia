import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="page-hero page-hero--center">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="page-hero__title">Page not found</h1>
        <div className="brush" aria-hidden="true" />
        <p className="page-hero__intro">
          The page you were looking for does not exist or may have moved. Use the menu above or return to the homepage.
        </p>
        <div className="button-row">
          <Link href="/" className="button button--primary">
            Back to home
          </Link>
          <Link href="/contact" className="button button--outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
