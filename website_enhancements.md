## Website Enhancements – Half Half Man Portfolio

---

## 0. Triage (ALL tasks, reordered for Notion transfer)

Legend:
- **P0**: Correctness / risk / security issues (do first)
- **P1**: High-ROI UX + accessibility (next)
- **P2**: Performance + SEO growth (after P0/P1)
- **P3**: Bigger features + content-heavy improvements
- **P4**: Backend & commerce implementation (future)

---

## P0 — Correctness / Risk / Security

### SEO correctness
- [ ] **Fix OG/Twitter image URL correctness**
  - [ ] Fix `og:image` / `twitter:image` to point to real public URLs (avoid `/public/...` in production URLs).
  - [ ] Validate with “View Source” + social debuggers after deploy (Facebook/LinkedIn/Twitter).

### Security headers + sanitization
- [ ] **Helmet meta correctness**
  - [ ] Ensure Helmet uses `httpEquiv` (not `http-equiv`) so security meta tags actually render as intended.
- [ ] **CSP hardening**
  - [ ] Gradually remove `unsafe-inline` and `unsafe-eval` by:
    - [ ] moving inline scripts into separate files,
    - [ ] using nonces or hashes where needed.
- [ ] **Sanitization**
  - [ ] Continue using DOMPurify for all user-provided input and any rich content rendered from CMS where necessary.

### App resilience (frontend-only)
- [ ] **Error handling & routing**
  - [ ] Add a React **Error Boundary** with a friendly fallback UI + “Reload” button.
  - [ ] Add a proper **404 / Not Found** route with clear navigation back to key pages.

### Layout consistency (global)
- [ ] **Root + page layout**
  - [ ] Remove/avoid global `#root` max-width + “center everything” defaults (move spacing to page containers instead).
  - [ ] Standardize a container pattern across pages/sections (e.g. `container + responsive padding`) so alignment is consistent.

---

## P1 — UX + Accessibility (high ROI, still frontend-only)

### Navigation & layout UX
- [ ] **Primary navigation clarity**
  - [ ] Add persistent **active state** styles for current route (not just hover).
  - [ ] On Home (`/`), highlight active section when user scrolls (About/Services, etc.).
  - [ ] Add a **“Skip to content”** link for keyboard users.
- [ ] **Secondary navigation**
  - [ ] Add light-weight sub-nav / breadcrumbs on:
    - [ ] `Projects` / `ProjectDetail`
    - [ ] `Blog` / `BlogPost`
    - [ ] `TechStack` / `TechStackDetail`
  - [ ] Include quick links (All projects, Security projects, Courses, etc.).
- [x] **Stateful back navigation**
  - [x] When returning from `ProjectDetail` to `Projects`, restore:
    - [x] scroll position
    - [x] which project card was expanded.

### Loading & error experience
- [ ] **Loader behavior**
  - [ ] Replace the fixed 5s first-visit loader with a shorter, content-aware loader (and/or add “Skip”).
- [ ] **Skeletons & loading states**
  - [ ] Show skeletons on:
    - [ ] blog list
    - [ ] blog detail
    - [ ] projects list & detail
    - [ ] Calendly embedding errors.
- [ ] **Empty & error states**
  - [ ] Friendly, branded empty/error screens (e.g. when Sanity is down or there are no posts yet), with suggested next actions.

### Accessibility (site-wide)
- [ ] **Keyboard navigation**
  - [ ] Ensure all interactive components (navbar dropdown, FAQ/Privacy accordions, chatbot, modals) are keyboard accessible.
- [ ] **Clickable cards**
  - [ ] Ensure clickable cards are fully keyboard operable (Enter/Space) and have clear focus styles.
- [ ] **Modal improvements**
  - [ ] close on `Esc`, focus trap, restore focus on close.
- [ ] **Focus visibility**
  - [ ] Standardize `:focus-visible` styles across the site (links/buttons/cards) so keyboard users always see where they are.
