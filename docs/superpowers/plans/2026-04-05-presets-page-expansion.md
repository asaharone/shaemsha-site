# Presets Page Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the `/presets/` page with an intro hero (autoplay Vimeo video), two GIF demo sections (How It Works, How to Install), and a 7-preset Usage Examples gallery with JTBD descriptions.

**Architecture:** Two new Astro components (IntroHero, UsageExample) + extended data model in `src/data/presets.ts` + rewrite of `src/pages/presets/index.astro` to add new sections and reorder existing ones. All static, no new dependencies.

**Tech Stack:** Astro 6.1, Tailwind CSS 4.2, Vimeo embedded player.

**Spec:** `docs/superpowers/specs/2026-04-05-presets-page-expansion-design.md`

**Current page order:** First Screen → What's Included → How to Install → FAQ → Second CTA
**New page order:** Intro → First Screen (with anchor link) → What's Included → How It Works → How to Install → Usage Examples (w/ BUY NOW) → FAQ

---

### Task 1: Extend presets data model

Add description, example photos, usage order, and page content to the data file.

**Files:**
- Modify: `src/data/presets.ts`

- [ ] **Step 1: Rewrite `src/data/presets.ts` with extended data**

Replace the entire contents of `src/data/presets.ts` with:

```typescript
const base = import.meta.env.BASE_URL;

export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  examplePhotos: string[];
}

// Using afterImage as placeholder for examplePhotos (3 copies each).
// User will replace with real example photos later.
function examplesFor(id: string): string[] {
  const afterPath = `${base}images/presets/${id.replace('-', '_')}_after.jpg`;
  return [afterPath, afterPath, afterPath];
}

export const presets: Preset[] = [
  {
    id: 'nude',
    name: 'NUDE',
    beforeImage: `${base}images/presets/nude_before.jpg`,
    afterImage: `${base}images/presets/nude_after.jpg`,
    description: 'For photos where you want a softer, cleaner, and more visually striking look, while gently preserving the natural color tone. Works especially well for selfies, portraits, and naturally lit photos.',
    examplePhotos: examplesFor('nude'),
  },
  {
    id: 'dreamy-mood',
    name: 'DREAMY MOOD',
    beforeImage: `${base}images/presets/dreamy_mood_before.jpg`,
    afterImage: `${base}images/presets/dreamy_mood_after.jpg`,
    description: 'For photos with a romantic, hazy, slightly dusty-rose mood. Softens the image and creates a more dreamy, warm atmosphere.',
    examplePhotos: examplesFor('dreamy-mood'),
  },
  {
    id: 'golden-hour',
    name: 'GOLDEN HOUR',
    beforeImage: `${base}images/presets/golden_hour_before.jpg`,
    afterImage: `${base}images/presets/golden_hour_after.jpg`,
    description: 'For photos you want to give rich golden warmth, a vacation-light feel, and a touch of Morocco. Looks especially beautiful during golden hour, giving the image a beige-golden palette.',
    examplePhotos: examplesFor('golden-hour'),
  },
  {
    id: 'fashion',
    name: 'FASHION',
    beforeImage: `${base}images/presets/fashion_before.jpg`,
    afterImage: `${base}images/presets/fashion_after.jpg`,
    description: 'Ideal for photos where you want to make the subject stand out more. Perfect for flash, studio, street, and outdoor shots, giving the image a glossier fashion feel while keeping a sun-kissed skin glow.',
    examplePhotos: examplesFor('fashion'),
  },
  {
    id: 'art-noir',
    name: 'ART NOIR',
    beforeImage: `${base}images/presets/art_noir_before.jpg`,
    afterImage: `${base}images/presets/art_noir_after.jpg`,
    description: 'For photos that need more artistry, depth, and a stylized mood. Makes the image more graphic and expressive while keeping a vintage cinematic character.',
    examplePhotos: examplesFor('art-noir'),
  },
  {
    id: 'film-haze',
    name: 'FILM HAZE 35mm',
    beforeImage: `${base}images/presets/film_haze_before.jpg`,
    afterImage: `${base}images/presets/film_haze_after.jpg`,
    description: 'For photos with a film-like haze, soft glow, and vintage mood. Ideal for bright outdoor shots when you want to add more atmosphere and a 35 mm feel.',
    examplePhotos: examplesFor('film-haze'),
  },
  {
    id: 'honey',
    name: 'HONEY',
    beforeImage: `${base}images/presets/honey_before.jpg`,
    afterImage: `${base}images/presets/honey_after.jpg`,
    description: 'For photos you want to give a warm old money mood. Makes the image feel calmer and more visually enveloping.',
    examplePhotos: examplesFor('honey'),
  },
];

// Display order for the Usage Examples section (different from preset strip order)
export const usageExamplesOrder = [
  'nude', 'fashion', 'dreamy-mood', 'honey',
  'golden-hour', 'film-haze', 'art-noir',
];

export const pricing = {
  usd: { amount: '$15.90', currency: 'USD' },
  uah: { amount: '690₴', currency: 'UAH' },
};

// Replace with real URLs after creating accounts
export const checkoutUrls = {
  usd: 'https://shaemsha.lemonsqueezy.com/checkout/buy/PLACEHOLDER',
  uah: 'WORKER_URL/api/create-invoice',
};

export const pageContent = {
  intro: {
    quote: 'Color is where a story finds its mood. After 10+ years behind the camera, color grading became the part I love most — the quiet final step that turns a frame into a feeling.',
    vimeoId: '703936443',
  },
  howItWorks: {
    label: 'HOW IT WORKS',
    text: 'Tap a preset, watch your photo transform instantly in Lightroom Mobile.',
    gif: `${base}images/demos/how-it-works.gif`,
  },
  howToInstall: {
    label: 'HOW TO INSTALL',
    text: "Import the .dng files once — they'll stay in your Lightroom presets forever.",
    gif: `${base}images/demos/how-to-install.gif`,
  },
  usageExamples: {
    label: 'USAGE EXAMPLES',
    title: 'Where each preset works best',
  },
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
    a: "Due to the digital nature of the product, refunds are not available. But if you have any issues, reach out — I'll help.",
  },
  {
    q: 'Will I receive updates?',
    a: "Yes — all future updates to this pack are free. You'll receive them via email.",
  },
];
```

