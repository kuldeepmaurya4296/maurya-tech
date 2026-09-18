# Maurya-Tech Application Restructuring Plan
## From Agency Portfolio Site → Scalable Multi-Country Platform

---

## 0. How This Plan Was Derived

This is not a theoretical document. It is based on:

1. `maurya-tech-plan.md` — the original global-platform vision (12 countries, full automation, multi-engine monetization).
2. A live audit of the current production codebase (`maurya-tech.com`, this repo) — Next.js 16 App Router, Mongoose/MongoDB, JWT admin auth, Razorpay, Vercel Blob.
3. Real production data reviewed during this engagement — current traffic (~538 lifetime views, mostly on `/careers`, `/`, `/projects`), and the discovery that all 12 CRM "leads" in `/admin/inquiries` are bot-generated spam (no CAPTCHA/honeypot on `/api/contact`).
4. Explicit scope decisions made in this conversation:
   - **Launch scope: 3 countries only — India, USA, UK.** (Not 12. Tier-2/3 countries from `maurya-tech-plan.md` remain a *future* option the architecture must not block, but they are out of scope for build/content work now.)
   - **No paid AI API / paid SEO tool budget initially.** Content automation must work with $0 recurring cost (free-tier LLMs or the existing Claude Code subscription), and must degrade to a fully manual workflow at any time.
   - **Every automated step must have a manual fallback.** Automation is an optional accelerant, never a hard dependency.
5. A follow-up live production + Vercel Analytics review, which confirmed `@vercel/analytics` is already active and correctly capturing traffic, and that `/careers/*` already carries 60%+ of non-homepage traffic — both directly reshape §12 (Analytics), §6.5/§7 (UI/keyword strategy), and §11.4–§11.5 (monetization) below.

This plan restructures the **existing** codebase incrementally — it does not propose a throwaway rewrite. Working modules (auth, Razorpay, email, rate limiting, security headers) are kept and extended, not replaced.

---

## 1. Current State Audit (as of this repo)

### 1.1 What exists today

