import { siteConfig } from "@/config/site";
import { certificateVerificationAvailable } from "@/lib/certificates/repository";
import { CertificateVerificationForm } from "./CertificateVerificationForm";

/**
 * /certificate-verification body. Availability is decided on the server: the form can submit
 * only when a real certificate store and server secret are configured
 * (lib/certificates/repository.ts). Until then it shows "available soon" and sends nothing.
 */
export function CertificateVerificationPanel() {
  const available = certificateVerificationAvailable();

  return (
    <div className="verify">
      <CertificateVerificationForm available={available} fallbackEmail={siteConfig.contact.email} />

      <aside className="verify__aside" aria-label="About certificate verification">
        <section className="fee-card">
          <h2 className="fee-card__title">What is checked</h2>
          <ul className="how-to verify__checks">
            <li>Certificate type — Player or Coach</li>
            <li>Certificate serial number</li>
            <li>Full name, as printed on the certificate</li>
            <li>Last 4 digits of the holder&apos;s Aadhaar</li>
          </ul>
          <p className="fee-card__note">
            All four must match an official KAI record. For privacy, an unsuccessful result never says which detail did
            not match.
          </p>
        </section>

        <section className="fee-card fee-card--muted">
          <h2 className="fee-card__title">Your privacy</h2>
          <ul className="how-to verify__checks">
            <li>Only the last four Aadhaar digits are asked for — never the full number.</li>
            <li>Details are used only to check the certificate. They are not added to the page address or saved in your browser.</li>
            <li>Results show only the certificate type, serial number, holder name, dates and status.</li>
            <li>Certificates cannot be searched by name alone.</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}
