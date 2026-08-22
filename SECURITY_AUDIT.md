# Security Review — Maurya Technologies Platform

**Stack**: Next.js 16 (App Router), React 19, MongoDB Atlas (Mongoose), Vercel, Tailwind CSS v4
**Reviewed**: 2026-08-23
**Scope**: All app routes, 18 API endpoints, middleware, auth, data layer, client components

> This file previously reported a "100 / 100 — Zero Risk" score. That was not
> accurate: the review below found an unauthenticated admin-takeover endpoint,
> credentials committed to git, and 12 open dependency advisories. Treat any
> future self-assessed score here with the same skepticism — the value of this
> document is the findings list, not the grade.

---

## 1. Critical — fixed in code, but require operator action

### 1.1 Secrets committed to git

`.env.local` was tracked in git (commits `e3f613c`, `cacb2fc`) containing the
live MongoDB Atlas URI, Gmail SMTP app password, Vercel Blob read/write token,
`JWT_SECRET`, and Razorpay key/secret/webhook secret.

- **Done**: file untracked (`git rm --cached`), `.gitignore` corrected,
  `.env.example` added with placeholders only.
- **Still required**: the secrets remain in git history. **Every credential in
  that file must be rotated.** Untracking does not revoke anything.
  - MongoDB Atlas: rotate the database user password.
  - Gmail: revoke and regenerate the app password.
  - Vercel Blob: regenerate `BLOB_READ_WRITE_TOKEN`.
  - `JWT_SECRET`: regenerate (`openssl rand -base64 48`). This invalidates all
    existing admin sessions, which is the desired outcome.
  - Razorpay: roll the key secret and webhook secret in the dashboard.

### 1.2 Unauthenticated admin takeover via `/api/admin/seed`

`POST /api/admin/seed` imported `verifyToken` but never called it. Any anonymous
caller could invoke it, and the handler unconditionally upserted the superadmin
account with a **hardcoded password and 6-digit PIN** committed in source. A
single unauthenticated request reset the primary admin credentials to values
readable in the repository.

- **Fixed**: the route now requires a valid `admin_token` **and** the
  `superadmin` role, logs unauthorized attempts, and never touches an existing
  user's credentials. First-run bootstrap only happens when the user collection
  is empty, and reads `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` /
  `SEED_ADMIN_PIN` from the environment.
- **Still required**: the previously hardcoded password and PIN are in git
  history. Change the admin password and Security PIN.

### 1.3 Hardcoded JWT signing-secret fallback

`lib/auth.js` and `middleware.js` both used
`process.env.JWT_SECRET || 'fallback-secret-maurya-tech-2026-production-secure'`.
Any deploy missing the env var would silently sign and accept tokens with a
secret published in the repository — anyone could forge an admin session.

- **Fixed**: both modules now throw at import time if `JWT_SECRET` is absent or
  shorter than 32 characters. Fail-fast beats silently-insecure.

---

## 2. High

| # | Issue | Status |
|---|---|---|
| 2.1 | `/api/upload` had no auth **and** no rate limit — anonymous callers could push unlimited 10 MB files into paid Vercel Blob storage | Fixed: 5 uploads / 10 min / IP, extension must match declared MIME type, explicit `contentType` on write, random suffix |
| 2.2 | `/api/analytics/track` was an unauthenticated unbounded DB write — trivially floodable | Fixed: 60 events / 5 min / IP, path and referrer validated and length-capped |
| 2.3 | JSON-LD injected via `JSON.stringify` in `dangerouslySetInnerHTML`. `JSON.stringify` does not escape `<`, so DB-sourced job content containing `</script>` breaks out of the tag → stored XSS on `/careers/[id]` | Fixed: `serializeJsonLd()` in `lib/utils.js` escapes `<` as `<`; applied at all three JSON-LD sites |
| 2.4 | Untrusted form input interpolated raw into outbound HTML emails (contact, applications, status updates, security alerts) — HTML injection into the admin's inbox | Fixed: `escapeHtml()` applied to every interpolated value |
| 2.5 | 12 open dependency advisories, 10 high (Next.js request smuggling, `next/image` cache exhaustion, several ReDoS) | Fixed: Next.js 16.1.6 → 16.3.2 plus `npm audit fix`; 12 → 1 |
| 2.6 | `error.message` returned to clients from 25 catch blocks, leaking stack/driver internals | Fixed: generic `Internal server error` to clients, full error to server logs |

### 2.7 Outstanding — `nodemailer` advisory

