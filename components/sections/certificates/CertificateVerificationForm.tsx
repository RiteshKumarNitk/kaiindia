"use client";

import { useId, useRef, useState, type ChangeEvent, type ClipboardEvent, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  certificateTypeLabels,
  certificateTypes,
  type CertificateType,
  type PublicCertificate,
  type VerificationResponse,
} from "@/lib/certificates/types";
import { CERT_LIMITS, validateVerification, type VerificationField } from "@/lib/certificates/validation";

type Values = {
  certificateType: CertificateType;
  serialNumber: string;
  fullName: string;
  aadhaarLast4: string;
  /** Honeypot: real visitors never see or fill this field. */
  website: string;
};

type Outcome =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; response: VerificationResponse }
  | { kind: "error" };

const ENDPOINT = "/api/certificate-verification";
const typeShort: Record<CertificateType, string> = { PLAYER: "Player", COACH: "Coach" };

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Player / Coach certificate verification form.
 * - Submission is disabled unless the server reports a real certificate store (`available`).
 * - Nothing is put in the URL, browser storage or analytics; the Aadhaar digits are cleared from
 *   memory as soon as a request completes.
 * - Results come only from the server; the browser never decides that a certificate is valid.
 */
export function CertificateVerificationForm({ available, fallbackEmail }: { available: boolean; fallbackEmail?: string | null }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({ certificateType: "PLAYER", serialNumber: "", fullName: "", aadhaarLast4: "", website: "" });
  const [touched, setTouched] = useState<Partial<Record<VerificationField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pasteWarning, setPasteWarning] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });

  const checked = validateVerification(values);
  const errors = checked.ok ? {} : checked.errors;
  const show = (f: VerificationField) => (touched[f] || submitted) && errors[f];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === "aadhaarLast4") {
      value = value.replace(/\D/g, "").slice(0, 4);
      setPasteWarning(false);
    }
    setValues((v) => ({ ...v, [name]: value }));
    if (outcome.kind === "done") setOutcome({ kind: "idle" });
  };
  const onBlur = (e: { target: { name: string } }) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  /** Refuse a pasted full Aadhaar number instead of silently keeping its first four digits. */
  const onAadhaarPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (digits.length > 4) {
      e.preventDefault();
      setPasteWarning(true);
      setValues((v) => ({ ...v, aadhaarLast4: "" }));
    }
  };

  const fieldProps = (f: VerificationField) => ({
    id: id(f),
    name: f,
    value: values[f],
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": [f === "aadhaarLast4" ? id("aadhaar-hint") : "", f === "serialNumber" ? id("serial-hint") : "", show(f) ? id(`${f}-error`) : ""]
      .filter(Boolean)
      .join(" ") || undefined,
    onChange,
    onBlur,
  });
  const fieldError = (f: VerificationField) =>
    show(f) ? (
      <p className="field__error" id={id(`${f}-error`)}>
        {errors[f]}
      </p>
    ) : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!checked.ok) {
      const first = (["serialNumber", "fullName", "aadhaarLast4"] as const).find((f) => errors[f]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    if (!available || outcome.kind === "sending") return;
    setOutcome({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({ ...checked.value, website: values.website }),
      });
      const data = (await res.json().catch(() => null)) as VerificationResponse | null;
      setOutcome(data && typeof data.result === "string" ? { kind: "done", response: data } : { kind: "error" });
    } catch {
      setOutcome({ kind: "error" });
    } finally {
      // Data minimisation: do not keep the Aadhaar digits once the check has run.
      setValues((v) => ({ ...v, aadhaarLast4: "" }));
      setTouched((t) => ({ ...t, aadhaarLast4: false }));
      setSubmitted(false);
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };

  const reset = () => {
    setValues({ certificateType: values.certificateType, serialNumber: "", fullName: "", aadhaarLast4: "", website: "" });
    setTouched({});
    setSubmitted(false);
    setOutcome({ kind: "idle" });
    requestAnimationFrame(() => document.getElementById(id("serialNumber"))?.focus());
  };

  return (
    <div className="verify__main">
      <form className="contact-form verify-form" noValidate onSubmit={onSubmit} aria-labelledby={id("title")} autoComplete="off">
        <h2 id={id("title")} className="contact-form__title">
          Verify a certificate
        </h2>
        <p className="contact-form__intro">
          Enter the certificate details to verify a certificate issued by the Karate Association of India.
        </p>

        <fieldset className="choice">
          <legend>Certificate Type</legend>
          <div className="choice__options verify-form__types">
            {certificateTypes.map((t) => (
              <label key={t} className="choice__option">
                <input type="radio" name="certificateType" value={t} checked={values.certificateType === t} onChange={onChange} />
                <span className="verify-form__type">
                  <Icon name={t === "PLAYER" ? "trophy" : "users"} size={20} />
                  <span>
                    {typeShort[t]}
                    <small>{certificateTypeLabels[t]}</small>
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="contact-form__grid">
          <div className="field field--full">
            <label htmlFor={id("serialNumber")}>Certificate Serial Number</label>
            <input
              type="text"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={CERT_LIMITS.serialMax + 10}
              required
              {...fieldProps("serialNumber")}
            />
            <p className="field__hint field__hint--left" id={id("serial-hint")}>
              Exactly as printed on the {typeShort[values.certificateType].toLowerCase()} certificate.
            </p>
            {fieldError("serialNumber")}
          </div>
          <div className="field field--full">
            <label htmlFor={id("fullName")}>Full Name</label>
            <input type="text" autoComplete="off" spellCheck={false} maxLength={CERT_LIMITS.nameMax + 10} required {...fieldProps("fullName")} />
            {fieldError("fullName")}
          </div>
          <div className="field">
            <label htmlFor={id("aadhaarLast4")}>Aadhaar Last 4 Digits</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              autoComplete="off"
              spellCheck={false}
              required
              className="verify-form__last4"
              onPaste={onAadhaarPaste}
              {...fieldProps("aadhaarLast4")}
            />
            {fieldError("aadhaarLast4")}
          </div>
          <div className="field verify-form__aadhaar-note">
            <p className="field__hint field__hint--left" id={id("aadhaar-hint")}>
              Of the certificate holder. <strong>Never enter the full Aadhaar number.</strong>
            </p>
            {pasteWarning && (
              <p className="field__error" role="alert">
                A longer number was pasted and has been discarded. Please type only the last 4 digits.
              </p>
            )}
          </div>
          <div className="field--hp" aria-hidden="true">
            <label htmlFor={id("website")}>Website</label>
            <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
          </div>
        </div>

        <div className="contact-form__actions">
          <button
            type="submit"
            className="button button--primary"
            disabled={!available || outcome.kind === "sending"}
            aria-describedby={id("status")}
          >
            <Icon name="shield" size={18} />
            {outcome.kind === "sending" ? "Verifying…" : "Verify Certificate"}
          </button>
          <div id={id("status")} className="contact-form__status" role="status" aria-live="polite">
            {!available && (
              <p className="contact-form__notice">
                <strong>Online certificate verification will be available soon.</strong> Nothing you enter here is sent.
                {fallbackEmail && (
                  <>
                    {" "}
                    For certificate enquiries, email <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a> — please do
                    not include Aadhaar numbers in emails.
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </form>

      <div ref={resultRef} tabIndex={-1} className="verify__result-region" aria-live="polite">
        {outcome.kind === "done" && <Result response={outcome.response} onReset={reset} />}
        {outcome.kind === "error" && (
          <div className="verify-result verify-result--neutral">
            <h3>Verification could not be completed</h3>
            <p>Please check your connection and try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Result({ response, onReset }: { response: VerificationResponse; onReset: () => void }) {
  const again = (
    <button type="button" className="button button--ghost" onClick={onReset}>
      Verify another certificate
    </button>
  );
  switch (response.result) {
    case "verified":
      return <VerifiedCard c={response.certificate} again={again} />;
    case "not_verified":
      return (
        <div className="verify-result verify-result--fail">
          <h3>Certificate not verified</h3>
          <p>Certificate could not be verified with the provided details.</p>
          <p className="verify-result__help">Check each detail exactly as printed on the certificate and try again.</p>
          {again}
        </div>
      );
    case "rate_limited":
      return (
        <div className="verify-result verify-result--neutral">
          <h3>Too many attempts</h3>
          <p>Please wait {Math.max(1, Math.ceil(response.retryAfterSeconds / 60))} minute(s) before trying again.</p>
        </div>
      );
    case "unavailable":
      return (
        <div className="verify-result verify-result--neutral">
          <h3>Verification unavailable</h3>
          <p>Online certificate verification will be available soon.</p>
        </div>
      );
    default:
      return (
        <div className="verify-result verify-result--neutral">
          <h3>Verification could not be completed</h3>
          <p>Please check the details and try again.</p>
        </div>
      );
  }
}

function VerifiedCard({ c, again }: { c: PublicCertificate; again: ReactNode }) {
  const variant = c.status === "ACTIVE" ? "ok" : c.status === "EXPIRED" ? "warn" : "fail";
  const heading = c.status === "ACTIVE" ? "Certificate Verified" : c.status === "EXPIRED" ? "Certificate Expired" : "Certificate Revoked";
  const statusText = c.status === "ACTIVE" ? "Valid" : c.status === "EXPIRED" ? "Expired — no longer valid" : "Revoked — not valid";
  return (
    <div className={`verify-result verify-result--${variant}`}>
      <h3>
        <Icon name="shield" size={22} /> {heading}
      </h3>
      <p>
        {c.status === "ACTIVE"
          ? "This certificate was issued by the Karate Association of India."
          : c.status === "EXPIRED"
            ? "This certificate was issued by the Karate Association of India but has expired."
            : "This certificate was issued by the Karate Association of India and has since been revoked."}
      </p>
      <dl className="review verify-result__list">
        <div>
          <dt>Certificate type</dt>
          <dd>{certificateTypeLabels[c.certificateType]}</dd>
        </div>
        <div>
          <dt>Serial number</dt>
          <dd>{c.serialNumber}</dd>
        </div>
        <div>
          <dt>Certificate holder</dt>
          <dd>{c.holderName}</dd>
        </div>
        {c.issueDate && (
          <div>
            <dt>Issue date</dt>
            <dd>{formatDate(c.issueDate)}</dd>
          </div>
        )}
        {c.validUntil && (
          <div>
            <dt>Valid until</dt>
            <dd>{formatDate(c.validUntil)}</dd>
          </div>
        )}
        <div>
          <dt>Status</dt>
          <dd>
            <span className={`status-pill status-pill--${variant}`}>{statusText}</span>
          </dd>
        </div>
      </dl>
      {again}
    </div>
  );
}
