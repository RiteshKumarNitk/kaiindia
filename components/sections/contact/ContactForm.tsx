"use client";

import Link from "next/link";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";

export const enquiryTypes = [
  "General Enquiry",
  "Membership",
  "Athlete Support",
  "Coach Enquiry",
  "Committee Enquiry",
  "Media Enquiry",
  "Other",
] as const;

type Values = {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
  consent: boolean;
  /** Honeypot: real visitors never see or fill this field. */
  website: string;
};
type Field = Exclude<keyof Values, "website">;
type Errors = Partial<Record<Field, string>>;

const initial: Values = {
  fullName: "",
  email: "",
  phone: "",
  enquiryType: "",
  subject: "",
  message: "",
  consent: false,
  website: "",
};

const MESSAGE_MAX = 2000;

export function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = "Please enter your full name.";
  else if (name.length < 2 || name.length > 100) e.fullName = "Name must be between 2 and 100 characters.";

  const email = v.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Please enter a valid email address, e.g. name@example.com.";

  const phone = v.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 10 || digits.length > 15)
      e.phone = "Please enter a valid phone number (10–15 digits), or leave it blank.";
  }

  if (!v.enquiryType) e.enquiryType = "Please choose an enquiry type.";

  const subject = v.subject.trim();
  if (!subject) e.subject = "Please enter a subject.";
  else if (subject.length < 3 || subject.length > 150) e.subject = "Subject must be between 3 and 150 characters.";

  const message = v.message.trim();
  if (!message) e.message = "Please enter your message.";
  else if (message.length < 20) e.message = "Please give a little more detail (at least 20 characters).";
  else if (message.length > MESSAGE_MAX) e.message = `Message must be ${MESSAGE_MAX} characters or fewer.`;

  if (!v.consent) e.consent = "Please confirm that we may use your details to respond.";
  return e;
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

/**
 * Contact enquiry form.
 * - Validates in the browser (on blur and on submit) with accessible error messages.
 * - Sends ONLY when `endpoint` is configured (config/site.ts → contactForm.endpoint).
 *   Without it, the submit button is disabled and a notice explains that submission is not yet available.
 * - Shows a success message only after the endpoint returns a successful response.
 */
export function ContactForm({ endpoint }: { endpoint: string | null }) {
  const uid = useId();
  const [values, setValues] = useState<Values>(initial);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const enabled = Boolean(endpoint);
  const errors = validate(values);
  const show = (f: Field) => (touched[f] || submitted) && errors[f];
  const id = (f: string) => `${uid}-${f}`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const next = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setValues((v) => ({ ...v, [name]: next }));
    if (type === "checkbox" || e.target.tagName === "SELECT") setTouched((t) => ({ ...t, [name]: true }));
  };
  const onBlur = (e: { target: { name: string } }) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) {
      const first = (Object.keys(errors) as Field[])[0];
      document.getElementById(id(first))?.focus();
      return;
    }
    if (!endpoint) return; // submission not yet available
    if (values.website) return; // spam bot filled the honeypot
    setStatus({ kind: "sending" });
    try {
      const { website: _honeypot, ...payload } = values;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus({ kind: "sent" });
      setValues(initial);
      setTouched({});
      setSubmitted(false);
    } catch {
      setStatus({ kind: "error", message: "Your enquiry could not be sent. Please try again later." });
    }
  };

  const fieldProps = (f: Field) => ({
    id: id(f),
    name: f,
    "aria-invalid": show(f) ? true : undefined,
    "aria-describedby": show(f) ? id(`${f}-error`) : undefined,
    onBlur,
    onChange,
  });
  const fieldError = (f: Field) =>
    show(f) ? (
      <p className="field__error" id={id(`${f}-error`)}>
        {errors[f]}
      </p>
    ) : null;

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit} aria-labelledby={id("title")}>
      <h2 id={id("title")} className="contact-form__title">
        Send an enquiry
      </h2>
      <p className="contact-form__intro">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="contact-form__grid">
        <div className="field">
          <label htmlFor={id("fullName")}>
            Full Name <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" required maxLength={100} value={values.fullName} {...fieldProps("fullName")} />
          {fieldError("fullName")}
        </div>

        <div className="field">
          <label htmlFor={id("email")}>
            Email Address <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input type="email" autoComplete="email" inputMode="email" required value={values.email} {...fieldProps("email")} />
          {fieldError("email")}
        </div>

        <div className="field">
          <label htmlFor={id("phone")}>
            Phone Number <span className="field__opt">(optional)</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" maxLength={20} value={values.phone} {...fieldProps("phone")} />
          {fieldError("phone")}
        </div>

        <div className="field">
          <label htmlFor={id("enquiryType")}>
            Enquiry Type <span className="field__req" aria-hidden="true">*</span>
          </label>
          <select required value={values.enquiryType} {...fieldProps("enquiryType")}>
            <option value="" disabled>
              Select an enquiry type
            </option>
            {enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {fieldError("enquiryType")}
        </div>

        <div className="field field--full">
          <label htmlFor={id("subject")}>
            Subject <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input type="text" required maxLength={150} value={values.subject} {...fieldProps("subject")} />
          {fieldError("subject")}
        </div>

        <div className="field field--full">
          <label htmlFor={id("message")}>
            Message <span className="field__req" aria-hidden="true">*</span>
          </label>
          <textarea rows={6} required maxLength={MESSAGE_MAX} value={values.message} {...fieldProps("message")} />
          <p className="field__hint" aria-live="polite">
            {values.message.length}/{MESSAGE_MAX} characters
          </p>
          {fieldError("message")}
        </div>

        {/* Honeypot for spam bots: hidden from people and assistive technology. */}
        <div className="field--hp" aria-hidden="true">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>

        <div className="field field--full field--check">
          <input type="checkbox" required checked={values.consent} {...fieldProps("consent")} />
          <label htmlFor={id("consent")}>
            I agree that the Karate Association of India may use the details I provide to respond to my enquiry.
            See our <Link href="/privacy-policy">Privacy Policy</Link>. <span className="field__req" aria-hidden="true">*</span>
          </label>
          {fieldError("consent")}
        </div>
      </div>

      <div className="contact-form__actions">
        <button
          type="submit"
          className="button button--primary"
          disabled={!enabled || status.kind === "sending"}
          aria-describedby={id("status")}
        >
          {status.kind === "sending" ? "Sending…" : "Send Enquiry"}
        </button>
        <div id={id("status")} className="contact-form__status" role="status" aria-live="polite">
          {!enabled && (
            <p className="contact-form__notice">
              <strong>Enquiry submission will be available soon.</strong> Online submission is not active yet, so
              nothing you enter here is sent.
            </p>
          )}
          {status.kind === "sent" && <p className="contact-form__success">Thank you — your enquiry has been sent.</p>}
          {status.kind === "error" && <p className="field__error">{status.message}</p>}
        </div>
      </div>
    </form>
  );
}
