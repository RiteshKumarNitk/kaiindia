"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { formatINR, membershipConfig } from "@/content/membership";
import type { ApplicationType, MembershipCategory } from "@/lib/types";

type Values = {
  category: MembershipCategory;
  applicationType: ApplicationType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  orgName: string;
  occupation: string;
  membershipId: string;
  /** Honeypot: real visitors never see or fill this field. */
  website: string;
};
type Field = Exclude<keyof Values, "website" | "category" | "applicationType">;
type Errors = Partial<Record<Field, string>>;

const LIMITS = { name: 50, email: 120, phone: 16, address: 300, orgName: 120, occupation: 80, membershipId: 30 } as const;

/** Removes control characters and surrounding whitespace before validation or sending. */
const clean = (v: string) => v.replace(/[\u0000-\u001F\u007F]/g, " ").trim();
/** Names: letters from any script plus spaces, apostrophes, hyphens and full stops — no digits or symbols. */
const NAME = /^[^\d!"#$%&()*+,/:;<=>?@[\]\\^_`{|}~]+$/;

/** Indian mobile/landline-style number: optional +91 or 0, then 10 digits starting 6–9. */
export function isIndianPhone(raw: string): boolean {
  const compact = raw.replace(/[\s()-]/g, "");
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(compact);
}

export function validateMembership(v: Values, orgLabel: string): Errors {
  const e: Errors = {};
  const first = clean(v.firstName);
  if (!first) e.firstName = "Please enter your first name.";
  else if (first.length > LIMITS.name || !NAME.test(first)) e.firstName = "Use letters, spaces, apostrophes, hyphens or full stops (max 50).";

  const last = clean(v.lastName);
  if (!last) e.lastName = "Please enter your last name.";
  else if (last.length > LIMITS.name || !NAME.test(last)) e.lastName = "Use letters, spaces, apostrophes, hyphens or full stops (max 50).";

  const email = clean(v.email);
  if (!email) e.email = "Please enter your email address.";
  else if (email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    e.email = "Please enter a valid email address, e.g. name@example.com.";

  const phone = clean(v.phone);
  if (!phone) e.phone = "Please enter your phone number.";
  else if (!isIndianPhone(phone)) e.phone = "Please enter a valid 10-digit Indian mobile number, e.g. 98765 43210 or +91 98765 43210.";

  const address = clean(v.address);
  if (!address) e.address = "Please enter your full address.";
  else if (address.length < 10) e.address = "Please enter your complete address, including city, state and PIN code.";
  else if (address.length > LIMITS.address) e.address = `Address must be ${LIMITS.address} characters or fewer.`;

  const org = clean(v.orgName);
  if (!org) e.orgName = `Please enter the ${orgLabel.toLowerCase()}.`;
  else if (org.length < 2 || org.length > LIMITS.orgName) e.orgName = `${orgLabel} must be between 2 and ${LIMITS.orgName} characters.`;

  const occupation = clean(v.occupation);
  if (!occupation) e.occupation = "Please enter your occupation.";
  else if (occupation.length < 2 || occupation.length > LIMITS.occupation)
    e.occupation = `Occupation must be between 2 and ${LIMITS.occupation} characters.`;

  const id = clean(v.membershipId);
  if (v.applicationType === "renewal" && id && (id.length > LIMITS.membershipId || !/^[A-Za-z0-9/ -]+$/.test(id)))
    e.membershipId = "Use letters, numbers, spaces, hyphens or slashes (max 30).";
  return e;
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

/**
 * Club / Academy membership application.
 * - Fee summary comes from content/membership.ts; the fee is NEVER sent to the server.
 * - Submission is disabled while `endpoint` is null (config/site.ts → membershipForm.endpoint).
 * - No payment is collected; a success message appears only after a real 2xx response.
 */
export function MembershipForm({
  defaultCategory,
  endpoint,
  fallbackEmail,
}: {
  defaultCategory: MembershipCategory;
  endpoint: string | null;
  fallbackEmail?: string | null;
}) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const [values, setValues] = useState<Values>({
    category: defaultCategory,
    applicationType: "new",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    orgName: "",
    occupation: "",
    membershipId: "",
    website: "",
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const { categories, applicationTypes, fees, validity } = membershipConfig;
  const orgLabel = categories[values.category].orgLabel;
  const typeInfo = applicationTypes[values.applicationType];
  const fee = fees[values.applicationType];
  const errors = validateMembership(values, orgLabel);
  const show = (f: Field) => (touched[f] || submitted) && errors[f];
  const enabled = Boolean(endpoint);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = (e: { target: { name: string } }) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    value: values[f],
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": show(f) ? id(`${f}-error`) : undefined,
    onChange,
    onBlur,
  });
  const fieldError = (f: Field) =>
    show(f) ? (
      <p className="field__error" id={id(`${f}-error`)}>
        {errors[f]}
      </p>
    ) : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const keys = Object.keys(errors) as Field[];
    if (keys.length > 0) {
      document.getElementById(id(keys[0]))?.focus();
      return;
    }
    if (!endpoint || values.website) return; // not enabled, or a bot filled the honeypot
    setStatus({ kind: "sending" });
    try {
      // The fee is deliberately not included: the server must calculate it.
      const payload = {
        category: values.category,
        applicationType: values.applicationType,
        firstName: clean(values.firstName),
        lastName: clean(values.lastName),
        email: clean(values.email),
        phone: clean(values.phone),
        address: clean(values.address),
        orgName: clean(values.orgName),
        occupation: clean(values.occupation),
        membershipId: values.applicationType === "renewal" ? clean(values.membershipId) || null : null,
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: "Your application could not be sent. Please try again later." });
    }
  };

  return (
    <form className="contact-form membership-form" noValidate onSubmit={onSubmit} aria-labelledby={id("title")}>
      <h2 id={id("title")} className="contact-form__title">
        Membership application
      </h2>
      <p className="contact-form__intro">All fields are required unless marked optional.</p>

      <fieldset className="choice">
        <legend>Membership Category</legend>
        <div className="choice__options">
          {(Object.keys(categories) as MembershipCategory[]).map((c) => (
            <label key={c} className="choice__option">
              <input type="radio" name="category" value={c} checked={values.category === c} onChange={onChange} />
              <span>{categories[c].label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="choice">
        <legend>Application Type</legend>
        <div className="choice__options">
          {(Object.keys(applicationTypes) as ApplicationType[]).map((t) => (
            <label key={t} className="choice__option">
              <input type="radio" name="applicationType" value={t} checked={values.applicationType === t} onChange={onChange} />
              <span>
                {applicationTypes[t].label}
                <small>{formatINR(fees[t])} / year</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="fee-summary" aria-live="polite" id={id("fee")}>
        <div>
          <span className="fee-summary__label">{typeInfo.feeLabel}</span>
          <strong className="fee-summary__amount">{formatINR(fee)}</strong>
        </div>
        <div>
          <span className="fee-summary__label">Validity</span>
          <strong>{validity}</strong>
        </div>
        <p className="fee-summary__note">
          Shown for information only. No payment is collected on this website; payment instructions will be shared by
          the association.
        </p>
      </div>

      <div className="contact-form__grid">
        <div className="field">
          <label htmlFor={id("firstName")}>First Name</label>
          <input type="text" autoComplete="given-name" maxLength={LIMITS.name} required {...fieldProps("firstName")} />
          {fieldError("firstName")}
        </div>
        <div className="field">
          <label htmlFor={id("lastName")}>Last Name</label>
          <input type="text" autoComplete="family-name" maxLength={LIMITS.name} required {...fieldProps("lastName")} />
          {fieldError("lastName")}
        </div>
        <div className="field">
          <label htmlFor={id("email")}>Email Address</label>
          <input type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email} required {...fieldProps("email")} />
          {fieldError("email")}
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>Phone Number</label>
          <input type="tel" inputMode="tel" autoComplete="tel" maxLength={LIMITS.phone} required placeholder="98765 43210" {...fieldProps("phone")} />
          {fieldError("phone")}
        </div>
        <div className="field field--full">
          <label htmlFor={id("address")}>Full Address</label>
          <textarea rows={3} autoComplete="street-address" maxLength={LIMITS.address} required {...fieldProps("address")} />
          {fieldError("address")}
        </div>
        <div className="field">
          <label htmlFor={id("orgName")}>{orgLabel}</label>
          <input type="text" autoComplete="organization" maxLength={LIMITS.orgName} required {...fieldProps("orgName")} />
          {fieldError("orgName")}
        </div>
        <div className="field">
          <label htmlFor={id("occupation")}>Occupation</label>
          <input type="text" autoComplete="organization-title" maxLength={LIMITS.occupation} required {...fieldProps("occupation")} />
          {fieldError("occupation")}
        </div>
        {values.applicationType === "renewal" && (
          <div className="field field--full">
            <label htmlFor={id("membershipId")}>
              Existing Membership ID <span className="field__opt">(optional)</span>
            </label>
            <input type="text" maxLength={LIMITS.membershipId} {...fieldProps("membershipId")} />
            <p className="field__hint field__hint--left">If you have one. Not required until the association confirms how members are identified.</p>
            {fieldError("membershipId")}
          </div>
        )}
        <div className="field--hp" aria-hidden="true">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="button button--primary" disabled={!enabled || status.kind === "sending"} aria-describedby={id("status")}>
          {status.kind === "sending" ? "Submitting…" : "Submit Application"}
        </button>
        <div id={id("status")} className="contact-form__status" role="status" aria-live="polite">
          {!enabled && (
            <p className="contact-form__notice">
              <strong>Online membership applications are not yet enabled.</strong> Nothing you enter here is sent.
              {fallbackEmail && (
                <>
                  {" "}
                  For membership enquiries, email <a href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>.
                </>
              )}
            </p>
          )}
          {status.kind === "sent" && <p className="contact-form__success">Thank you — your application has been received.</p>}
          {status.kind === "error" && <p className="field__error">{status.message}</p>}
        </div>
      </div>
    </form>
  );
}
