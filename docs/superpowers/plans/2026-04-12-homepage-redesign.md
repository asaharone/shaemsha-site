# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign homepage as a 3-card router (UGC, Production, Presets) with B&W backgrounds, update nav to new site architecture, delete deprecated pages, and create UGC page stub.

**Architecture:** Rewrite `index.astro` as a minimal CSS-only page with 3 full-bleed cards using `grayscale(1)` filter. Update Nav and Footer to reference only 3 pages. Delete 4 old pages. Create `/ugc/` stub.

**Tech Stack:** Astro 6.1, Tailwind CSS 4.2. No JS needed for homepage.

**Spec:** `docs/superpowers/specs/2026-04-12-homepage-redesign.md`

---

### Task 1: Update Nav component

Remove old links (Work, Collaborate, About, Contact, Book button). Add new 3-page structure.

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Rewrite `src/components/Nav.astro`**

Replace the entire file with:

```astro
---
const base = import.meta.env.BASE_URL;
const pathname = Astro.url.pathname;

const links = [
  { href: `${base}ugc/`, label: 'UGC · PR · Content' },
  { href: `${base}production/`, label: 'Production' },
  { href: `${base}presets/`, label: 'Presets' },
];
---

<!-- Top Bar -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="main-nav">
  <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    <a href={base} class="font-serif text-xl tracking-[0.2em] text-text uppercase font-semibold hover:text-accent transition-colors">
      SHAEMSHA
    </a>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-7">
      {links.map(link => (
        <a
          href={link.href}
          class={`text-sm tracking-wide uppercase transition-colors cursor-pointer ${
            pathname.startsWith(link.href) ? 'text-accent' : 'text-text-muted hover:text-text'
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Mobile Hamburger -->
    <button id="menu-toggle" class="md:hidden text-text cursor-pointer" aria-label="Open menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>

<!-- Mobile Fullscreen Menu -->
<div id="mobile-menu" class="fixed inset-0 bg-bg z-[9999] flex flex-col opacity-0 pointer-events-none transition-opacity duration-300 md:hidden">
  <div class="px-6 py-5 flex items-center justify-between flex-shrink-0">
    <a href={base} class="font-serif text-xl tracking-[0.2em] text-text uppercase font-semibold">
      SHAEMSHA
    </a>
    <button id="menu-close" class="text-text cursor-pointer" aria-label="Close menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div class="flex-1 flex flex-col justify-center px-10">
    <a href={base} class="font-serif text-3xl tracking-wide py-3 transition-colors text-text-muted hover:text-accent">Home</a>
    {links.map(link => (
      <a
        href={link.href}
        class={`font-serif text-3xl tracking-wide py-3 transition-colors ${
          pathname.startsWith(link.href) ? 'text-accent' : 'text-text-muted hover:text-accent'
        }`}
      >
        {link.label}
      </a>
    ))}
  </div>

  <div class="px-10 pb-10 flex-shrink-0">
    <div class="flex items-center gap-6 justify-center">
      <a href="https://instagram.com/shaemsha" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Instagram">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href="https://t.me/shaemsha" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Telegram">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      </a>
      <a href="https://vimeo.com/user73530306" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Vimeo">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>
      </a>
      <a href="mailto:hello@shaemsha.com" class="text-text-muted hover:text-accent transition-colors" aria-label="Email">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </a>
    </div>
  </div>
</div>

<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('main-nav');
    var toggle = document.getElementById('menu-toggle');
    var closeBtn = document.getElementById('menu-close');
    var menu = document.getElementById('mobile-menu');
    var icon = document.getElementById('menu-icon');

    function openMenu() {
      menu.classList.remove('opacity-0', 'pointer-events-none');
      menu.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.add('opacity-0', 'pointer-events-none');
      menu.classList.remove('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = '';
    }

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('bg-bg/90', 'backdrop-blur-md');
      } else {
        nav.classList.remove('bg-bg/90', 'backdrop-blur-md');
      }
    });

    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  });