Key additions:
- `description` and `examplePhotos` fields on `Preset` interface
- `usageExamplesOrder` array (user-specified order: NUDE, FASHION, DREAMY MOOD, HONEY, GOLDEN HOUR, FILM HAZE, ART NOIR)
- `pageContent` object with intro quote, section copy, Vimeo ID, and GIF paths

- [ ] **Step 2: Verify TypeScript types with build**

Run: `npm run build 2>&1 | tail -15`
Expected: Build succeeds. If any imports reference `description` or `examplePhotos` without them existing, we'll fix in Task 5.

- [ ] **Step 3: Commit**

```bash
git add src/data/presets.ts
git commit -m "feat: extend presets data with descriptions, examples, and page content"
```

---

### Task 2: Add placeholder demo GIF files

Create the `public/images/demos/` directory with placeholder files so the GIF images don't 404. The user will replace them with real recordings later.

**Files:**
- Create: `public/images/demos/how-it-works.gif`
- Create: `public/images/demos/how-to-install.gif`

- [ ] **Step 1: Create directory and copy placeholders**

Use an existing preset photo as a stand-in placeholder (renamed to .gif extension works fine — browsers render JPG content regardless of extension, but will also accept .gif; for a cleaner approach, use a real tiny looping GIF or just copy a JPG with the extension):

```bash
mkdir -p public/images/demos
cp public/images/presets/nude_after.jpg public/images/demos/how-it-works.gif
cp public/images/presets/golden_hour_after.jpg public/images/demos/how-to-install.gif
```

Note: Browsers detect image format from content bytes, not the filename extension, so a JPG renamed to .gif will still display. This is a temporary placeholder.

- [ ] **Step 2: Verify files exist**

Run: `ls -la public/images/demos/`
Expected: Two files, `how-it-works.gif` and `how-to-install.gif`.

- [ ] **Step 3: Commit**

```bash
git add public/images/demos/
git commit -m "feat: add placeholder demo GIFs (user will replace)"
```

