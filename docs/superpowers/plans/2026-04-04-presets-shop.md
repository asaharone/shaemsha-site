# Presets Shop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first `/presets/` page that sells 7 Lightroom presets via LemonSqueezy (USD) and Plata by Mono (UAH), with before/after photo previews and email delivery.

**Architecture:** Static Astro page with client-side JS for before/after toggle, currency switching, and preset selection. Payment handled externally — LemonSqueezy hosted checkout for USD, Cloudflare Worker + Plata by Mono for UAH. No SSR needed.

**Tech Stack:** Astro 6.1, Tailwind CSS 4.2, Cloudflare Workers (Hono), Resend (email), LemonSqueezy, Plata by Mono API.

**Spec:** `docs/superpowers/specs/2026-04-04-presets-shop-design.md`

**Existing work (uncommitted):** `src/data/presets.ts`, `src/components/BeforeAfter.astro`, modified `src/pages/shop/index.astro` — these will be rewritten to match the approved spec.

---

### Task 1: Prepare preset photos

Copy and normalize before/after photos from source directory into the project.

**Files:**
- Create: `public/images/presets/` directory with 14 photos (7 before + 7 after)

- [ ] **Step 1: Create directory and copy photos**

```bash
mkdir -p public/images/presets
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/nude_before.jpg public/images/presets/
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/nude_after.JPG public/images/presets/nude_after.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/dreamy_mood_before.jpg public/images/presets/
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/dreamymood_after.jpg public/images/presets/dreamy_mood_after.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/goldenhour_before.jpg public/images/presets/golden_hour_before.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/goldenhour_after.JPG public/images/presets/golden_hour_after.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/fashoin_before.jpg public/images/presets/fashion_before.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/fashion_after.jpg public/images/presets/
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/ART_noir_before.JPG public/images/presets/art_noir_before.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/art_noir_after.JPG public/images/presets/art_noir_after.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/film_haze_before.jpg public/images/presets/
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/film_haze_after.jpg public/images/presets/
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/honey_before.JPG public/images/presets/honey_before.jpg
cp /Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/IMG_6605.JPG public/images/presets/honey_after.jpg
```

Note: Normalize all filenames to lowercase with consistent naming pattern: `{preset_id}_before.jpg` / `{preset_id}_after.jpg`.

- [ ] **Step 2: Verify all 14 files exist**

```bash
ls -la public/images/presets/
```

Expected: 14 .jpg files, 7 before + 7 after pairs.

- [ ] **Step 3: Commit**

```bash
git add public/images/presets/
git commit -m "feat: add preset before/after photos"
```

---

### Task 2: Rewrite preset data file

Replace the existing placeholder data with actual preset info matching the 7 real presets, two currencies, and correct pricing.

**Files:**
- Modify: `src/data/presets.ts`

- [ ] **Step 1: Rewrite `src/data/presets.ts`**

```typescript
const base = import.meta.env.BASE_URL;

export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
}

export const presets: Preset[] = [
  {
    id: 'nude',
    name: 'NUDE',
    beforeImage: `${base}images/presets/nude_before.jpg`,
    afterImage: `${base}images/presets/nude_after.jpg`,
  },
  {
    id: 'dreamy-mood',
    name: 'DREAMY MOOD',
    beforeImage: `${base}images/presets/dreamy_mood_before.jpg`,
    afterImage: `${base}images/presets/dreamy_mood_after.jpg`,
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    beforeImage: `${base}images/presets/golden_hour_before.jpg`,
    afterImage: `${base}images/presets/golden_hour_after.jpg`,
  },
  {
    id: 'fashion',
    name: 'FASHION',
    beforeImage: `${base}images/presets/fashion_before.jpg`,
    afterImage: `${base}images/presets/fashion_after.jpg`,
  },
  {
    id: 'art-noir',
    name: 'ART NOIR',
    beforeImage: `${base}images/presets/art_noir_before.jpg`,
    afterImage: `${base}images/presets/art_noir_after.jpg`,
  },
  {
    id: 'film-haze',
    name: 'FILM HAZE 35mm',
    beforeImage: `${base}images/presets/film_haze_before.jpg`,
    afterImage: `${base}images/presets/film_haze_after.jpg`,
  },
  {
    id: 'honey',
    name: 'HONEY',
    beforeImage: `${base}images/presets/honey_before.jpg`,
    afterImage: `${base}images/presets/honey_after.jpg`,
  },
];

export const pricing = {
  usd: { amount: '$15.90', currency: 'USD' },
  uah: { amount: '690₴', currency: 'UAH' },
};

// Replace with real URLs after creating accounts
export const checkoutUrls = {
  usd: 'https://shaemsha.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
  uah: 'WORKER_URL/api/create-invoice', // Cloudflare Worker endpoint
};

export const faqItems = [
  {
    q: 'Do these work on iPhone?',
    a: 'Yes! Import the .dng files into Lightroom Mobile on your iPhone and use them on any photo. Works with the free version of Lightroom.',
  },
  {
    q: 'Can I use on Android?',
    a: 'Absolutely. Lightroom Mobile is available on both iOS and Android. Import the .dng files the same way.',
  },
  {
    q: 'How many photos can I edit?',
    a: 'Unlimited. Once imported, presets are yours forever — use them on as many photos as you want.',
  },
  {
    q: 'Do I need the paid version of Lightroom?',
    a: 'No. The free version of Lightroom Mobile works perfectly with .dng presets. For desktop (.xmp), you need Lightroom Classic or Lightroom CC.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Due to the digital nature of the product, refunds are not available. But if you have any issues, reach out — I\'ll help.',
  },
  {
    q: 'Will I receive updates?',
    a: 'Yes — all future updates to this pack are free. You\'ll receive them via email.',
  },
];
```