- [ ] **Reduced motion**
  - [ ] Respect `prefers-reduced-motion` by disabling/reducing non-essential animations (loader, chatbot, page transitions).
- [ ] **ARIA & semantics**
  - [ ] Verify all menus, buttons, dialogs, and accordions use:
    - [ ] correct roles
    - [ ] `aria-expanded`, `aria-controls`, `aria-labelledby` etc.
- [ ] **Color contrast**
  - [ ] Audit colors against WCAG AA, adjust if needed (especially light text on gradients).

### Blog UX (readability)
- [ ] **Typography + layout for articles**
  - [ ] Constrain article width for readability (prose-like styles, better spacing).
  - [ ] Ensure heading hierarchy is consistent (one `h1`, clean `h2/h3` structure).

### Contact UX (conversion)
- [ ] **Validation & success flow**
  - [ ] Add real-time validation with clear inline errors and a proper success state.
  - [ ] After successful submit: show “next steps” (Calendly / email / FAQ link) instead of leaving the user at a dead-end.
- [ ] **Calendly UX**
  - [ ] Show a short bullet list above the widget:
    - [ ] what happens on the call
    - [ ] who it is for / not for.

### Chatbot UX
- [ ] **Non-intrusive behavior**
  - [ ] If user closes chatbot, remember “dismissed” for a while and don’t re-prompt aggressively.
  - [ ] Make the floating button smaller on mobile and ensure it doesn’t block important UI.
- [ ] **Accessibility & usability**
  - [ ] Full keyboard support (Tab, Enter, Esc).
  - [ ] Clear ARIA roles for dialog, buttons, and messages.
  - [ ] Option to minimize/chat in smaller docked mode on desktop.

---

## P2 — Performance + SEO Growth

### Performance / Core Web Vitals
- [ ] **Asset optimization**
  - [ ] Optimize hero video (short loop, modern codec, multiple resolutions).
  - [ ] Ensure all non-critical images:
    - [ ] use `loading="lazy"` and `decoding="async"`,
    - [ ] have properly sized versions.
- [ ] **Code-splitting**
  - [ ] Split large routes using dynamic imports / `React.lazy`:
    - [ ] `Blog`, `BlogPost`
    - [ ] `Projects`, `ProjectDetail`
    - [ ] `Chatbot` (optional lazy mount after initial load).
- [ ] **Defer non-critical scripts**
  - [ ] Consider deferring non-critical widgets/scripts (chatbot, analytics) until after initial render where possible.
- [ ] **Sanity data fetching**
  - [ ] Use Sanity image transformation params for thumbnails and cover images.
  - [ ] Introduce simple caching / memoization on client where repeated queries happen.

### SEO enhancements
- [ ] **Per-page OG & Twitter Cards**
  - [ ] Ensure every page has:
    - [ ] unique `og:title`, `og:description`, `og:image`, `og:url`.
  - [ ] For Projects and Blog posts:
    - [ ] generate or at least manually create dedicated OG images.
- [ ] **Structured data**
  - [ ] Add JSON-LD for:
    - [ ] `Organization` / `Person` on Home.
    - [ ] `Service` for key offerings (Web dev, Security, Courses).
    - [ ] `Project` schema for portfolio items.
    - [ ] `BreadcrumbList` on hierarchical pages (Projects, Blog, Tech Stack).
- [ ] **Internal linking strategy**
  - [ ] Inside blog posts:
    - [ ] link to Projects, Services, Tech Stack and relevant FAQs.
  - [ ] On Projects:
    - [ ] link back to blog posts explaining decisions/tech behind them.

### Security & privacy (frontend-only)
- [ ] **Contact form protections**
  - [ ] Keep rate limiting and validation.
  - [ ] Add:
    - [ ] hidden honeypot field
    - [ ] simple behavior-based checks (time on page, minimum time before submit).
  - [ ] Later (with backend): server-side verification and logging.