---

### Task 3: Create IntroHero component

New component for the top of the page: quote text + autoplay Vimeo background video.

**Files:**
- Create: `src/components/IntroHero.astro`

- [ ] **Step 1: Create `src/components/IntroHero.astro`**

```astro
---
interface Props {
  quote: string;
  vimeoId: string;
}

const { quote, vimeoId } = Astro.props;
const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0`;
---

<section class="pt-24 pb-6 md:pt-28 md:pb-8 px-4">
  <div class="max-w-[600px] mx-auto">
    <!-- Quote text -->
    <p class="font-serif text-base md:text-lg italic leading-relaxed text-text text-center mb-5 max-w-[520px] mx-auto">
      {quote}
    </p>

    <!-- Vimeo video, 16:9 -->
    <div class="relative rounded-xl overflow-hidden" style="padding:56.25% 0 0 0">
      <iframe
        src={vimeoUrl}
        style="position:absolute;top:0;left:0;width:100%;height:100%;"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        title="SHAEMSHA Showreel"
        loading="eager"
      ></iframe>
    </div>

    <!-- Scroll hint -->
    <div class="flex justify-center mt-4 opacity-40">
      <svg class="w-4 h-4 text-text-muted animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7"/>
      </svg>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/IntroHero.astro
git commit -m "feat: add IntroHero component with autoplay Vimeo background"
```

---

### Task 4: Create UsageExample component

Reusable component for a single preset's usage section: name + 3 photos + description.

**Files:**
- Create: `src/components/UsageExample.astro`

- [ ] **Step 1: Create `src/components/UsageExample.astro`**

```astro
---
interface Props {
  id: string;
  name: string;
  description: string;
  photos: string[]; // Expects exactly 3 photos
}

const { id, name, description, photos } = Astro.props;
---