Note: `import.meta.env.BASE_URL` is used at module level in Astro `.ts` files — this works because the file is only imported by `.astro` pages at build time.

- [ ] **Step 2: Verify the build doesn't break**

```bash
npm run build 2>&1 | tail -5
```

Expected: Build succeeds (the page still references the old component, but data shape changes may cause build errors — that's OK, we fix in next tasks).

- [ ] **Step 3: Commit**

```bash
git add src/data/presets.ts
git commit -m "feat: rewrite presets data with real preset info and pricing"
```

---

### Task 3: Rewrite BeforeAfter component with pill toggle

Replace the existing `BeforeAfter.astro` with the new design: pill toggle (iOS-style) with auto-toggle animation. This component handles a single before/after image pair.

**Files:**
- Modify: `src/components/BeforeAfter.astro`

- [ ] **Step 1: Rewrite `src/components/BeforeAfter.astro`**

```astro
---
interface Props {
  beforeImage: string;
  afterImage: string;
  presetName: string;
  autoPlay?: boolean;
}

const { beforeImage, afterImage, presetName, autoPlay = true } = Astro.props;
---

<div
  class="ba-container relative overflow-hidden rounded-xl select-none"
  data-autoplay={autoPlay ? 'true' : 'false'}
  data-before={beforeImage}
  data-after={afterImage}
>
  <!-- Before image (shown by default) -->
  <img
    src={beforeImage}
    alt={`${presetName} — Before`}
    class="ba-img-before w-full block"
    loading="lazy"
  />
  <!-- After image (hidden, crossfades in) -->
  <img
    src={afterImage}
    alt={`${presetName} — After`}
    class="ba-img-after absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out"
    loading="lazy"
  />

  <!-- Preset name label (top-left) -->
  <div class="absolute top-3 left-3 z-10">
    <span class="bg-black/55 backdrop-blur-sm text-accent text-[9px] font-semibold px-3 py-1.5 rounded tracking-[2px] uppercase">
      {presetName}
    </span>
  </div>

  <!-- Pill toggle (bottom-center) -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
    <button
      class="ba-toggle relative flex items-center bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-1 py-1 cursor-pointer"
      type="button"
      aria-label="Toggle before and after"
    >
      <!-- Sliding indicator -->
      <span class="ba-slider absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-2px)] bg-accent/90 rounded-full transition-transform duration-300 ease-in-out"></span>
      <!-- Labels -->
      <span class="ba-label-before relative z-10 text-[10px] font-semibold tracking-[1px] px-4 py-1.5 text-bg transition-colors duration-300">BEFORE</span>
      <span class="ba-label-after relative z-10 text-[10px] font-semibold tracking-[1px] px-4 py-1.5 text-white/50 transition-colors duration-300">AFTER</span>
    </button>
  </div>
</div>

<style>
  .ba-container[data-state="after"] .ba-img-after {
    opacity: 1;
  }
  .ba-container[data-state="after"] .ba-slider {
    transform: translateX(100%);
  }
  .ba-container[data-state="after"] .ba-label-before {
    color: rgba(255,255,255,0.5);
  }
  .ba-container[data-state="after"] .ba-label-after {
    color: var(--color-bg, #0A0A0A);
  }
</style>

<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.ba-container').forEach(function(container) {
      var toggle = container.querySelector('.ba-toggle');
      var timer = null;
      var idleTimer = null;

      function setState(state) {
        container.setAttribute('data-state', state);
      }

      function flip() {
        var current = container.getAttribute('data-state');
        setState(current === 'after' ? 'before' : 'after');
      }

      function startAuto() {
        if (container.dataset.autoplay !== 'true') return;
        stopAuto();
        timer = setInterval(flip, 5000);
      }

      function stopAuto() {
        if (timer) { clearInterval(timer); timer = null; }
      }

      function restartAutoAfterIdle() {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(startAuto, 10000);
      }

      // Initialize
      setState('before');

      // Toggle on click
      if (toggle) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          flip();
          stopAuto();
          restartAutoAfterIdle();
        });
      }

      // Also toggle on container tap (mobile)
      container.addEventListener('click', function() {
        flip();
        stopAuto();
        restartAutoAfterIdle();
      });

      // Start auto-play
      startAuto();
    });
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BeforeAfter.astro
git commit -m "feat: rewrite BeforeAfter component with pill toggle and auto-play"
```

---

### Task 4: Build the main presets page

Create `src/pages/presets/index.astro` with the full mobile-first layout: hero with before/after, preset strip, currency toggle, pricing, buy button, what's included, how to install, FAQ, and second CTA.

**Files:**
- Create: `src/pages/presets/index.astro`
- Delete: `src/pages/shop/index.astro` (after new page works)

- [ ] **Step 1: Create `src/pages/presets/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BeforeAfter from '../../components/BeforeAfter.astro';
import { presets, pricing, checkoutUrls, faqItems } from '../../data/presets';

const base = import.meta.env.BASE_URL;
const defaultPreset = presets[0];
---

<BaseLayout title="SHAEMSHA Presets 01 — Cinematic Lightroom Presets">

  <!-- FIRST SCREEN: Everything needed for purchase -->
  <section class="pt-24 pb-8 px-4 md:pt-32 md:pb-16">
    <div class="max-w-[600px] mx-auto">

      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="text-lg md:text-xl font-medium tracking-[3px] text-text">SHAEMSHA Presets 01</h1>
        <p class="text-text-muted text-[10px] md:text-xs mt-1">7 presets · Lightroom Mobile & Desktop</p>
      </div>

      <!-- Main Before/After Photo -->
      <div id="main-photo">
        <BeforeAfter
          beforeImage={defaultPreset.beforeImage}
          afterImage={defaultPreset.afterImage}
          presetName={defaultPreset.name}
          autoPlay={true}
        />
      </div>

      <!-- Preset Strip -->
      <div class="flex gap-2 mt-3 overflow-x-auto pb-2 preset-scrollbar" id="preset-strip">
        {presets.map((preset, i) => (
          <button
            class={`preset-thumb flex-shrink-0 w-[52px] h-[68px] rounded-md overflow-hidden relative transition-opacity ${i === 0 ? 'opacity-100 outline outline-2 outline-offset-2 outline-accent' : 'opacity-50'}`}
            data-index={i}
            data-before={preset.beforeImage}
            data-after={preset.afterImage}
            data-name={preset.name}
            type="button"
            aria-label={`Preview ${preset.name}`}
          >
            <img src={preset.afterImage} alt={preset.name} class="w-full h-full object-cover" loading="lazy" />
            <span class="absolute bottom-1 left-0 right-0 text-center text-[5px] text-white font-medium tracking-wider drop-shadow-lg">{preset.name}</span>
          </button>
        ))}
      </div>

      <!-- Currency Toggle + Price + Buy -->
      <div class="text-center mt-6 border-t border-border/50 pt-4">
        <!-- Currency toggle -->
        <div class="inline-flex gap-0.5 bg-bg-card rounded-full p-0.5 mb-3" id="currency-toggle">
          <button
            class="cur-btn px-4 py-1.5 rounded-full text-[10px] font-semibold transition-all bg-accent text-bg"
            data-currency="usd"
            type="button"
          >USD</button>
          <button
            class="cur-btn px-4 py-1.5 rounded-full text-[10px] font-semibold transition-all text-text-muted"
            data-currency="uah"
            type="button"
          >UAH</button>
        </div>

        <!-- Price -->
        <div class="text-3xl font-bold text-accent" id="price-display">{pricing.usd.amount}</div>

        <!-- Buy button -->
        <a
          id="buy-button"
          href={checkoutUrls.usd}
          target="_blank"
          class="block mt-3 bg-accent text-bg font-bold py-4 rounded-xl text-xs tracking-[2px] uppercase hover:bg-accent-hover transition-colors"
        >
          BUY NOW
        </a>

        <!-- Trust badges -->
        <div class="flex justify-center gap-4 mt-3 text-[9px] text-text-muted">
          <span>✓ Instant email</span>
          <span>✓ .dng + .xmp</span>
          <span>✓ Mobile & Desktop</span>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT'S INCLUDED -->
  <section class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-4">What's Included</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-3 p-3 bg-bg-card rounded-lg">
          <span class="text-accent text-sm">✓</span>
          <div>
            <div class="text-sm text-text">7 Lightroom Presets</div>
            <div class="text-[10px] text-text-muted">.dng (Mobile) + .xmp (Desktop)</div>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 bg-bg-card rounded-lg">
          <span class="text-accent text-sm">✓</span>
          <div>
            <div class="text-sm text-text">Installation Guide</div>
            <div class="text-[10px] text-text-muted">Step-by-step for Mobile & Desktop</div>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 bg-bg-card rounded-lg">
          <span class="text-accent text-sm">✓</span>
          <div>
            <div class="text-sm text-text">Instant Email Delivery</div>
            <div class="text-[10px] text-text-muted">Download link sent to your email</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW TO INSTALL -->
  <section class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-4">How to Install</h2>
      <div class="grid grid-cols-3 gap-3">
        <div class="text-center p-3 bg-bg-card rounded-lg">
          <div class="text-accent text-lg font-bold mb-1">1</div>
          <div class="text-[10px] text-text-muted">Buy & receive email</div>
        </div>
        <div class="text-center p-3 bg-bg-card rounded-lg">
          <div class="text-accent text-lg font-bold mb-1">2</div>
          <div class="text-[10px] text-text-muted">Download .dng files</div>
        </div>
        <div class="text-center p-3 bg-bg-card rounded-lg">
          <div class="text-accent text-lg font-bold mb-1">3</div>
          <div class="text-[10px] text-text-muted">Import to Lightroom</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-4">FAQ</h2>
      <div class="space-y-2">
        {faqItems.map(item => (
          <details class="group border border-border rounded-lg overflow-hidden">
            <summary class="flex justify-between items-center px-4 py-3 cursor-pointer text-sm font-medium hover:bg-bg-card transition-colors">
              {item.q}
              <svg class="w-4 h-4 text-text-muted transition-transform group-open:rotate-45 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </summary>
            <div class="px-4 pb-3 text-sm text-text-muted leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>

  <!-- SECOND CTA -->
  <section class="py-12 px-4 border-t border-border fade-in">
    <div class="max-w-[600px] mx-auto text-center">
      <a
        id="buy-button-bottom"
        href={checkoutUrls.usd}
        target="_blank"
        class="block bg-accent text-bg font-bold py-4 rounded-xl text-xs tracking-[2px] uppercase hover:bg-accent-hover transition-colors"
      >
        BUY NOW — <span class="bottom-price">{pricing.usd.amount}</span>
      </a>
    </div>
  </section>

</BaseLayout>

<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    var strip = document.getElementById('preset-strip');
    var thumbs = strip ? strip.querySelectorAll('.preset-thumb') : [];
    var container = document.querySelector('#main-photo .ba-container');

    // --- Preset strip: switch main photo ---
    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        // Update active state
        thumbs.forEach(function(t) {
          t.classList.remove('opacity-100', 'outline', 'outline-2', 'outline-offset-2', 'outline-accent');
          t.classList.add('opacity-50');
        });
        thumb.classList.remove('opacity-50');
        thumb.classList.add('opacity-100', 'outline', 'outline-2', 'outline-offset-2', 'outline-accent');

        // Swap images
        if (container) {
          var beforeImg = container.querySelector('.ba-img-before');
          var afterImg = container.querySelector('.ba-img-after');
          var label = container.querySelector('.ba-container > div:first-of-type span');

          if (beforeImg) beforeImg.src = thumb.dataset.before;
          if (afterImg) afterImg.src = thumb.dataset.after;
          if (label) label.textContent = thumb.dataset.name;

          // Reset to before state
          container.setAttribute('data-state', 'before');
        }
      });
    });

    // --- Currency toggle ---
    var priceData = {
      usd: { amount: '$15.90', url: document.getElementById('buy-button').href },
      uah: { amount: '690₴', url: 'WORKER_URL/api/create-invoice' }
    };

    var curBtns = document.querySelectorAll('.cur-btn');
    var priceDisplay = document.getElementById('price-display');
    var buyBtn = document.getElementById('buy-button');
    var buyBtnBottom = document.getElementById('buy-button-bottom');
    var bottomPrice = document.querySelector('.bottom-price');

    curBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cur = btn.dataset.currency;

        // Update button styles
        curBtns.forEach(function(b) {
          b.classList.remove('bg-accent', 'text-bg');
          b.classList.add('text-text-muted');
        });
        btn.classList.add('bg-accent', 'text-bg');
        btn.classList.remove('text-text-muted');

        // Update price & URL
        if (priceDisplay) priceDisplay.textContent = priceData[cur].amount;
        if (buyBtn) buyBtn.href = priceData[cur].url;
        if (buyBtnBottom) buyBtnBottom.href = priceData[cur].url;
        if (bottomPrice) bottomPrice.textContent = priceData[cur].amount;
      });
    });
  });
</script>

<style>
  .preset-scrollbar::-webkit-scrollbar { height: 0; }
  .preset-scrollbar { scrollbar-width: none; }
</style>
```

- [ ] **Step 2: Delete old shop page**

```bash
rm src/pages/shop/index.astro
rmdir src/pages/shop
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds. Page available at `/presets/`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/presets/index.astro
git add -u src/pages/shop/
git commit -m "feat: add presets page, remove old shop placeholder"
```

---

### Task 5: Update navigation links (shop → presets)

Update all internal links from `/shop/` to `/presets/` across Nav, Footer, homepage, and other pages.

**Files:**
- Modify: `src/components/Nav.astro` — change link href
- Modify: `src/components/Footer.astro` — change link href
- Modify: `src/pages/index.astro` — update preset teaser link
- Modify: `src/pages/about.astro` — update shop link if present

- [ ] **Step 1: Update Nav.astro**

In `src/components/Nav.astro`, change the links array:

```
Old: { href: `${base}shop/`, label: 'Presets' },
New: { href: `${base}presets/`, label: 'Presets' },
```

Also remove any `isShopPage` / `isUkr` variables if present (from uncommitted changes).

- [ ] **Step 2: Update Footer.astro**

In `src/components/Footer.astro`, change:

```
Old: { href: `${base}shop/`, label: 'Presets' },
New: { href: `${base}presets/`, label: 'Presets' },
```

- [ ] **Step 3: Update homepage (index.astro)**

In `src/pages/index.astro`, find all `${base}shop/` references and replace with `${base}presets/`. There are two: the CTA block link and the preset teaser section link.

- [ ] **Step 4: Update about.astro**

In `src/pages/about.astro`, find `${base}shop/` and replace with `${base}presets/`.

- [ ] **Step 5: Verify build and check for remaining /shop/ references**

```bash
grep -r "shop/" src/ --include="*.astro" --include="*.ts"
```

Expected: No results (all references updated).

- [ ] **Step 6: Commit**

```bash
git add src/components/Nav.astro src/components/Footer.astro src/pages/index.astro src/pages/about.astro
git commit -m "feat: update all navigation links from /shop/ to /presets/"
```

---

### Task 6: Create Thank You page

Simple static page shown after successful purchase.

**Files:**
- Create: `src/pages/presets/thank-you.astro`

- [ ] **Step 1: Create `src/pages/presets/thank-you.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="Thank You — SHAEMSHA Presets">
  <section class="pt-32 pb-24 px-6">
    <div class="max-w-md mx-auto text-center">
      <div class="text-5xl mb-6">✨</div>
      <h1 class="font-serif text-4xl md:text-5xl mb-4">Thank You!</h1>
      <p class="text-text-muted leading-relaxed mb-2">
        Your presets are on the way.
      </p>
      <p class="text-text-muted leading-relaxed mb-8">
        Check your email for the download link. If you don't see it within 5 minutes, check your spam folder.
      </p>

      <div class="space-y-4">
        <a href={`${base}presets/`} class="block border border-border text-text px-8 py-4 rounded-lg text-sm tracking-wider uppercase hover:border-accent hover:text-accent transition-colors">
          Back to Presets
        </a>
        <a href="https://instagram.com/shaemsha" target="_blank" class="block text-text-muted text-sm hover:text-accent transition-colors">
          Follow @shaemsha on Instagram
        </a>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/presets/thank-you.astro
git commit -m "feat: add thank-you page for post-purchase"
```

---

### Task 7: Build Cloudflare Worker for Mono payments

Create a Cloudflare Worker project that handles: creating Mono invoices and processing payment webhooks to send download emails via Resend.

**Files:**
- Create: `worker/` directory with Cloudflare Worker project
- Create: `worker/src/index.ts` — main worker with two endpoints
- Create: `worker/wrangler.toml` — Cloudflare config
- Create: `worker/package.json`

- [ ] **Step 1: Initialize worker project**

```bash
mkdir -p worker/src
```

- [ ] **Step 2: Create `worker/package.json`**

```json
{
  "name": "shaemsha-presets-worker",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "hono": "^4.0.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.0.0",
    "wrangler": "^3.0.0"
  }
}
```

- [ ] **Step 3: Create `worker/wrangler.toml`**

```toml
name = "shaemsha-presets"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
DOWNLOAD_URL = "https://your-r2-bucket.example.com/shaemsha-presets-01.zip"
MONO_MERCHANT_ID = ""
SITE_URL = "https://asaharone.github.io/shaemsha-site"

# Set these as secrets via `wrangler secret put`:
# MONO_TOKEN — Plata by Mono API token
# MONO_WEBHOOK_PUBKEY — Mono webhook public key (for signature verification)
# RESEND_API_KEY — Resend API key for sending emails
```

- [ ] **Step 4: Create `worker/src/index.ts`**

```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  MONO_TOKEN: string;
  MONO_WEBHOOK_PUBKEY: string;
  RESEND_API_KEY: string;
  DOWNLOAD_URL: string;
  MONO_MERCHANT_ID: string;
  SITE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('/*', cors({
  origin: ['https://asaharone.github.io'],
  allowMethods: ['POST', 'OPTIONS'],
}));

// Create Mono invoice
app.post('/api/create-invoice', async (c) => {
  const body = await c.req.json<{ email?: string }>();

  const invoiceData = {
    amount: 69000, // 690.00 UAH in kopecks
    ccy: 980, // UAH currency code
    merchantPaymInfo: {
      reference: `presets-${Date.now()}`,
      destination: 'SHAEMSHA Presets 01',
      basketOrder: [{
        name: 'SHAEMSHA Presets 01 — 7 Lightroom Presets',
        qty: 1,
        sum: 69000,
        unit: 'pcs',
      }],
    },
    redirectUrl: `${c.env.SITE_URL}/presets/thank-you/`,
    webHookUrl: `https://shaemsha-presets.YOUR_SUBDOMAIN.workers.dev/api/mono-webhook`,
    validity: 3600, // 1 hour
  };

  const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': c.env.MONO_TOKEN,
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    const error = await response.text();
    return c.json({ error: 'Failed to create invoice', details: error }, 500);
  }

  const result = await response.json<{ pageUrl: string; invoiceId: string }>();
  return c.json({ paymentUrl: result.pageUrl });
});

