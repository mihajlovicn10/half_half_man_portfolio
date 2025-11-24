## Website Enhancements – Half Half Man Portfolio

---

## 1. Functional Enhancements by Area

### 1.1 Home / Hero Section
- [ ] **Hero performance & structure**
  - [x] Use a poster image and lazy-load the hero video to improve LCP.
  - [ ] Keep the hero loop short and optimized (bitrate, resolution).
  - [ ] Add dual primary CTAs (npr. “I need a website” / “I need a security review”) that lead into different flows. _(Currently covered by hero slider CTAs – revisit only if needed.)_
- [ ] **Storytelling blocks** _(Deferred – content to be done with PR assistant later.)_
  - [ ] Turn the “About” area into a micro-timeline (Swimmer → Developer → Security → Freelance business).
  - [ ] Add a “How I work” section with 3–4 explicit steps (Discovery → Architecture → Build → Secure & Optimize).
- [ ] **Services clarity** _(Deferred – content & positioning to be refined with PR/content assistant.)_
  - [ ] For each service, add:
    - [ ] 1-line “Outcome” (e.g. “Result: faster site, better Core Web Vitals, fewer security risks”).
    - [ ] 1–2 badges (e.g. “SaaS”, “E‑learning”, “Marketing site”, “Security audit”).

### 1.2 Navigation & Layout
- [ ] **Secondary navigation** _(Not needed for current Tech Stack setup – already covered by slider + back links; revisit only if UX testing shows confusion.)_
  - [ ] Add light-weight sub-nav / breadcrumbs on:
    - [ ] `Projects` / `ProjectDetail`
    - [ ] `Blog` / `BlogPost`
    - [ ] `TechStack` / `TechStackDetail`
  - [ ] Include quick links (All projects, Security projects, Courses, etc.).
- [x] **Stateful back navigation**
  - [x] When returning from `ProjectDetail` to `Projects`, restore:
    - [x] scroll position
    - [x] which project card was expanded.

### 1.3 Projects (List & Detail) _(Current setup sufficient for portfolio showcase – revisit only if number of projects grows or UX data shows need for more structure.)_
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
  - [ ] Link from relevant blog posts to related projects and back.

### 1.4 Blog
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

### 1.5 Tech Stack
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

### 1.6 Contact & Calendly
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
- [ ] **Calendly UX**
  - [ ] Show a short bullet list above the widget:
    - [ ] what happens on the call
    - [ ] who it is for / not for.

### 1.7 Chatbot / Virtual Assistant
- [ ] **Intent-based flows (current)**
  - [ ] Keep flows like About / Services / Blog / Projects / Contact, ali:
    - [ ] proširi ih konkretnim linkovima na blog / projekte / sekcije na Home strani.
- [ ] **Persona-based entry**
  - [ ] Add first-step selection: “I am a…”
    - [ ] Founder / Business owner
    - [ ] Developer / Technical
    - [ ] Student / Learner
  - [ ] For svaku personu koristi drugačiji tekst i različite preporuke (links, projekti, kursevi).
- [ ] **Session memory (frontend only)**
  - [ ] Store recent intent in `localStorage` so that:
    - [ ] on next visit, chatbot startuje uz personalizovanu poruku (e.g. “Do you want to continue about Security services?”).
- [ ] **Accessibility & usability**
  - [ ] Full keyboard support (Tab, Enter, Esc).
  - [ ] Clear ARIA roles for dialog, buttons, and messages.
  - [ ] Option to minimize/chat in smaller docked mode on desktop.

---

## 2. UI / UX & Visual Modernization

### 2.1 Theming & Layout
- [ ] **Dark mode support**
  - [ ] Add theme toggle (light/dark) aligned with brand (code + water).
  - [ ] Respect system preference by default; persist choice in `localStorage`.
- [ ] **Consistent spacing & typography**
  - [ ] Define a spacing scale (e.g. 4/8/12/16/24/32 px) and apply it across sections.
  - [ ] Clarify heading hierarchy:
    - [ ] single `h1` per page
    - [ ] neat `h2`/`h3` structure inside sections.

### 2.2 Micro-interactions
- [ ] **Smooth but subtle motion**
  - [ ] Use micro-animations instead of heavy motion:
    - [ ] hover/focus rings,
    - [ ] small parallax on hero/section backgrounds,
    - [ ] spring transitions on primary CTAs.
- [ ] **Component-level polish**
  - [ ] Buttons:
    - [ ] clearer focus styles,
    - [ ] loading states where needed.
  - [ ] Cards:
    - [ ] consistent hover elevation and scale,
    - [ ] better use of icons and labels.

### 2.3 Loading & Error Experience
- [ ] **Skeletons & loading states**
  - [ ] Show skeletons on:
    - [ ] blog list
    - [ ] blog detail
    - [ ] projects list & detail
    - [ ] Calendly embedding errors.
- [ ] **Empty & error states**
  - [ ] Friendly, branded empty/error screens (e.g. when Sanity is down or there are no posts yet), with suggested next actions.

### 2.4 Accessibility
- [ ] **Keyboard navigation**
  - [ ] Ensure all interactive components (navbar dropdown, FAQ/Privacy accordions, chatbot, modals) are keyboard accessible.
- [ ] **ARIA & semantics**
  - [ ] Verify all menus, buttons, dialogs, and accordions use:
    - [ ] correct roles
    - [ ] `aria-expanded`, `aria-controls`, `aria-labelledby` etc.
- [ ] **Color contrast**
  - [ ] Audit colors against WCAG AA, adjust if needed (especially light text on gradients).