`nodemailer@8.0.11` is affected by GHSA-p6gq-j5cr-w38f (message-level `raw`
option bypasses `disableFileAccess`/`disableUrlAccess`, enabling arbitrary file
read and SSRF). **This codebase never uses the `raw` option**, so it is not
reachable here. The fix is `nodemailer@9`, a major version bump that was not
applied because the SMTP path cannot be verified end-to-end in this environment.
Upgrade and test the contact/application/reset flows when convenient.

---

## 3. Medium

| # | Issue | Status |
|---|---|---|
| 3.1 | Contact route spread the raw request body into `Inquiry.create()` — arbitrary fields, unbounded document size | Fixed: 15-field whitelist with per-field length caps |
| 3.2 | `PUT /api/applications/[id]` wrote the raw body to the document | Fixed: only `status` and `notes` are updatable; `runValidators` enabled |
| 3.3 | `POST /api/posts|projects|services` crashed with a 500 on a missing `title` (`body.title.toLowerCase()`) | Fixed: explicit 400 |
| 3.4 | `target="_blank"` without `rel` on applicant-supplied resume URLs in the admin panel (reverse tabnabbing) | Fixed: `rel="noopener noreferrer"` on all 13 sites |
| 3.5 | `favicon.zip` (5 MB build artifact) served publicly at `/favicon.zip` | Fixed: deleted |

### 3.6 Outstanding — `MarkdownRenderer` uses `rehype-raw` without sanitization

`components/ui/MarkdownRenderer.jsx` enables `rehype-raw`, which parses raw HTML
in markdown. It neutralizes `script`/`iframe`/`object`/`embed` by tag name, but
that is a denylist — it does not cover attribute-based vectors such as
`<img src=x onerror=…>` or `<svg onload=…>`.

Blog content is admin-authored today, so the practical risk is limited to an
already-compromised admin account. If post authoring is ever delegated, add
`rehype-sanitize` before `rehype-raw`.

### 3.7 Outstanding — CSP allows `unsafe-inline` and `unsafe-eval`

`next.config.mjs` sets `script-src 'self' 'unsafe-inline' 'unsafe-eval'`, which
removes most of the CSP's value against XSS. Tightening this requires
nonce-based CSP via middleware — a real change, not a config tweak. The header
set is otherwise solid (HSTS preload, `X-Frame-Options: DENY`,
`frame-ancestors 'none'`, `nosniff`, Permissions-Policy).

---

## 4. Controls verified as working

- **Authentication**: bcrypt cost 12; optional second-factor 6-digit PIN, also
  bcrypt-hashed; JWT HS256 via `jose`; HttpOnly + SameSite=Lax + Secure cookie.
- **Account lockout**: DB-backed, 5 failed attempts → 15-minute lock, applied to
  both password and PIN failures.
- **Rate limiting**: login (10/5min), forgot-password (3/10min),
  reset-password (5/10min), contact (5/5min), apply (5/5min), and now upload and
  analytics.
- **User enumeration**: forgot-password returns an identical response for known
  and unknown addresses.
- **Password reset**: 32-byte random token, stored as a SHA-256 hash, 15-minute
  expiry, single use, clears lockout state.
- **NoSQL injection**: `escapeRegex()` on the application search filter; all
  other filters are typed and length-capped.
- **SSRF**: resume and LinkedIn URLs restricted to `http:`/`https:`.
- **Authorization**: every mutating CMS route and every read of applications,
  inquiries, and analytics verifies the JWT.
- **Security logging**: structured JSON events with throttled email alerting.

### 4.1 Note on the rate limiter

`lib/rateLimit.js` is an in-process `Map`. On Vercel each serverless instance has
its own copy, so the effective limit is (configured limit × concurrent
instances), and counters reset on cold start. It raises the cost of brute force
but is not a hard ceiling. For a real guarantee, move to Vercel KV / Upstash
Redis or Vercel's WAF rate limiting.

### 4.2 Note on the CSRF check

`middleware.js` rejects mutations when `Sec-Fetch-Site: cross-site` is present
and when `Origin` mismatches `Host`. Both signals are browser-supplied, so a
non-browser client omitting them passes — which is fine, since CSRF requires a
browser. The check is sound for its threat model.

---

## 5. Recommended next steps

1. **Rotate every credential in §1.1.** Nothing else here matters as much.
2. Change the admin password and Security PIN (§1.2).
3. Set `JWT_SECRET` in the Vercel project settings before the next deploy — the
   app now refuses to boot without it (this is intentional).
4. Upgrade `nodemailer` to v9 and test the mail flows (§2.7).
5. Move rate limiting to shared storage if the admin panel becomes a real target.
6. Consider nonce-based CSP to drop `unsafe-inline` (§3.7).