// Mono webhook — payment confirmation
app.post('/api/mono-webhook', async (c) => {
  const body = await c.req.text();
  const signature = c.req.header('X-Sign') || '';

  // Verify webhook signature using Mono public key
  // Mono signs the body with ECDSA using their public key
  const isValid = await verifyMonoSignature(body, signature, c.env.MONO_WEBHOOK_PUBKEY);
  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401);
  }

  const data = JSON.parse(body);

  // Only process successful payments
  if (data.status !== 'success') {
    return c.json({ ok: true });
  }

  // Send download email via Resend
  const emailResult = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${c.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'SHAEMSHA Presets <noreply@shaemsha.com>',
      to: [data.finalAmount ? data.destination || '' : ''],
      subject: 'Your SHAEMSHA Presets 01 — Download Link',
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
          <h1 style="font-size:24px">Thank you for your purchase!</h1>
          <p>Here is your download link for <strong>SHAEMSHA Presets 01</strong>:</p>
          <a href="${c.env.DOWNLOAD_URL}"
             style="display:inline-block;background:#C4A265;color:#0A0A0A;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin:16px 0">
            Download Presets
          </a>
          <p style="color:#666;font-size:14px">
            The pack includes 7 presets in .dng (Mobile) and .xmp (Desktop) formats.
          </p>
          <p style="color:#666;font-size:14px">
            Need help? Reply to this email or reach out on
            <a href="https://instagram.com/shaemsha">Instagram @shaemsha</a>.
          </p>
        </div>
      `,
    }),
  });

  if (!emailResult.ok) {
    console.error('Email send failed:', await emailResult.text());
  }

  return c.json({ ok: true });
});

// ECDSA signature verification for Mono webhooks
async function verifyMonoSignature(body: string, signature: string, pubKeyBase64: string): Promise<boolean> {
  try {
    const pubKeyBytes = Uint8Array.from(atob(pubKeyBase64), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey(
      'spki',
      pubKeyBytes,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    );
    const sigBytes = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    const dataBytes = new TextEncoder().encode(body);
    return await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key,
      sigBytes,
      dataBytes
    );
  } catch {
    return false;
  }
}

export default app;
```

Note: The webhook email recipient extraction depends on Mono's webhook payload format. The `data.destination` field may need adjustment after testing with real webhooks. The email field in the invoice creation request should capture the buyer's email — this may require adding an email input to the checkout flow or using Mono's built-in email collection.

- [ ] **Step 5: Install dependencies**

```bash
cd worker && npm install
```

- [ ] **Step 6: Commit**

```bash
cd /Users/macos/Desktop/shaemsha-site-v2
git add worker/
git commit -m "feat: add Cloudflare Worker for Mono payments and email delivery"
```

---

### Task 8: Wire up real payment URLs

Update the presets data with actual LemonSqueezy and Worker URLs once the accounts are created.

**Files:**
- Modify: `src/data/presets.ts` — update `checkoutUrls`
- Modify: `src/pages/presets/index.astro` — update inline JS `priceData.uah.url`

- [ ] **Step 1: Update checkout URLs in `src/data/presets.ts`**

After creating LemonSqueezy product and deploying the Cloudflare Worker, replace the placeholder URLs:

```typescript
export const checkoutUrls = {
  usd: 'https://shaemsha.lemonsqueezy.com/checkout/buy/REAL_PRODUCT_ID',
  uah: 'https://shaemsha-presets.YOUR_SUBDOMAIN.workers.dev/api/create-invoice',
};
```

- [ ] **Step 2: Update inline JS in presets page**

In `src/pages/presets/index.astro`, the `priceData` object in the `<script>` block has hardcoded URLs. These are populated from the `checkoutUrls` export at build time via the `href` attribute on the buy button (USD) and need a matching update for UAH:

Replace in the script block:
```
uah: { amount: '690₴', url: 'WORKER_URL/api/create-invoice' }
```
with the real worker URL.

- [ ] **Step 3: Commit**

```bash
git add src/data/presets.ts src/pages/presets/index.astro
git commit -m "feat: wire up real payment URLs"
```

Note: This task is blocked until LemonSqueezy and Cloudflare Worker are deployed. It can be done as a follow-up.

---

### Task 9: Manual smoke test

Verify everything works end-to-end.

- [ ] **Step 1: Run dev server and test**

```bash
npm run dev
```

Open `http://localhost:4321/shaemsha-site/presets/` and verify:

1. Page loads with NUDE preset before photo visible
2. Pill toggle switches between before/after with animation
3. Auto-toggle fires every 5 seconds
4. Clicking a thumbnail in the strip changes the main photo
5. Active thumbnail has gold outline
6. Currency toggle switches between $15.90 and 690₴
7. Buy button href changes when currency is switched
8. Scroll down: What's Included, How to Install, FAQ sections render
9. FAQ accordion opens/closes
10. Second CTA button at bottom shows correct price
11. Desktop: content centered at max ~600px width
12. Mobile: everything fits on first screen without horizontal overflow

- [ ] **Step 2: Test thank-you page**

Open `http://localhost:4321/shaemsha-site/presets/thank-you/` and verify it renders correctly.

- [ ] **Step 3: Test navigation**

Verify all nav/footer links point to `/presets/` not `/shop/`. Check homepage preset teaser link.

- [ ] **Step 4: Build for production**

```bash
npm run build
```

Expected: Clean build with no errors.
