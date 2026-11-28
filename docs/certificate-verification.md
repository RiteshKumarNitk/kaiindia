# Certificate Verification — architecture and integration guide

Public page: `/certificate-verification` (Player and Coach certificates).
Status: **UI live, verification disabled.** No authorised KAI certificate database has been
provided, so the page shows "Online certificate verification will be available soon." and the
**Verify Certificate** button is disabled. Nothing typed into the form is sent anywhere.

The site has no database or authentication today (static Next.js pages plus this one Route
Handler), so nothing was reused and no production database or personal data store was created.

---

## 1. How it fits together

```
Browser (client component)                Server (Next.js Route Handler)              Certificate store
CertificateVerificationForm.tsx  ──POST──▶ app/api/certificate-verification/route.ts ──▶ CertificateLookup
  · client-side validation (help only)       · same-origin check                         .findBySerial(type, serial)
  · no URL params / storage / analytics      · rate limit 5/min + 20/h per client        (NOT CONNECTED: returns null)
  · clears Aadhaar digits after request      · JSON ≤ 2 KB, honeypot                     lib/certificates/repository.ts
                                             · server-side validation
  ◀── { result, certificate? } ────────────  · verifyCertificate() — all 4 fields
                                             · 503 "unavailable" until a store exists
```

| File | Purpose |
| --- | --- |
| `lib/certificates/types.ts` | `CertificateRecord` (server only), `PublicCertificate` (approved public fields), response types |
| `lib/certificates/validation.ts` | Shared validation and normalisation (serial, name, Aadhaar last 4) — re-run on the server |
| `lib/certificates/verify.ts` | Matching logic, HMAC fingerprint, expiry/revocation status. Pure functions, unit-tested |
| `lib/certificates/repository.ts` | **Connection point.** `getCertificateRepository()` returns `null` today; `certificateVerificationAvailable()` gates the UI |
| `lib/rate-limit.ts` | In-memory fixed-window limiter (single instance — see §4) |
| `app/api/certificate-verification/route.ts` | The only endpoint. POST only; every other method gets 405 |
| `components/sections/certificates/*` | Page UI (form, results, privacy notes) |

The page is prerendered, so `certificateVerificationAvailable()` is evaluated at build time.
After connecting a store, **rebuild and redeploy** (with approval) to enable the button.

## 2. Verification rules

A certificate is reported only when **all four** match one record:

1. Certificate type (`PLAYER` / `COACH`)
2. Serial number: upper case, spaces removed. Lookup is by `(type, serial)` only, never by name
3. Full name: Unicode NFKC, case-insensitive, full stops and repeated spaces ignored
4. Aadhaar last 4 digits, compared as a keyed fingerprint (see §3)

- **Any mismatch** (or an unknown serial) returns the same `{ "result": "not_verified" }`, shown as
  "Certificate could not be verified with the provided details." It never says which field was wrong
  or whether the serial exists.
- **Records with no Aadhaar fingerprint cannot be verified.** This is deliberate policy.
- **Status is reported accurately.** `REVOKED` shows "Certificate Revoked". `EXPIRED`, or `ACTIVE`
  with a past `expiryDate`, shows "Certificate Expired". Only a genuinely active certificate shows
  "Certificate Verified".
- **Public result fields:** type, serial number, holder name, issue date, valid-until date and status.
  No internal id, Aadhaar data or fingerprint is ever returned.

## 3. Aadhaar data handling

- The form asks for the **last four digits only**. A pasted longer number is discarded, not truncated.
- Digits are never put in URLs, logs, analytics, cookies or browser storage. The browser clears them
  as soon as a request completes. The server does not log request bodies.
- **The store keeps a fingerprint, not the digits.** Each record stores
  `aadhaarLast4Hash = HMAC-SHA256(CERTIFICATE_AADHAAR_HMAC_KEY, "kai-cert-v1:<SERIAL>:<last4>")`.
  - A plain hash of four digits could be reversed by trying all 10,000 values, so a secret key is
    used, and the serial is included so equal digits look different on different certificates.
  - Comparison is constant-time.
- `CERTIFICATE_AADHAAR_HMAC_KEY` must be a random secret of at least 32 characters
  (e.g. `openssl rand -base64 48`).
  - It is stored only in server environment variables, never with a `NEXT_PUBLIC_` prefix.
  - The same key must be used by the import tool. Rotating it requires re-fingerprinting every record.
- **Before going live, KAI must obtain legal advice and record approval** covering:
  - the purpose of the processing;
  - consent and the notice to certificate holders (update `/privacy-policy`);
  - retention periods;
  - compliance with the Aadhaar Act 2016 and regulations and the Digital Personal Data Protection Act 2023.

  Last-4 digits are still identity-linked data. If a lawful basis cannot be established, remove
  the field and match on type, serial and name (plus, for example, date of birth or issue date).