---

## 3. Performance & Core Web Vitals

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
- [ ] **Sanity data fetching**
  - [ ] Use Sanity image transformation params for thumbnails and cover images.
  - [ ] Introduce simple caching / memoization on client where repeated queries happen.

---

## 4. SEO Enhancements

- [ ] **Structured data**
  - [ ] Add JSON-LD for:
    - [ ] `Organization` / `Person` on Home.
    - [ ] `Service` for key offerings (Web dev, Security, Courses).
    - [ ] `Project` schema for portfolio items.
    - [ ] `BreadcrumbList` on hierarchical pages (Projects, Blog, Tech Stack).
- [ ] **Per-page OG & Twitter Cards**
  - [ ] Ensure every page has:
    - [ ] unique `og:title`, `og:description`, `og:image`, `og:url`.
  - [ ] For Projects and Blog posts:
    - [ ] generate or at least manually create dedicated OG images.
- [ ] **Internal linking strategy**
  - [ ] Inside blog posts:
    - [ ] link to Projects, Services, Tech Stack and relevant FAQs.
  - [ ] On Projects:
    - [ ] link back to blog posts explaining decisions/tech behind them.

---

## 5. Security & Privacy

### 5.1 Frontend Security (Current Stack)
- [ ] **CSP hardening**
  - [ ] Gradually remove `unsafe-inline` and `unsafe-eval` by:
    - [ ] moving inline scripts into separate files,
    - [ ] using nonces or hashes where needed.
- [ ] **Sanitization**
  - [ ] Continue using DOMPurify for all user-provided input and any rich content rendered from CMS where necessary.

### 5.2 Sanity & Data Access
- [ ] **Sanity token handling**
  - [ ] Remove any private Sanity tokens from client-side code.
  - [ ] For public blog content:
    - [ ] either use a public read-only dataset with no token, or
    - [ ] proxy Sanity queries through a backend/serverless layer.

### 5.3 Forms & Abuse Prevention
- [ ] **Contact form protections**
  - [ ] Keep rate limiting and validation.
  - [ ] Add:
    - [ ] hidden honeypot field
    - [ ] simple behavior-based checks (time on page, minimum time before submit).
  - [ ] Later (with backend): server-side verification and logging.

### 5.4 Cookies & Consent
- [ ] **Consent management**
  - [ ] Because of GA4 and AdSense:
    - [ ] add cookie banner with categories (necessary / analytics / ads).
    - [ ] wire GA and AdSense initialization to user consent preferences.

---

## 6. Analytics & Experimentation

- [ ] **Analytics model**
  - [ ] Define consistent events, e.g.:
    - [ ] `view_section` (with section name)
    - [ ] `click_cta` (page, label)
    - [ ] `open_chatbot`, `start_contact_flow`
    - [ ] `project_detail_view`, `blog_post_view`.
- [ ] **A/B testing ideas**
  - [ ] Hero messaging:
    - [ ] security-first vs. development-first positioning.
  - [ ] CTA copy:
    - [ ] “Book a call” vs. “Start a project”.
  - [ ] Layout variants:
    - [ ] different order of Home sections (Services vs. Story vs. Testimonials).

---

## 7. Future Backend & Commerce Preparation

Ovaj deo je fokusiran na to da sajt bude spreman za backend: prodaja kurseva, premium content, napredan chat, SMS obaveštenja, itd.

### 7.1 Account & Auth Layer
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

### 7.2 Courses & Content Sales
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

### 7.3 Backend API Design (high level)
- [ ] **Public endpoints (read-only)**
  - [ ] `GET /courses` – list kurseva.
  - [ ] `GET /courses/:id` – detalji + info da li je lekcija free/locked.
  - [ ] `GET /lessons/:id` – sadržaj lekcije (uz auth/authorization).
- [ ] **Authenticated endpoints**
  - [ ] `POST /checkout/session` – kreiranje payment session-a.
  - [ ] `GET /me/courses` – lista kurseva koje korisnik poseduje.
  - [ ] `GET /me/progress` – progres po kursu (za kasnije).

### 7.4 Chat / NLP & SMS Notifications

#### 7.4.1 NLP Chat (future-ready)
- [ ] **Architecture**
  - [ ] Frontend ostaje kao “orchestrator”:
    - [ ] korisnički interfejs, intents, prikaz poruka.
  - [ ] Backend:
    - [ ] API endpoint koji prima poruke i vraća odgovore,
    - [ ] integracija sa LLM/NLP servisom (npr. OpenAI, lokalni model, ili custom pipeline).
- [ ] **Context & personalization**
  - [ ] Koristiti:
    - [ ] informacije sa sajta (services, projects, blog),
    - [ ] možda i Sanity content,
    - [ ] user state (da li je kupac / koji kurs ima).
  - [ ] Omogućiti:
    - [ ] “Ask about my project” / “Ask about this course module” upite.

#### 7.4.2 SMS / Notifications Flow
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

#### 7.4.3 Gradual rollout
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

---

## 8. Prioritization (To Decide Later)

Kada budeš birao prve zadatke, praktičan redosled može biti:
1. **UI/UX & performance** za ključne stranice (Home, Projects, Contact).  
2. **Security & SEO hardening** (CSP, canonical consistency, OG za sve).  
3. **Chatbot & contact experience** (bolji tok, možda SMS notifikacije preko backenda).  
4. **Backend-ready struktura** za kurseve (modeli, rute, payment flow).  

Ali krajnji prioriteti ostaju na tebi – ovaj fajl je samo backlog.