</script>
```

Key changes from current Nav:
- Links array: 3 items (UGC · PR · Content, Production, Presets)
- Removed "Book" CTA button from desktop nav
- Removed Contact link from mobile menu
- Removed "Leave a Request" CTA from mobile menu bottom
- Added `aria-label` to all social icon links
- Added `rel="noopener noreferrer"` to external links
- Added `cursor-pointer` to buttons
- Active state uses `pathname.startsWith()` instead of exact match

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: update nav to 3-page architecture (UGC, Production, Presets)"
```

---

### Task 2: Update Footer component

Simplify footer — remove navigation links section, keep brand + social + copyright.

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Rewrite `src/components/Footer.astro`**

Replace entire file with:

```astro
---
const base = import.meta.env.BASE_URL;
const year = new Date().getFullYear();
---

<footer class="border-t border-border mt-24">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="flex flex-col items-center text-center gap-6">
      <!-- Brand -->
      <a href={base} class="font-serif text-lg tracking-[0.2em] text-text uppercase font-semibold">
        SHAEMSHA
      </a>
      <p class="text-text-muted text-sm leading-relaxed">
        Videographer · Photographer · Director — Cyprus
      </p>

      <!-- Social Links -->
      <div class="flex items-center gap-6">
        <a href="https://instagram.com/shaemsha" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Instagram">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://t.me/shaemsha" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Telegram">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a href="https://vimeo.com/user73530306" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-accent transition-colors" aria-label="Vimeo">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>
        </a>
        <a href="mailto:hello@shaemsha.com" class="text-text-muted hover:text-accent transition-colors" aria-label="Email">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-text-muted text-xs">
        &copy; {year} Emilia Shaemsha. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

Key changes: removed 3-column grid, removed nav links section, centered layout, added aria-labels and rel attributes.

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: simplify footer to brand + social + copyright"
```

---

### Task 3: Rewrite homepage as 3-card router

Complete rewrite of `src/pages/index.astro`.

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite `src/pages/index.astro`**

Replace entire file with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;

const cards = [
  {
    href: `${base}ugc/`,
    title: 'UGC · PR · Content',
    description: 'Cinematic content, brand storytelling, and influencer collaborations',
    image: `${base}images/hero.jpg`,
    span: false,
  },
  {
    href: `${base}production/`,
    title: 'Video Production',
    description: 'Commercials, brand films, and fashion campaigns',
    image: `${base}images/hero.jpg`,
    span: false,
  },
  {
    href: `${base}presets/`,
    title: 'Presets',
    description: 'Professional Lightroom presets for cinematic color grading',
    image: `${base}images/presets/nude_after.jpg`,
    span: true,
  },
];
---

<BaseLayout title="EMILIA SHAEMSHA — Videographer · Photographer · Director">

  <section class="pt-20 md:pt-24 px-2 md:px-4 pb-2 md:pb-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
      {cards.map(card => (
        <a
          href={card.href}
          class={`group relative overflow-hidden rounded-xl cursor-pointer ${
            card.span ? 'md:col-span-2 min-h-[35vh] md:min-h-[35vh]' : 'min-h-[40vh] md:min-h-[50vh]'
          }`}
        >
          <!-- B&W Background Image -->
          <img
            src={card.image}
            alt=""
            class="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            loading={card.span ? 'lazy' : 'eager'}
          />

          <!-- Dark Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <!-- Content -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h2 class="font-serif text-2xl md:text-4xl text-white tracking-[2px] mb-2">
              {card.title}
            </h2>
            <p class="text-white/70 text-sm md:text-base mb-4 max-w-lg">
              {card.description}
            </p>
            <span class="inline-block border border-accent text-accent px-6 py-2.5 text-xs tracking-[2px] uppercase rounded-lg group-hover:bg-accent group-hover:text-bg transition-all duration-300">
              Explore
            </span>
          </div>
        </a>
      ))}
    </div>
  </section>

</BaseLayout>
```

Key design decisions:
- `grayscale` CSS filter on images (B&W), removes on hover → color reveal
- `group-hover:scale-105` subtle zoom on hover
- Grid: 2 columns on desktop (top row), full span for Presets (bottom)
- Mobile: single column, each card ~40vh
- No JS needed — pure CSS interactions
- Entire card is an `<a>` tag (large click target)
- Uses existing images as placeholders (`hero.jpg` for UGC and Production, `nude_after.jpg` for Presets)

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds. May show warnings about deleted pages referenced elsewhere — that's OK, we fix in Task 4.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: rewrite homepage as 3-card router with B&W effect"
```