- [ ] **Consent management**
  - [ ] Because of GA4 and AdSense:
    - [ ] add cookie banner with categories (necessary / analytics / ads).
    - [ ] wire GA and AdSense initialization to user consent preferences.

### UI / visual modernization
- [ ] **Dark mode support**
  - [ ] Add theme toggle (light/dark) aligned with brand (code + water).
  - [ ] Respect system preference by default; persist choice in `localStorage`.
  - [ ] Ensure dark mode is actually wired end-to-end (some components already use `dark:*` classes).
- [ ] **Micro-interactions**
  - [ ] Use micro-animations instead of heavy motion:
    - [ ] hover/focus rings,
    - [ ] small parallax on hero/section backgrounds,
    - [ ] spring transitions on primary CTAs.
  - [ ] Define “motion tokens” (duration/easing) and reuse them for consistency across components/pages.
- [ ] **Component-level polish**
  - [ ] Buttons:
    - [ ] clearer focus styles,
    - [ ] loading states where needed.
  - [ ] Cards:
    - [ ] consistent hover elevation and scale,
    - [ ] better use of icons and labels.

### Analytics & experimentation
- [ ] **Analytics model**
  - [ ] Define consistent events, e.g.:
    - [ ] `view_section` (with section name)
    - [ ] `click_cta` (page, label)
    - [ ] `open_chatbot`, `start_contact_flow`
    - [ ] `project_detail_view`, `blog_post_view`.

---

## P3 — Bigger features / content-heavy improvements

### Home / brand content
- [ ] **Hero CTAs**
  - [ ] Add dual primary CTAs (npr. “I need a website” / “I need a security review”) that lead into different flows. _(Currently covered by hero slider CTAs – revisit only if needed.)_
- [ ] **Storytelling blocks** _(Deferred – content to be done with PR assistant later.)_
  - [ ] Turn the “About” area into a micro-timeline (Swimmer → Developer → Security → Freelance business).
  - [ ] Add a “How I work” section with 3–4 explicit steps (Discovery → Architecture → Build → Secure & Optimize).
- [ ] **Services clarity** _(Deferred – content & positioning to be refined with PR/content assistant.)_
  - [ ] For each service, add:
    - [ ] 1-line “Outcome” (e.g. “Result: faster site, better Core Web Vitals, fewer security risks”).
    - [ ] 1–2 badges (e.g. “SaaS”, “E‑learning”, “Marketing site”, “Security audit”).

### Projects (list & detail)
- [ ] **Filtering & search**
  - [ ] Add filters by:
    - [ ] technology (React, Django, Webflow, etc.)
    - [ ] project type (SaaS, Edu, Security tool, Marketing site).
  - [ ] Add simple text search over title/summary.
- [ ] **Case study structure**
  - [ ] Standardize all project details into:
    - [ ] Context (client/problem)
    - [ ] Goals
    - [ ] Constraints (time, budget, legacy stack)
    - [ ] Approach (architecture, tools, process)
    - [ ] Results (metrics or qualitative outcomes)
    - [ ] Stack (grouped by Frontend / Backend / Security / Ops).
  - [ ] Where possible, add approximate metrics (e.g. “~40% faster load”, “0 critical vulns post-audit”).
- [ ] **Cross-linking**
  - [ ] Add “Related projects” at the bottom (by stack or domain).

### Blog
- [ ] **Taxonomy**
  - [ ] In Sanity, introduce categories/tags like:
    - [ ] `Security`, `React`, `Architecture`, `Freelancing`, `Performance`.
  - [ ] On the frontend, add:
    - [ ] tag filters
    - [ ] possibly a “Topics” sidebar.
- [ ] **Reading experience**
  - [ ] Add:
    - [ ] estimated reading time
    - [ ] reading progress indicator (scroll progress bar)
    - [ ] table of contents for long posts (generated from headings).
  - [ ] Increase base line-height and spacing inside `PortableText` blocks for readability.