<div id={`preset-${id}`} class="py-8 border-b border-border last:border-b-0 fade-in">
  <!-- Preset name -->
  <h3 class="font-serif text-2xl md:text-3xl text-accent text-center mb-4 tracking-[2px]">
    {name}
  </h3>

  <!-- 3 photos in a row -->
  <div class="grid grid-cols-3 gap-1.5 md:gap-2 mb-4">
    {photos.slice(0, 3).map((photo, i) => (
      <div class="aspect-[3/4] rounded-md overflow-hidden bg-bg-card">
        <img
          src={photo}
          alt={`${name} example ${i + 1}`}
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    ))}
  </div>

  <!-- Description -->
  <p class="text-sm text-text-muted leading-relaxed text-center max-w-[480px] mx-auto">
    {description}
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/UsageExample.astro
git commit -m "feat: add UsageExample component for preset gallery sections"
```

---

### Task 5: Rewrite presets page with new sections and order

Replace the entire `src/pages/presets/index.astro` with the new structure: Intro → First Screen (with anchor link) → What's Included → How It Works → How to Install → Usage Examples (with BUY NOW) → FAQ.

**Files:**
- Modify: `src/pages/presets/index.astro`

- [ ] **Step 1: Rewrite `src/pages/presets/index.astro`**

Replace the entire file contents with:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BeforeAfter from '../../components/BeforeAfter.astro';
import IntroHero from '../../components/IntroHero.astro';
import UsageExample from '../../components/UsageExample.astro';
import {
  presets, pricing, checkoutUrls, faqItems, pageContent, usageExamplesOrder
} from '../../data/presets';

const defaultPreset = presets[0];
const pc = pageContent;

// Build ordered list of presets for Usage Examples section
const orderedPresets = usageExamplesOrder
  .map(id => presets.find(p => p.id === id))
  .filter((p): p is typeof presets[number] => p !== undefined);
---

<BaseLayout title="SHAEMSHA Presets 01 — Cinematic Lightroom Presets">

  <!-- 1. INTRO -->
  <IntroHero quote={pc.intro.quote} vimeoId={pc.intro.vimeoId} />

  <!-- 2. FIRST SCREEN: Everything needed for purchase -->
  <section class="pt-4 pb-8 md:pt-6 md:pb-16 px-4">
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

      <!-- "See usage examples" anchor link -->
      <a href="#usage-examples" class="block text-center py-2 text-[9px] tracking-[1px] text-accent/70 hover:text-accent uppercase border-b border-white/5 mb-2 transition-colors">
        See usage examples ↓
      </a>

      <!-- Currency Toggle + Price + Buy -->
      <div class="text-center mt-4">
        <div class="inline-flex gap-0.5 bg-bg-card rounded-full p-0.5 mb-3" id="currency-toggle">
          <button class="cur-btn px-4 py-1.5 rounded-full text-[10px] font-semibold transition-all bg-accent text-bg" data-currency="usd" type="button">USD</button>
          <button class="cur-btn px-4 py-1.5 rounded-full text-[10px] font-semibold transition-all text-text-muted" data-currency="uah" type="button">UAH</button>
        </div>

        <div class="text-3xl font-bold text-accent" id="price-display">{pricing.usd.amount}</div>

        <a id="buy-button" href={checkoutUrls.usd} target="_blank"
           class="block mt-3 bg-accent text-bg font-bold py-4 rounded-xl text-xs tracking-[2px] uppercase hover:bg-accent-hover transition-colors">
          BUY NOW
        </a>

        <div class="flex justify-center gap-4 mt-3 text-[9px] text-text-muted">
          <span>✓ Instant email</span>
          <span>✓ .dng + .xmp</span>
          <span>✓ Mobile & Desktop</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. WHAT'S INCLUDED -->
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

  <!-- 4. HOW IT WORKS -->
  <section class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-3 text-center">{pc.howItWorks.label}</h2>
      <p class="text-sm text-text-muted text-center mb-5 max-w-[420px] mx-auto">{pc.howItWorks.text}</p>
      <div class="max-w-[280px] mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-bg-card">
        <img src={pc.howItWorks.gif} alt="How it works" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>

  <!-- 5. HOW TO INSTALL -->
  <section class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-3 text-center">{pc.howToInstall.label}</h2>
      <p class="text-sm text-text-muted text-center mb-5 max-w-[420px] mx-auto">{pc.howToInstall.text}</p>
      <div class="max-w-[280px] mx-auto aspect-[3/4] rounded-xl overflow-hidden bg-bg-card">
        <img src={pc.howToInstall.gif} alt="How to install" class="w-full h-full object-cover" loading="lazy" decoding="async" />
      </div>
    </div>
  </section>

  <!-- 6. USAGE EXAMPLES -->
  <section id="usage-examples" class="py-12 px-4 fade-in">
    <div class="max-w-[600px] mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-accent text-[9px] tracking-[2px] uppercase font-mono mb-2">{pc.usageExamples.label}</h2>
        <h3 class="font-serif text-2xl md:text-3xl text-text">{pc.usageExamples.title}</h3>
      </div>

      {orderedPresets.map(preset => (
        <UsageExample
          id={preset.id}
          name={preset.name}
          description={preset.description}
          photos={preset.examplePhotos}
        />
      ))}

      <!-- BUY NOW at end of Usage Examples -->
      <div class="mt-8 pt-8 border-t border-border text-center">
        <a id="buy-button-usage" href={checkoutUrls.usd} target="_blank"
           class="block bg-accent text-bg font-bold py-4 rounded-xl text-xs tracking-[2px] uppercase hover:bg-accent-hover transition-colors">
          BUY NOW — <span class="usage-price">{pricing.usd.amount}</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 7. FAQ -->
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

</BaseLayout>

<script is:inline>
  document.addEventListener('DOMContentLoaded', function() {
    var strip = document.getElementById('preset-strip');
    var thumbs = strip ? strip.querySelectorAll('.preset-thumb') : [];
    var container = document.querySelector('#main-photo .ba-container');

    // --- Preset strip: switch main photo ---
    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        thumbs.forEach(function(t) {
          t.classList.remove('opacity-100', 'outline', 'outline-2', 'outline-offset-2', 'outline-accent');
          t.classList.add('opacity-50');
        });
        thumb.classList.remove('opacity-50');
        thumb.classList.add('opacity-100', 'outline', 'outline-2', 'outline-offset-2', 'outline-accent');

        if (container) {
          var beforeImg = container.querySelector('.ba-img-before');
          var afterImg = container.querySelector('.ba-img-after');
          var label = container.querySelector('.ba-container > div:first-of-type span');

          if (beforeImg) beforeImg.src = thumb.dataset.before;
          if (afterImg) afterImg.src = thumb.dataset.after;
          if (label) label.textContent = thumb.dataset.name;

          container.setAttribute('data-state', 'before');
        }
      });
    });

    // --- Currency toggle (updates both BUY NOW buttons) ---
    var curBtns = document.querySelectorAll('.cur-btn');
    var priceDisplay = document.getElementById('price-display');
    var buyBtn = document.getElementById('buy-button');
    var buyBtnUsage = document.getElementById('buy-button-usage');
    var usagePrice = document.querySelector('.usage-price');

    var priceData = {
      usd: { amount: '$15.90', url: buyBtn ? buyBtn.href : '#' },
      uah: { amount: '690₴', url: 'WORKER_URL/api/create-invoice' }
    };

    curBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cur = btn.dataset.currency;

        curBtns.forEach(function(b) {
          b.classList.remove('bg-accent', 'text-bg');
          b.classList.add('text-text-muted');
        });
        btn.classList.add('bg-accent', 'text-bg');
        btn.classList.remove('text-text-muted');

        if (priceDisplay) priceDisplay.textContent = priceData[cur].amount;
        if (buyBtn) buyBtn.href = priceData[cur].url;
        if (buyBtnUsage) buyBtnUsage.href = priceData[cur].url;
        if (usagePrice) usagePrice.textContent = priceData[cur].amount;
      });
    });
  });
</script>

<style>
  .preset-scrollbar::-webkit-scrollbar { height: 0; }
  .preset-scrollbar { scrollbar-width: none; }
</style>
```