## 4. Security checklist

| Requirement | Implemented now | Needed for production |
| --- | --- | --- |
| Unique serial numbers | — | `UNIQUE (certificate_type, serial_number)` in the store |
| Server-side validation | ✅ `validateVerification` in the route | — |
| Rate limiting | ✅ 5/min and 20/hour per hashed client IP (in memory) | A shared store (e.g. Redis/Upstash) if hosting is serverless or multi-instance. Trust `x-forwarded-for` only behind a known proxy |
| Bot protection | ✅ Honeypot, same-origin check, JSON-only, 2 KB limit | Consider Cloudflare Turnstile or hCaptcha on the form (needs keys; verify on the server) |
| No record exposure | ✅ Lookup by exact type + serial; public fields only; generic failures | Read-only DB user limited to the lookup query |
| No Aadhaar in URLs/logs/analytics/storage | ✅ POST body only, no logging, cleared in the browser | Make sure the host's request logging does not capture bodies |
| HTTPS | — | Enforced by hosting (Vercel default). Add HSTS on the production domain |
| No search by name alone | ✅ No such endpoint exists | Keep admin search internal (§5) |
| No hint whether Aadhaar belongs to someone | ✅ Generic result; fingerprint is serial-bound | — |
| Restricted access to records | ✅ Nothing exposed publicly | DB in a private network; separate admin credentials; audit log |
| Caching | ✅ `Cache-Control: no-store`, `X-Robots-Tag: noindex`; `/api/` disallowed in robots.txt | — |

## 5. Suggested data model (production store)

```sql
create table certificates (
  id                  uuid primary key default gen_random_uuid(),
  certificate_type    text not null check (certificate_type in ('PLAYER','COACH')),
  serial_number       text not null,           -- canonical: upper case, no spaces
  full_name           text not null,
  aadhaar_last4_hash  char(64),                -- HMAC, never the digits
  issue_date          date,
  expiry_date         date,
  status              text not null check (status in ('ACTIVE','EXPIRED','REVOKED')),
  revoked_reason      text,                    -- internal only, never public
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (certificate_type, serial_number)
);

create table certificate_audit (
  id             bigserial primary key,
  certificate_id uuid references certificates(id),
  action         text not null,     -- CREATE | UPDATE | REVOKE | IMPORT
  actor          text not null,     -- authenticated official
  changes        jsonb not null,    -- field diffs; Aadhaar fields recorded as "changed" only
  at             timestamptz not null default now()
);
```

Connecting it means implementing `CertificateLookup.findBySerial` in `lib/certificates/repository.ts`
as one parameterised `select … where certificate_type = $1 and serial_number = $2`.

## 6. Admin workflow (future — not built, not exposed)

There are no admin pages or import endpoints in this codebase, and none should be added without
authentication. The suggested design:

1. **Separate, authenticated admin area.** Either a different app or a route group protected by
   real authentication with MFA. Accounts are named, for authorised KAI officials only.
   Use role-based access: *viewer*, *editor*, *approver*.
2. **Add / edit records.** The form computes the Aadhaar fingerprint on the server when an official
   enters last-4 digits; the digits are discarded immediately. Edits require the *editor* role, and
   approved records are locked except by an *approver*.
3. **Revoke.** Sets `status = REVOKED` with an internal reason. The record is never deleted.
4. **Import CSV/Excel.**
   - Authenticated upload goes to private storage and is parsed on the server, with a preview and
     validation report: duplicate serials, bad formats, missing fields.
   - An *approver* confirms; then records are inserted in one transaction.
   - Source files are deleted after import, under the agreed retention rule.
   - Last-4 digits in the file are converted to fingerprints during import.
5. **Internal search.** Filter by serial, type, status or name, inside the admin area only.
6. **Audit.** Every change writes to `certificate_audit` (who, what, when). Audit rows are append-only.

## 7. Go-live steps

1. Written approval from KAI for the data processing, plus legal sign-off (§3).
2. Confirm the serial number format. The validator currently accepts 3–40 letters, digits, `-` and `/`;
   tighten the `SERIAL` pattern in `validation.ts` to match.
3. Provision the store (§5) and import verified records with fingerprints.
4. Set `CERTIFICATE_AADHAAR_HMAC_KEY` and the read-only database credentials as server environment variables.
5. Implement `getCertificateRepository()` and replace the rate limiter's memory store if hosting
   is serverless or multi-instance.
6. Update `/privacy-policy` with a certificate verification section.
7. Test against a staging copy, then rebuild and deploy with approval.