- [ ] **Content CTAs**
  - [ ] Under each post:
    - [ ] CTA for consultation (e.g. “Book a 30 min call about this topic”).
    - [ ] CTA for upcoming courses (newsletter or waitlist).

### Tech Stack
- [ ] **System map view**
  - [ ] Present a visual “systems map”:
    - [ ] Frontend (React, Webflow, Tailwind)
    - [ ] Backend (Django, Node, Xano)
    - [ ] Security (tooling, processes)
    - [ ] Ops (deployment, monitoring).
  - [ ] Show how they connect (arrows, small diagram).
- [ ] **Use-case orientation**
  - [ ] For each stack category add a “Best for:” line:
    - [ ] MVP launch
    - [ ] educational platform
    - [ ] internal tools
    - [ ] security automation, etc.
  - [ ] Link directly from Tech Stack items to:
    - [ ] example projects
    - [ ] relevant blog posts.

### Contact
- [ ] **Multi-step contact form**
  - [ ] Split into steps:
    1. [ ] Who you are & what you need.
    2. [ ] Budget range, timeline.
    3. [ ] Extra details / free-text.
  - [ ] Add guided text for better answers (“Write 2–3 sentences about your current situation…”).
- [ ] **Predefined options**
  - [ ] Use radios/selects for:
    - [ ] project type (New website / Redesign / Security review / Course or mentoring)
    - [ ] budget ranges
    - [ ] desired timeline.

### Chatbot UI (current rule-based assistant)
- [ ] **Polish the existing scripted chatbot (optional)**
  - [ ] Add more direct deep-links to relevant Blog/Projects/sections on Home.
  - [ ] Add lightweight session memory in `localStorage` (resume last topic, don’t be intrusive).
  - [ ] Improve accessibility (keyboard support, roles, focus, minimize/dock).

### Experimentation
- [ ] **A/B testing ideas**
  - [ ] Hero messaging:
    - [ ] security-first vs. development-first positioning.
  - [ ] CTA copy:
    - [ ] “Book a call” vs. “Start a project”.
  - [ ] Layout variants:
    - [ ] different order of Home sections (Services vs. Story vs. Testimonials).

---

## P4 — Backend & Commerce Preparation / Implementation (future)

Ovaj deo je fokusiran na to da sajt bude spreman za backend: prodaja kurseva, premium content, napredan chat, SMS obaveštenja, itd.

### Account & Auth layer
- [ ] **User accounts**
  - [ ] Planirati korisničke naloge za:
    - [ ] kupce kurseva
    - [ ] možda i B2B klijente (security konsultacije, retainer modeli).
  - [ ] Podržati:
    - [ ] e-mail + password sign-up, plus
    - [ ] društvene prijave (Google / GitHub) ako odgovara.
- [ ] **Role & permissions**
  - [ ] Osnovne role:
    - [ ] `admin` / `owner`
    - [ ] `customer`
    - [ ] eventualno `beta_tester` / `partner` (za kasnije).

### Courses & content sales
- [ ] **Content model**
  - [ ] Definisati strukturu:
    - [ ] Course → Modules → Lessons
    - [ ] Tip lekcija (video, tekst, zadaci, quiz)
    - [ ] Pristup (free sample vs. paid).
  - [ ] Odlučiti da li kursevi idu:
    - [ ] kroz Sanity (kao CMS),
    - [ ] ili kroz poseban backend (Django/Node) sa svojom bazom.
- [ ] **Payments & access control**
  - [ ] Planirati integraciju sa:
    - [ ] Stripe / Paddle (ili drugi PSP),
    - [ ] mogućnost kupona / promocija.
  - [ ] Backendu prepustiti:
    - [ ] evidenciju kupovina,
    - [ ] izdavanje “entitlement-a” (koji korisnik ima koji kurs),
    - [ ] API kojim frontend proverava pristup.