Key changes vs previous version:
- Added `IntroHero` at the top
- Added "See usage examples ↓" anchor link between preset strip and currency toggle
- Removed `border-t` from currency section (now the anchor link has its own border)
- Added `How It Works` and `How to Install` GIF sections (replacing old 3-step install grid)
- Added `Usage Examples` section with 7 preset galleries in custom order
- BUY NOW moved to end of Usage Examples (was a separate section at the very bottom)
- FAQ moved to very end (after Usage Examples)
- Renamed `buy-button-bottom` → `buy-button-usage` and `.bottom-price` → `.usage-price`
- Reduced top padding on First Screen since IntroHero is above it

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Clean build, 8 pages.

- [ ] **Step 3: Manual smoke test via dev server**

Run: `npm run dev`
Open `http://localhost:4321/shaemsha-site/presets/` and verify:
1. Intro section shows quote + autoplay Vimeo video at top
2. First Screen is partially visible below intro when page loads
3. "See usage examples ↓" link is present and scrolls to Usage Examples on click
4. What's Included renders with 3 items
5. How It Works section has label, 1-sentence description, vertical 3:4 GIF
6. How to Install section same structure
7. Usage Examples shows 7 preset sections in order: NUDE, FASHION, DREAMY MOOD, HONEY, GOLDEN HOUR, FILM HAZE 35mm, ART NOIR
8. Each section has name, 3 photos in a row, description
9. BUY NOW button appears after the 7 preset sections
10. FAQ section is at the very bottom
11. Currency toggle switches price on both BUY NOW buttons (first screen + usage examples)
12. Preset strip still works (changes main hero photo)

- [ ] **Step 4: Commit**

```bash
git add src/pages/presets/index.astro
git commit -m "feat: expand presets page with intro, demos, and usage examples"
```

---

## Notes

**On placeholder assets:** Task 2 creates `.gif` files that are actually JPG content. Browsers will render them correctly. The user will replace both GIFs and the 21 example photos when ready. The data layer (`examplesFor()` helper) makes photo replacement trivial — just update the paths or create separate files per position.

**On section reordering:** FAQ moved from middle to end because Usage Examples is substantial new content between them. The new flow: sell (first screen) → prove (examples) → answer objections (FAQ).

**On the second CTA:** The previous bottom CTA section was removed — its job is done by the BUY NOW at the end of Usage Examples.