| Layer | Current implementation |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| DB | MongoDB via Mongoose (`lib/mongodb.js`) |
| Auth | JWT cookie (`admin_token`), `jose`-based verification in `middleware.js`, single implicit "admin" role |
| Content model | `Post` (blog only) — no `country`, no `language`, no draft/review workflow (only `isPublished: Boolean`) |
| Other models | `Job`, `Application`, `Project`, `Service`, `Inquiry`, `Analytics`, `User` |
| Payments | Razorpay already integrated (`RAZORPAY_KEY_ID/SECRET`) — currently unused for a real product |
| Analytics | Custom in-house tracker (`components/effects/AnalyticsTracker.jsx` → `POST /api/analytics/track`) — page/device level, no country/tool/revenue events |
| Security | CSRF/origin checks + rate limiting (`lib/rateLimit.js`, in-memory) + security headers (`next.config.mjs`) — solid foundation |
| Routing | Flat routes: `/`, `/blog`, `/blog/[slug]`, `/careers`, `/careers/[id]`, `/services`, `/projects`, `/products`, `/pricing`, `/about`, `/contact`, `/technologies`, `/terms`, `/privacy` |
| Admin | `/admin/*` — Dashboard, Job Applications, Careers CMS, Portfolio CMS, Services CMS, Blog CMS, Inquiries & Leads, Settings & Seed |
| i18n / country routing | **None.** No `[country]` or `[locale]` segment anywhere. |
| Automation | **None.** No job queue, no AI content pipeline, no scheduler. |
| Tools/calculators | **None built yet.** (`maurya-tech-plan.md`'s core traffic driver does not exist in code.) |

### 1.2 Confirmed gaps vs. the target platform

1. Site is currently a **dev-agency portfolio site** (careers/projects/services/contact), not a content-and-tools platform. The two can and should coexist under one codebase.
2. `Inquiry` (the lead-capture model) has **no bot protection** — confirmed all 12 stored leads are spam (random-string names, Gmail dot-trick emails, numeric junk in subject). This must be fixed before any lead-generation numbers mean anything.
3. `Post` model cannot represent country-specific or localized content — no `country`, `language`, `status` (draft/review), or `version` fields.
4. No reusable "Tool" concept exists — every calculator would currently have to be hand-built with no shared country-rules engine.
5. No automation/job infrastructure exists at all — this must be built from zero, cheaply.

### 1.3 What must NOT be rebuilt

- Auth/JWT/middleware CSRF protection — extend with roles, don't replace.
- Razorpay integration — reuse for digital products.
- Rate limiting utility — reuse for all new public endpoints.
- Security headers/CSP in `next.config.mjs` — extend allow-lists only when a new ad/affiliate script is added.
- Existing agency pages (`/careers`, `/services`, `/projects`) — these stay as-is; they are a working lead channel once spam is fixed.

---

## 2. Target Architecture Principles

Carried forward from `maurya-tech-plan.md` §44 and §59, made concrete for this codebase:

1. **One Next.js app, N countries.** No `if (country === "IN")` scattered in components. All country behavior flows through a single `MarketProfile` config resolved once per request.
2. **Automation is a pluggable layer, never a hard requirement.** Every AI-assisted step (research, draft, localize, SEO-check) has a manual, form-based equivalent in the admin. Turning automation OFF must not break any workflow — it just means a human does the same step by hand in the same UI.
3. **Provider-agnostic AI adapter.** The automation layer calls one internal interface (`lib/automation/aiProvider.js`), not a specific vendor SDK. Today it can point at "none" (fully manual) or a free-tier model; later it can point at a paid model — without touching any other file.
4. **Content is versioned and gated by risk**, not by convenience. Tax/salary/legal content always requires human approval regardless of automation mode.
5. **Launch scope ≠ architecture ceiling.** Build for N countries; ship 3.
6. **Zero-cost first.** Every new piece of infra defaults to a free tier (Vercel Hobby, MongoDB Atlas free tier, free-tier LLMs, free ad/affiliate signups) and is designed to swap to a paid tier later without a rewrite.

---

## 3. Target Folder / Route Architecture

### 3.1 Public routes — add a country segment, keep existing routes working

```text
app/
├── (marketing)/                 # existing agency pages — unchanged
│   ├── page.js                  # home (existing)
│   ├── about/
│   ├── careers/
│   ├── services/
│   ├── projects/
│   ├── products/
│   ├── pricing/
│   ├── contact/
│   ├── technologies/
│   ├── terms/
│   └── privacy/
│
├── [country]/                   # NEW — country-scoped platform
│   ├── layout.js                 # resolves MarketProfile, sets lang/dir, hreflang links
│   ├── page.js                    # country landing page
│   ├── tools/
│   │   ├── page.js                 # tool directory for this country
│   │   └── [toolSlug]/page.js      # e.g. /in/tools/ctc-calculator
│   ├── guides/
│   │   └── [slug]/page.js          # e.g. /us/guides/resume-guide
│   └── blog/
│       └── [slug]/page.js          # country-scoped blog (falls back to global Post if no localized version)
│
├── blog/[slug]/                 # existing GLOBAL blog stays for non-country content
├── admin/                       # existing admin, extended (see §9)
└── api/                         # existing API, extended (see §5–§8)
```

Initial enabled values for `[country]`: `in`, `us`, `uk` only (§10). The dynamic segment itself supports unlimited values later — adding Germany is a config row, not a new folder.

### 3.2 Why keep `(marketing)` separate from `[country]`

The existing agency site is a genuine, working lead channel (careers/projects/services/contact). It should not be forced into the country-content model. The new `[country]` tree is purely for the tools/content/SEO platform described in `maurya-tech-plan.md`. Both share the same DB, same admin, same auth.

---

## 4. Country & Locale Engine

### 4.1 New model: `Country`

```js
// lib/models/Country.js
{
  code: 'IN' | 'US' | 'UK',        // ISO-ish, lowercase in URLs
  name: String,
  enabled: Boolean,                 // feature flag — disable without deleting content
  defaultLanguage: String,          // 'en-IN'
  supportedLanguages: [String],     // ['en-IN', 'hi-IN']
  currency: String,                 // 'INR'
  timezone: String,                 // 'Asia/Kolkata'
  dateFormat: String,
  numberFormat: String,
  terminology: Map,                 // { ctc: 'CTC', salary: 'In-hand salary' }
  seoRules: {
    hreflangGroup: String,
  },
  monetizationRules: {
    adNetwork: String,              // 'adsense' | 'ezoic' | 'none'
    affiliateNetworks: [String],
  },
  launchTier: Number,               // 1 = India/US/UK, 2 = Canada/AU/UAE/DE, 3 = rest
}
```

Seeded rows at launch: **India (`in`), USA (`us`), UK (`uk`)** — `enabled: true`. All Tier-2/3 countries from `maurya-tech-plan.md` §6 can be pre-seeded with `enabled: false` so the schema/UI is proven, but **no content work happens for them yet.**

### 4.2 Detection priority (implemented in `middleware.js`, extending the existing file — not a new middleware)

```text
1. Explicit ?country= query or /country-picker selection → cookie `preferred_country`
2. Saved cookie `preferred_country`
3. Vercel/Cloudflare geo header (x-vercel-ip-country) if trusted
4. Accept-Language header
5. Fallback: 'in' (primary launch market)
```

**Hard SEO rule (from `maurya-tech-plan.md` §13):** detection only affects the **root `/` redirect suggestion** (a dismissible banner), never a forced 30x redirect on `/[country]/...` URLs. Googlebot always gets the stable HTML for whatever country URL it requests.

### 4.3 `MarketProfile` resolution

A single cached lookup (`lib/market/getMarketProfile.js`) reads `Country` + its `terminology`/`seoRules`/`monetizationRules` once per request (cached via `unstable_cache` / Next.js data cache, invalidated on admin edit). Every page, tool, and API route reads from this object — never inline country checks.

---

## 5. Content Engine

### 5.1 Extend, don't discard, `Post`

Rather than a risky big-bang schema replacement, `Post` is generalized into `Content` in two steps:

**Step 1 (non-breaking):** add fields to `Post`:
```js
country: { type: String, enum: ['GLOBAL', 'IN', 'US', 'UK'], default: 'GLOBAL', index: true },
language: { type: String, default: 'en' },
scope: { type: String, enum: ['GLOBAL', 'LOCALIZED', 'COUNTRY_EXCLUSIVE'], default: 'GLOBAL' },
status: { type: String, enum: ['draft', 'review', 'published'], default: 'published' }, // default keeps existing posts live
sourceType: { type: String, enum: ['manual', 'ai_assisted'], default: 'manual' },
version: { type: Number, default: 1 },
sources: [{ url: String, publisher: String, claim: String, verifiedAt: Date }],
```
Existing posts default to `status: 'published', country: 'GLOBAL'` — **zero behavior change** for current content.

**Step 2 (additive):** a new `Tool` content type (see §6) and a new `ContentVersion` collection for history, per `maurya-tech-plan.md` §38:
```js
// lib/models/ContentVersion.js
{ contentId, contentType: 'post'|'tool', versionNumber, snapshot, editedBy, createdAt }
```

### 5.2 Classification (from `maurya-tech-plan.md` §10), enforced at creation time

- **GLOBAL** — one page, no `/[country]/` prefix (e.g. generic image compressor if ever built).
- **LOCALIZED** — same tool concept, country-specific rules/copy (e.g. Salary Calculator: same UI, different tax/currency logic per country).
- **COUNTRY_EXCLUSIVE** — only exists for one market (e.g. India CTC Calculator, UK Council Tax guide).

### 5.3 Publishing workflow

```text
draft → review → published
```
Matches `maurya-tech-plan.md` §22 exactly:
- **Auto-publish allowed:** generic tool descriptions, non-financial evergreen text, template pages — only after the Quality Gate (§7) passes.
- **Human approval required:** anything touching tax, salary/financial calculations, immigration, legal, or affiliate claims — **always**, automation on or off.

---

## 6. Tools Engine (the actual traffic driver — currently 0% built)

### 6.1 New model: `Tool`

```js
// lib/models/Tool.js
{
  slug: String,                     // 'ctc-calculator'
  name: String,
  category: String,                 // 'salary', 'career', 'general'
  countries: [String],              // ['IN'] or ['IN','US','UK'] for a shared tool
  scope: 'GLOBAL' | 'LOCALIZED' | 'COUNTRY_EXCLUSIVE',
  computeConfig: Object,             // country-specific formula/rate table, NOT hardcoded in the component
  seo: { title, description, faqSchema },
  status: 'draft' | 'review' | 'published',
  enabled: Boolean,                  // feature flag, per maurya-tech-plan.md §45
}
```

### 6.2 Reusable architecture (per `maurya-tech-plan.md` §44 example)

```text
<SalaryTool />               ← one React component
   ↓ reads
Tool.computeConfig[country]  ← India tax slabs / US federal+state / UK PAYE bands
   ↓ renders via
Shared calculator UI kit (components/tools/*)
```

One component, N countries. Adding UK council-tax rules is a `computeConfig` edit, not a new component.

### 6.3 Launch-3-country tool list (initial 12–15, matches `maurya-tech-plan.md` §7.1–§7.3 + §50)

| Tool | IN | US | UK |
|---|---|---|---|
| Salary / Take-home calculator | ✓ (CTC/in-hand) | ✓ (hourly→annual) | ✓ (PAYE) |
| EMI calculator | ✓ | — | — |
| Percentage calculator | ✓ | ✓ | ✓ |
| Age calculator | ✓ | ✓ | ✓ |
| Date difference | ✓ | ✓ | ✓ |
| CGPA calculator | ✓ | — | — |
| ATS resume checker | ✓ | ✓ | ✓ |
| Resume/CV builder | ✓ | ✓ | ✓ |
| Unit conversion | ✓ | ✓ | ✓ |
| Hourly-rate/freelance calculator | ✓ | ✓ | ✓ |

This table is the live version of `maurya-tech-plan.md` §28's "Country Content Matrix," and should be rendered in the admin (§9) directly from the `Tool` collection, not maintained by hand in a doc.

### 6.4 Execution model: 100% client-side calculation, server-side only for SEO shell

**Mandated, not optional:** every calculator/math utility (CTC, EMI, Percentage, Age, hourly-rate, unit conversion, etc.) runs **entirely in the browser** using client React state + `useMemo`. There is no `POST /api/tools/calculate`-style round-trip for any of these.

```text
Server Component (RSC)                     Client Component
  ├── fetches Tool.computeConfig[country]     ├── receives computeConfig as a prop
  ├── renders SEO metadata                    ├── owns input state (useState)
  ├── renders structured data (Schema.js)     ├── derives result via useMemo(() => calculate(inputs, computeConfig), [inputs])
  └── renders FAQ/guide content               └── re-renders instantly on every keystroke — 0 network calls
```

Why this is mandatory, not a nice-to-have:
- **Zero backend load, zero serverless execution cost regardless of traffic spikes.** A viral tool page with 50,000 concurrent users triggers zero additional Vercel function invocations for the calculation itself — only the initial page render.
- **Instant UX** — no loading spinner between keystrokes, which matters directly for SEO dwell-time/engagement signals (`maurya-tech-plan.md` §16).
- Server Components are strictly scoped to: SEO metadata (`generateMetadata`), localized structured data (`Schema.js` — `FAQPage`/`SoftwareApplication`), and injecting the localized `computeConfig` object into the client component as a serializable prop. They never perform the calculation itself.

The only server round-trip allowed on a tool page is the optional, rate-limited `tool_completed` analytics beacon (§12.3) — fired once per completed calculation, not per keystroke.

### 6.5 UI & Theme Strategy — Agency vs. Tools/Guides

Two visually and functionally distinct zones exist in the same codebase; the theme must switch deliberately at the route boundary, not bleed across it.

| Zone | Routes | Theme |
|---|---|---|
| Agency / Portfolio | `/`, `/services`, `/projects`, `/about`, `/careers`, `/contact` | Keep existing dark mode (`engineer-dark`) — unchanged |
| Tools & Guides | `/[country]/tools/*`, `/[country]/guides/*` | New `global-authority` theme: clean white background, Deep Navy `#0A2540` primary, Cyan accent — or respect system `prefers-color-scheme` if the visitor has no saved preference |

**Rationale for a light default on tools/guides:**

1. **Ad/affiliate CTR and RPM.** AdSense and affiliate banner units are near-universally designed for light backgrounds; they blend natively and measurably outperform (2–3x higher CTR/RPM in industry benchmarks) when the surrounding page is light rather than dark.
2. **Readability of dense numerical/financial tables.** Salary slabs, EMI amortization tables, and tax-bracket breakdowns are easier to scan on a light, high-contrast surface than on a dark card.
3. **Trust signal.** Financial/calculator tools (salary, tax, EMI) read as more "official"/trustworthy on a clean white layout — closer to the visual language of government/bank calculator pages the target audience already trusts.

The agency/portfolio dark theme is left untouched because it serves a different goal (visual differentiation, developer-audience aesthetic) and is not carrying ad/affiliate units.

**Mobile-first rules for calculator UI (`components/tools/*`)** — given most India/US calculator search traffic is mobile:

- Minimum **48px touch targets** on every input, button, and toggle.
- Numeric inputs use `inputMode="numeric"` (and `pattern="[0-9]*"` where appropriate) to trigger the numeric keyboard on mobile.
- The result is shown in a **prominent, visually distinct "instant result" card** the moment inputs are valid — no separate "Calculate" button required, consistent with the zero-round-trip model above.
- Every tool ships a one-click **"Copy Result"** and **"Share"** button (native `navigator.share` with a clipboard fallback) — low-effort virality and repeat-usage driver called out in `maurya-tech-plan.md` §4.7/§31.

---

## 7. SEO Engine

Concrete implementation of `maurya-tech-plan.md` §15–§17, scoped to 3 countries:

- **Canonical + hreflang**: `app/[country]/layout.js` emits `<link rel="alternate" hreflang="...">` for every enabled country that has an equivalent piece of content (looked up via a shared `slugGroup` field linking localized variants of "the same" tool/guide across countries).
- **Sitemap segmentation**: extend `app/sitemap.js` to emit `sitemap-in.xml`, `sitemap-us.xml`, `sitemap-uk.xml`, `sitemap-global.xml`, generated from `Content`/`Tool` `status: 'published'` queries.
- **Structured data**: `FAQPage`, `Article`, `SoftwareApplication` schema generated from existing content fields — only emitted when the underlying fields are actually populated (no fabricated schema, per `maurya-tech-plan.md` §15).
- **Programmatic SEO guardrail**: a page is only auto-publishable if it passes the Quality Gate below. No bulk-generating thin country×tool combinations.

### 7.1 Content Quality Gate (from `maurya-tech-plan.md` §23, implemented as a function, not a doc)

`lib/content/qualityGate.js` runs before any status can move to `published`:

```text
✓ country + language set correctly
✓ primaryKeyword present
✓ min word count / min tool-config completeness
✓ no duplicate slug/keyword within the same country
✓ meta title/description present
✓ at least 1 internal link
✓ image alt text present (if image used)
✓ financial/legal claims have a `sources[]` entry
```
Fails → `status` forced to `review`, never silently published — mirrors §23's "review queue."

### 7.2 Day-1 Long-Tail Keyword Strategy (first 30–60 days)

Generic head terms ("salary calculator", "resume builder") are high-competition and will not rank in the first two months against calculator.net, ClearTax, Groww, etc. The first 4–5 tools per country (§6.3, §10) should be written and SEO-tagged (`primaryKeyword`, title, H1) against **high-intent, low-competition long-tail queries** instead — these convert better and rank faster for a brand-new domain:

**India:**
- "TCS CTC to in-hand salary calculator"
- "Infosys freshers in-hand salary"
- "new tax regime 7 lakh slab in-hand salary"
- "freelance hourly rate calculator India"

**USA:**
- "1099 vs W2 take home pay calculator"
- "hourly to annual wage calculator with tax"

These exact phrases (and their natural variants) drive the initial `Tool.seo` / `Content.primaryKeyword` values for the Phase 3 launch tools — not generic category names. As rankings and traffic data come in (via Vercel Analytics + Google Search Console, both free), the keyword list expands from this seed set rather than starting from broad terms.

---

## 8. Automation Engine — Manual-First, Automation-Optional

This section directly answers the requirement: *"automation integration ya unavailability ya jarurat padne par manual bhi ho sake — sari option ho."*

### 8.1 Design rule

**Every automated action is just a pre-fill of the exact same admin form a human would use.** There is no automation-only code path. Concretely:

```text
Content Studio (admin UI)
  ├── "Write manually"      → empty form, human fills every field, saves as draft
  └── "Generate with AI"    → same form, pre-filled by an AutomationJob, human still reviews/edits before save
```

If automation is OFF, disabled, or the provider is unreachable, the **"Generate with AI" button is hidden or shows an error toast** — the "Write manually" path is always present and fully functional. Nothing in the publishing pipeline requires automation to have run.

### 8.2 Provider-agnostic AI adapter (zero-cost by default)

```js
// lib/automation/aiProvider.js
export async function generateDraft({ country, topic, contentType }) {
  const provider = process.env.AI_PROVIDER || 'none';
  switch (provider) {
    case 'none':    return null; // manual-only mode — Content Studio just opens a blank form
    case 'groq':    return callGroqFreeTier(...);   // free tier, no cost
    case 'gemini':  return callGeminiFreeTier(...); // free tier, no cost
    case 'claude-code-job': return null; // handled by an external scheduled agent (see 8.4), not inline
    default: throw new Error('Unknown AI_PROVIDER');
  }
}
```

Swapping providers later (including a paid one) is an env var change — nothing else in the app references a vendor SDK directly.

### 8.3 New models

```js
// lib/models/AutomationRule.js
{
  feature: 'content_research'|'content_draft'|'localization'|'seo_check'|'internal_linking'|'auto_publish',
  country: String | 'ALL',
  category: String | 'ALL',
  mode: 'manual' | 'assisted' | 'automated',   // maurya-tech-plan.md §25
  enabled: Boolean,
  confidenceThreshold: Number,
  requiresHumanApproval: Boolean,
}

// lib/models/AutomationJob.js
{
  jobType: String,
  status: 'queued'|'running'|'completed'|'failed'|'needs_review'|'cancelled',
  input: Object,
  output: Object,
  error: String,
  retryCount: Number,
  startedAt: Date,
  completedAt: Date,
  logs: [String],
}
```

This is `maurya-tech-plan.md` §24/§42 made real, but every `AutomationRule` **defaults to `mode: 'manual', enabled: false`** on creation for any new country/category — automation must be explicitly turned on per scope, never assumed.

### 8.4 Recommended zero-cost automation runner (matches earlier discussion)

Two supported options, both $0:

1. **Claude Code scheduled agent** (`schedule` skill) — runs on a cron, does free web research, drafts content for one of the 3 launch countries, and calls an internal admin API (`POST /api/admin/content-drafts`) to create a `Content`/`Tool` row with `status: 'review', sourceType: 'ai_assisted'`. Uses the existing Claude Code subscription — no new billing.
2. **Vercel Cron (free tier) → Groq/Gemini free-tier API** — for a fully server-side pipeline independent of an open Claude Code session.

Either way, output always lands in `status: 'review'`, never `published`, until a human acts — satisfying `maurya-tech-plan.md` §19's "90% automation, not 100% autonomous publishing."

### 8.5 Human Approval Rules (unchanged from `maurya-tech-plan.md` §22, now enforced in code)

`lib/content/approvalPolicy.js` hard-codes categories that **cannot** be set to `auto_publish` regardless of `AutomationRule.mode`: tax, salary/financial calculations, immigration, legal, medical, sponsored content, pricing claims, affiliate claims. This is a code-level guardrail, not just a documented rule.

---

## 9. Admin Restructure

Extend the **existing** admin (`app/admin/*`, same sidebar pattern already in place) rather than building a parallel admin:

```text
ADMIN (existing shell, new sections added)
│
├── Dashboard                     (existing — extend KPIs, see §12)
├── Job Applications              (existing, unchanged)
├── Careers CMS                   (existing, unchanged)
├── Portfolio CMS                 (existing, unchanged)
├── Services CMS                  (existing, unchanged)
├── Blog CMS                      (existing — gains status/country/version columns)
│
├── 🌍 Markets              NEW    → Country list (in/us/uk), MarketProfile editor, enable/disable toggle
├── 🧮 Tools                NEW    → Tool registry, per-country computeConfig editor, Country Content Matrix (§6.3 table, live)
├── 🤖 Automation           NEW    → AutomationRule toggles (feature × country × mode), Job queue/log viewer, Content Studio (manual+AI drafting, §8.1)
├── 🔎 SEO                  NEW    → Sitemap status per country, orphan-page report, keyword/opportunity notes
├── 💰 Monetization         NEW    → Ad slot config, affiliate offer list per country, Razorpay product manager
│
├── Inquiries & Leads             (existing — hardened, see §11.1, gains lead-score + spam-flag columns)
└── Settings & Seed                (existing, unchanged)
```

No new admin app/shell — same auth (`admin_token` JWT), same layout, new sidebar sections and new Mongoose-backed pages only.

---

## 10. Launch Scope Lock-In

Per this conversation's explicit decision:

- **Enabled countries at launch: `IN`, `US`, `UK` only.** All Tier-2 (Canada, Australia, UAE, Germany) and Tier-3 (Singapore, Netherlands, NZ, Japan, China) entries from `maurya-tech-plan.md` §6 stay `enabled: false` — schema-ready, content-not-started.
- **No paid AI/SEO tool subscriptions at launch.** `AI_PROVIDER` defaults to `none` or a free tier (`groq`/`gemini`).
- **No paid ad spend.** Growth is organic-SEO + free-tier-affiliate + existing agency lead channel only.

Expanding beyond 3 countries later = inserting a new `Country` document + populating `Tool.computeConfig` + writing localized content for that market. **No code change required** — this is the concrete proof of `maurya-tech-plan.md` §27's "adding a country should be configuration."

**Day-1 content targeting:** the first tools/guides shipped for `IN`/`US`/`UK` are written against the long-tail keyword seed list in §7.2, not generic head terms — this is a launch-scope decision as much as a technical one, since it determines which `computeConfig` variants (specific employer CTC structures, 1099 vs W2 logic, etc.) get built first.

---

## 11. Monetization Engine

### 11.1 Fix first: lead capture integrity

Before any lead number is trusted again:
- Add a **honeypot field** to `/api/contact` (hidden input; if filled, silently reject).
- Add **Cloudflare Turnstile** (free) as a second layer once honeypot data shows it's insufficient.
- Add a basic heuristic flag on `Inquiry` (`spamScore`) — random-case name with no vowels/spaces, or email local-part matching the dotted-Gmail pattern — surfaced as a "Likely Spam" badge in `/admin/inquiries`, not auto-deleted (human still decides).

### 11.2 Revenue channels, country-aware, in priority order (from earlier analysis in this conversation)

| Channel | Setup cost | Traffic needed | Countries |
|---|---|---|---|
| Razorpay digital product (resume templates, premium calculator) | $0 (already integrated) | None | IN primarily, but Razorpay supports intl cards |
| Affiliate links embedded in tools/guides | $0 | None | IN: Amazon.in/EarnKaro/Cuelinks, Groww/Upstox, upGrad/Coursera. US/UK: Amazon Associates, Semrush, Canva, Grammarly, Bluehost |
| Software-dev lead form (existing `/contact`, now spam-fixed) | $0 | Low | All 3 |
| Google AdSense / Ezoic | $0 (revenue share) | Needs real traffic (~1k+/day) | All 3, higher RPM in US/UK |

`Content`/`Tool` documents carry a `monetization` sub-object (per `maurya-tech-plan.md` §29) resolved against the `MarketProfile.monetizationRules` — e.g. a US business-software guide shows a Semrush affiliate CTA + a "Get a custom quote" lead form; an India student tool shows a course affiliate CTA. Same component, different config, per country.

### 11.3 `Lead` = hardened `Inquiry`

Extend `Inquiry` (do not rename the collection, avoid a migration) with:
```js
sourceCountry: String,
sourcePage: String,
serviceInterest: String,
budgetRange: String,
leadScore: Number,
spamScore: Number,
assignedOwner: String,
```

### 11.4 Digital Product Delivery Flow (₹199 Resume/Salary Pack — first product)

Razorpay is installed (`RAZORPAY_KEY_ID/SECRET`, `RAZORPAY_WEBHOOK_SECRET`) but has **no order/payment API route yet** — this must be built, not just "reused." Flow for the first micro-product (a ₹199 Resume + Salary-Pack PDF bundle):

```text
1. User clicks "Buy for ₹199" on a tool/guide page
        ↓
2. POST /api/products/checkout → creates a Razorpay order, returns order id
        ↓
3. Razorpay Checkout modal collects payment (client-side, standard integration)
        ↓
4. Razorpay redirects/webhooks to POST /api/products/verify
        ↓
5. Server verifies the payment signature (HMAC against RAZORPAY_WEBHOOK_SECRET) — reject if invalid
        ↓
6. On verified success:
     a. Order.create({ product, amount, email, razorpayPaymentId, status: 'paid' })
     b. Instant client-side download button unlocked (signed, short-lived URL to the asset in Vercel Blob)
     c. Automated email dispatched via existing nodemailer setup (lib/emailService.js, already used for contact-form notifications)
        with the secure download link, sent to the buyer's email — no manual fulfillment step
        ↓
7. Failure/pending states are logged, never silently dropped (mirrors the AutomationJob status model in §8.3)
```

New model: `Order` (or extend `Inquiry`'s sibling pattern) —
```js
// lib/models/Order.js
{
  product: String,               // 'resume-salary-pack'
  amount: Number,
  currency: String,
  email: String,
  country: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: 'created' | 'paid' | 'failed' | 'refunded',
  downloadToken: String,          // short-lived, single/limited-use signed token
  deliveredAt: Date,
}
```

This is the first concrete revenue mechanism to ship (§14 Phase 7) because, unlike ads/organic-traffic channels, it requires **zero minimum traffic** to start generating ₹.

### 11.5 Career Traffic Monetization Bridge (immediate, no new traffic required)

Live audit of the last 7 days of production traffic shows **60%+ of non-homepage pageviews are on `/careers/*`** (MERN/Next.js, DevOps, Cyber Security job listings) — an audience that is already visiting the site but is currently shown zero cross-sell into the tools/product ecosystem being built in this plan.

Action: add a **cross-promotional placement on `/careers` and every `/careers/[id]` job-detail page**, linking directly to:
1. The upcoming **ATS Resume Checker** tool (§6.3) — highly relevant to anyone reading a job listing.
2. The **₹199 Resume/Salary Pack** digital product (§11.4) — direct monetization of an already-warm, career-intent visitor.

This requires no new SEO ranking, no new traffic acquisition, and no automation — just a component (`components/pages/careers/CrossPromoBanner.jsx`) added to an existing, already-trafficked page. It should ship alongside Phase 3 (Tools Engine) and Phase 7 (Monetization) rather than waiting for organic tool traffic to materialize, since the audience already exists today.

---

## 12. Analytics Redesign

**Revised after live production/Vercel audit:** `@vercel/analytics` (`^2.0.1`) is already installed and rendering (`<Analytics />` in `app/layout.js`, confirmed alongside the custom `AnalyticsTracker`). This changes the analytics strategy from "extend custom tracker" to "split by data type, protect the free-tier DB."

### 12.1 Split of responsibility

| Data | System of record | Why |
|---|---|---|
| Raw web traffic (pageviews, unique visitors, referrers, bounce rate, country, device, top pages) | **Vercel Analytics** (already active, zero extra cost on the current plan) | Purpose-built, no DB writes, no query cost, already verified working in production |
| Real leads (`Inquiry`, spam-filtered) | **MongoDB** | Business record — must be queryable, ownable, exportable |
| Digital product orders/transactions (Razorpay) | **MongoDB** | Business record — receipts, delivery status, refunds |
| Tool conversion completions (`tool_completed`) — optional, high-value only | **MongoDB** | Needed for RPM/conversion-rate KPIs Vercel Analytics can't compute (e.g. "% of tool opens that finish a calculation") |

### 12.2 Deprecate custom pageview tracking

`components/effects/AnalyticsTracker.jsx` → `POST /api/analytics/track` (which writes every single pageview to the `Analytics` Mongo collection) is **deprecated and removed** as part of this restructuring. Reason: on **MongoDB Atlas Free Tier (M0)**, every pageview is a write against a 512MB storage cap and a shared, low connection-limit cluster — raw traffic volume (which will grow with the tools/content push in §6–§7) is exactly the wrong workload to put on M0. Vercel Analytics already gives the same pageview/referrer/device/country numbers with no DB cost at all.

- Remove `<AnalyticsTracker />` from `app/layout.js`.
- Remove/retire `POST /api/analytics/track` and the generic `Analytics` model's pageview-writing path.
- Keep the `Analytics` collection **only** for the three high-value event types above (`lead_submitted` mirrors the `Inquiry` write, `product_purchased` mirrors the Razorpay order, `tool_completed` is the one client-emitted event kept — see §12.3).

### 12.3 What MongoDB is allowed to receive going forward

```js
// Only these write paths remain on MongoDB after this change:
Inquiry.create(...)               // spam-filtered leads (§11.1)
Order.create(...)                 // Razorpay transactions (§11.4)
Analytics.create({ eventType: 'tool_completed', toolSlug, country }) // optional, rate-limited, no per-keystroke writes
```

No per-pageview, per-click, or per-render write reaches MongoDB. This directly protects the M0 free tier's connection-limit and storage-exhaustion risk called out in this audit.

### 12.4 Admin dashboard

The `/admin` Dashboard (existing page, extended) shows **business health KPIs only** — Leads and Sales — computed from lightweight MongoDB queries against `Inquiry`/`Order`, never from a heavy raw-traffic table:

- Primary: Qualified leads (post spam-filter), Digital product sales/revenue, Software-lead conversions, Tool completions.
- Traffic-shaped numbers (page views, country split, top pages, referrers) are surfaced by **linking out to / embedding the Vercel Analytics dashboard**, not by re-querying Mongo.

This matches `maurya-tech-plan.md` §32's warning against a dashboard that focuses on raw volume — the admin now literally cannot query a heavy traffic table because one no longer exists.

---

## 13. Security Hardening (additive to existing, already-solid foundation)

Already in place and kept as-is: JWT admin auth, CSRF/origin checks in `middleware.js`, rate limiting, security headers/CSP, input length-capping on `Inquiry`.

New for this restructuring:
- Honeypot + Turnstile on all public forms (`/api/contact`, future tool-feedback forms).
- Basic RBAC: extend `User` model with a `role` enum (`super_admin`, `content_manager`, `seo_manager`, `sales`) — needed once more than one person touches `/admin`. Not urgent for a single-operator launch, but the schema field should be added now to avoid a later migration.
- Audit log collection for admin mutations on `Content`/`Tool`/`AutomationRule` (who changed what, when) — cheap to add now, valuable once automation starts writing content.
- `AI_PROVIDER` credentials (if a free-tier key is ever added) go in `.env.local` only, never client-exposed — consistent with existing `.env.local` pattern (Mongo URI, Razorpay keys, JWT secret already handled this way).

---

## 14. Migration Phases (incremental, non-destructive)

Each phase ships independently; the site stays live and functional throughout.

### Phase 0 — Done (this audit)
Current architecture, gaps, and risk list captured in §1 above.

### Phase 1 — Foundation (no visible user-facing change)
- `Country` model + seed `IN/US/UK` (+ disabled Tier-2/3 rows).
- `MarketProfile` resolver + middleware country-detection extension.
- `Post` schema additive fields (`country`, `language`, `status`, `scope`, `version`, `sources`) — defaults preserve current behavior.
- `AutomationRule` + `AutomationJob` models (empty/inert until Phase 4).
- Remove `<AnalyticsTracker />` and `POST /api/analytics/track`'s pageview-writing path; confirm `@vercel/analytics` is the sole raw-traffic system of record (§12).

### Phase 2 — Lead Integrity Fix (ship first — highest ROI, lowest effort)
- Honeypot + spam-score on `/api/contact` and `Inquiry`.
- "Likely Spam" badge in `/admin/inquiries`.

### Phase 3 — Tools Engine
- `Tool` model + reusable calculator UI kit (`components/tools/*`), 100% client-side execution (§6.4), `global-authority` light theme (§6.5).
- Ship 4–5 tools first (Salary/CTC, Percentage, Age, EMI (IN), ATS checker) across `in/us/uk`, SEO-tagged against the long-tail keyword seed list (§7.2) — not generic head terms.
- `/[country]/tools/[toolSlug]` routes live.
- `/careers` cross-promo banner (§11.5) linking to the ATS Resume Checker — ships as soon as that tool exists, independent of organic tool traffic.

### Phase 4 — Content Engine + Manual Content Studio
- Draft/review/published workflow in Blog CMS.
- Content Studio "Write manually" path shipped **before** any AI path — proves the manual fallback works standalone.
- Quality Gate function wired into the publish action.

### Phase 5 — SEO Engine
- Per-country sitemap segmentation, hreflang, structured data on `Tool`/`Content` pages.

### Phase 6 — Automation (Assisted mode only, at first)
- `AI_PROVIDER=none` default; enable `groq` or `gemini` free tier behind an explicit `AutomationRule` toggle, scoped to one country/category at a time.
- Claude Code scheduled agent (or Vercel Cron) wired to the same Content Studio API — output always lands in `review`.

### Phase 7 — Monetization
- `Order` model + `/api/products/checkout` + `/api/products/verify` — Razorpay digital product (₹199 Resume/Salary Pack) live end-to-end, including automated `nodemailer` delivery email (§11.4).
- Affiliate CTA config per `MarketProfile`.
- Career-traffic cross-promo (§11.5) live on `/careers` if not already shipped in Phase 3.
- AdSense/Ezoic application once organic traffic is meaningful (tracked via §12 KPIs / Vercel Analytics).

### Phase 8 — Analytics & Optimization loop
- `tool_completed` event wiring (§12.3), admin KPI dashboard extension pulling from `Inquiry`/`Order` only (§12.4), orphan-page + content-update-queue reports.

---

## 15. Explicit Non-Goals (for this restructuring pass)

- No rewrite of the existing agency pages (`/careers`, `/services`, `/projects`, `/products`) — they work, they generate real (non-spam) applications, leave them alone beyond bug fixes.
- No multi-tenant/separate-codebase-per-country — explicitly forbidden per `maurya-tech-plan.md` §11.
- No 12-country rollout, no paid ad spend, no paid AI/SEO subscriptions — deferred until Phase 7+ KPIs justify the spend.
- No fully autonomous publishing at any phase in this plan — `auto_publish` mode is architecturally supported (§8.3) but is not turned on for any category during Phases 1–8.

---

## 16. Success Metrics (adapted from `maurya-tech-plan.md` §32, scoped to launch)

Primary, tracked from Phase 1 onward via the extended `Analytics` model:

```text
Organic users (IN / US / UK split)
Tool usage (opens, completions)
Qualified leads (post spam-filter)
Digital product sales (Razorpay)
Affiliate clicks/conversions
Automation job success rate (queued → completed, not stuck in needs_review)
```

The real success signal is **not** page count or country count — it is qualified traffic in India/US/UK that a human can convert into product sales, affiliate revenue, or a software-development lead, while automation quietly does the repetitive research/draft/localize work in the background and a human retains a working manual path for every single step.