### Backend API design (high level)
- [ ] **Public endpoints (read-only)**
  - [ ] `GET /courses` – list kurseva.
  - [ ] `GET /courses/:id` – detalji + info da li je lekcija free/locked.
  - [ ] `GET /lessons/:id` – sadržaj lekcije (uz auth/authorization).
- [ ] **Authenticated endpoints**
  - [ ] `POST /checkout/session` – kreiranje payment session-a.
  - [ ] `GET /me/courses` – lista kurseva koje korisnik poseduje.
  - [ ] `GET /me/progress` – progres po kursu (za kasnije).

### Chat / NLP & SMS notifications
#### NLP Chatbot (natural language assistant)
- [ ] **Product scope**
  - [ ] Users can ask free-form questions (services, projects, blog topics, pricing/budget ranges, timelines).
  - [ ] Assistant can route to: answer + relevant links, “book a call”, or “contact me”.
- [ ] **Backend-first architecture (no secrets in frontend)**
  - [ ] Create a backend chat endpoint (frontend sends messages; backend calls LLM/NLP provider).
  - [ ] Add streaming responses (optional) for better UX.
- [ ] **RAG (Retrieval-Augmented Generation) over your content**
  - [ ] Build an index over:
    - [ ] site pages (services, tech stack, projects)
    - [ ] Sanity blog posts (Portable Text)
  - [ ] Retrieve relevant chunks and return answers with **citations/links**.
  - [ ] Add content refresh strategy (on deploy / scheduled reindex / webhook from Sanity).
- [ ] **Safety & abuse protection**
  - [ ] Rate limit (per IP/session/user) + basic bot protection.
  - [ ] Prompt injection defense: tool allowlist, retrieval isolation, refusal behavior.
  - [ ] PII policy + redact sensitive data in logs.
- [ ] **Observability**
  - [ ] Store chat logs (with privacy controls) to debug and improve quality.
  - [ ] Track key events (open chatbot, question category, conversions).
- [ ] **Human escalation**
  - [ ] “Escalate to human” flow (contact form + optional SMS/email notification).
  - [ ] Auto-summarize conversation into a lead note for follow-up.

#### SMS / Notifications flow
- [ ] **Goals**
  - [ ] Dobiti SMS ili drugi realtime signal kada:
    - [ ] neko pošalje poruku u chatu,
    - [ ] neko popuni kontakt formu,
    - [ ] neko odradi određeni korak na kursu (npr. kupovina, završavanje modula).
- [ ] **Implementation outline**
  - [ ] Backend endpoint (npr. `POST /events`) prima event sa fronta (chat message, contact form submission, course-related event).
  - [ ] Backend:
    - [ ] upisuje event u bazu,
    - [ ] šalje SMS/email/Slack notifikaciju (npr. preko Twilio / Vonage / e-mail providera),
    - [ ] opcionalno kreira “thread” preko kog možeš nastaviti komunikaciju (email reply, SMS reply, itd.).
  - [ ] Frontend ostaje čist: samo šalje event i eventualno prikazuje “Your message has been received”.

#### Gradual rollout
- [ ] **Faza 1 – Notification only**
  - [ ] Chatbot ostaje script-based kao sada.
  - [ ] Dodaješ backend koji:
    - [ ] prima poruke iz kontakta/chata,
    - [ ] šalje SMS/mail tebi (one-way).
- [ ] **Faza 2 – Semi-manual chat**
  - [ ] Backend omogućava:
    - [ ] da ti odgovaraš preko SMS/WhatsApp/UI,
    - [ ] a odgovori se vraćaju korisniku na sajtu (simple chat API).
- [ ] **Faza 3 – Full NLP**
  - [ ] Dodaje se NLP sloj:
    - [ ] automatski odgovori na česta pitanja,
    - [ ] eskalacija na tebe (SMS/push) za kompleksnije upite.