---

### Task 4: Delete deprecated pages

Remove pages that no longer exist in the new architecture.

**Files:**
- Delete: `src/pages/work/index.astro`
- Delete: `src/pages/about.astro`
- Delete: `src/pages/contact.astro`
- Delete: `src/pages/collaborate.astro`

- [ ] **Step 1: Delete old pages**

```bash
rm src/pages/work/index.astro
rmdir src/pages/work
rm src/pages/about.astro
rm src/pages/contact.astro
rm src/pages/collaborate.astro
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Clean build with fewer pages (should be: index, presets, presets/thank-you, production, ugc).

- [ ] **Step 3: Commit**

```bash
git add -u src/pages/
git commit -m "feat: remove deprecated pages (work, about, contact, collaborate)"
```

---

### Task 5: Create UGC page stub

Create a minimal placeholder page at `/ugc/` so the homepage link works. Full content is a separate spec.

**Files:**
- Create: `src/pages/ugc/index.astro`

- [ ] **Step 1: Create `src/pages/ugc/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="UGC · PR · Content — Emilia Shaemsha">

  <!-- Hero (same image as homepage card, but in COLOR) -->
  <section class="relative pt-20">
    <div class="max-w-6xl mx-auto px-6 pt-8">
      <div class="aspect-[21/9] rounded-xl overflow-hidden">
        <img src={`${base}images/hero.jpg`} alt="UGC and Content Creation" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="max-w-4xl mx-auto text-center py-16 px-6">
      <span class="text-xs tracking-[0.2em] uppercase text-accent font-mono">UGC · PR · Content</span>
      <h1 class="font-serif text-5xl md:text-7xl mt-4 mb-6">Content Creation</h1>
      <p class="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
        Cinematic content, brand storytelling, and influencer collaborations.
        Professional-grade UGC shot on cinema cameras with editorial post-production.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <a href="https://t.me/shaemsha" target="_blank" rel="noopener noreferrer"
           class="bg-accent text-bg font-semibold px-8 py-4 text-sm tracking-wider uppercase hover:bg-accent-hover transition-colors rounded-lg cursor-pointer">
          Get in Touch
        </a>
        <a href="https://instagram.com/shaemsha" target="_blank" rel="noopener noreferrer"
           class="border border-border text-text px-8 py-4 text-sm tracking-wider uppercase hover:border-accent hover:text-accent transition-colors rounded-lg cursor-pointer">
          View Instagram
        </a>
      </div>
    </div>
  </section>

</BaseLayout>
```

This is a stub — the full UGC page (with pricing, stats, portfolio, form) will be built in a separate spec. The hero image is intentionally the same as the homepage card, but displayed in full color (no grayscale filter).

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -15
```

Expected: Clean build, pages: index, ugc, production, presets, presets/thank-you.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ugc/index.astro
git commit -m "feat: add UGC page stub with color hero"
```

---

### Task 6: Smoke test

- [ ] **Step 1: Run dev server and verify**

```bash
npm run dev
```

Open `http://localhost:4321/shaemsha-site/` and verify:

1. Homepage shows 3 cards in B&W
2. Desktop: 2 cards top row, 1 full-width bottom
3. Mobile: 3 cards stacked vertically
4. Hover on desktop: image goes from B&W to color + slight zoom
5. Click UGC card → `/ugc/` page with same image in COLOR
6. Click Production card → `/production/` page loads
7. Click Presets card → `/presets/` page loads
8. Nav shows: SHAEMSHA | UGC · PR · Content | Production | Presets
9. Mobile menu opens/closes correctly with 3 links
10. Footer shows brand + social + copyright (no nav links)
11. Old URLs (/work/, /about/, /contact/, /collaborate/) return 404

- [ ] **Step 2: Build for production**

```bash
npm run build
```

Expected: Clean build, no errors.
