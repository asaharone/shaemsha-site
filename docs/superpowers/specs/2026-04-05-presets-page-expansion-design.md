# Presets Page Expansion — Design Spec

## Overview

Extend the existing `/presets/` shop page with three new sections: an intro hero with autoplay showreel video, two GIF-demo sections ("How It Works" and "How to Install"), and a detailed Usage Examples gallery with 7 preset sections (3 photos + JTBD description each).

The goal is to deepen engagement for visitors who don't buy on the first screen — giving them rich context about each preset and seeing the craft behind them.

## Final Page Structure

1. **Intro** (new) — quote + autoplay video
2. **First Screen** — hero with preset showcase + BUY NOW (existing, with minor addition)
3. **What's Included** (existing)
4. **How It Works** (new) — 1 sentence + auto-loop GIF
5. **How to Install** (new) — 1 sentence + auto-loop GIF
6. **Usage Examples** (new) — 7 preset galleries + BUY NOW
7. **FAQ** (existing)

## Section Details

### 1. Intro Section (new)

Positioned at the very top of the page, above the current First Screen. Sized so that part of the First Screen peeks below — inviting scroll.

**Layout:**
- Quote text at top (centered, serif font): "Color is where a story finds its mood. After 10+ years behind the camera, color grading became the part I love most — the quiet final step that turns a frame into a feeling."
- Vimeo Highlights video below (ID `703936443`)
- Video: autoplay, muted, loop, no controls, no title/byline
- Responsive 16:9 ratio
- Small scroll indicator at bottom hints at content below

**Vimeo embed parameters:** `autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0`

The `background=1` parameter removes all player chrome for a clean showreel feel.

### 2. First Screen (existing, with addition)

No structural changes. Only addition: insert a text link **"See usage examples ↓"** between the preset strip and the currency toggle. Clicking scrolls to the Usage Examples section.

### 4. How It Works (new)

Positioned after "What's Included", before "How to Install".

**Layout:**
- Section label: "HOW IT WORKS" (small, uppercase, gold)
- One-sentence description: "Tap a preset, watch your photo transform instantly in Lightroom Mobile."
- GIF below in 3:4 vertical ratio
- GIF: auto-loop, no play button, no controls
- Max-width matches page content (600px)

**Asset:** `public/images/demos/how-it-works.gif` (placeholder — a static image or short loop, user will replace with real GIF later)

### 5. How to Install (new)

Positioned after "How It Works", before "Usage Examples".

**Layout:**
- Section label: "HOW TO INSTALL" (small, uppercase, gold)
- One-sentence description: "Import the .dng files once — they'll stay in your Lightroom presets forever."
- GIF below in 3:4 vertical ratio
- GIF: auto-loop, no play button, no controls

**Asset:** `public/images/demos/how-to-install.gif` (placeholder for now)

### 6. Usage Examples (new)

The main new section. Shows 7 preset galleries with JTBD descriptions.

**Section header:**
- Label: "USAGE EXAMPLES"
- Title: "Where each preset works best"

**Per-preset section** (repeated 7 times):
- Preset name (large serif, gold)
- 3 photos in a horizontal row (aspect ratio: 3:4 each, gap 4-6px between)
- JTBD description below photos (2-3 sentences)
- Thin border separator between sections

**Preset order and descriptions:**

1. **NUDE** — "For photos where you want a softer, cleaner, and more visually striking look, while gently preserving the natural color tone. Works especially well for selfies, portraits, and naturally lit photos."

2. **FASHION** — "Ideal for photos where you want to make the subject stand out more. Perfect for flash, studio, street, and outdoor shots, giving the image a glossier fashion feel while keeping a sun-kissed skin glow."

3. **DREAMY MOOD** — "For photos with a romantic, hazy, slightly dusty-rose mood. Softens the image and creates a more dreamy, warm atmosphere."

4. **HONEY** — "For photos you want to give a warm old money mood. Makes the image feel calmer and more visually enveloping."

5. **GOLDEN HOUR** — "For photos you want to give rich golden warmth, a vacation-light feel, and a touch of Morocco. Looks especially beautiful during golden hour, giving the image a beige-golden palette."

6. **FILM HAZE 35mm** — "For photos with a film-like haze, soft glow, and vintage mood. Ideal for bright outdoor shots when you want to add more atmosphere and a 35 mm feel."

7. **ART NOIR** — "For photos that need more artistry, depth, and a stylized mood. Makes the image more graphic and expressive while keeping a vintage cinematic character."

**After all 7 sections:** BUY NOW button (full width, gold, same style as first screen), with current price based on currency toggle state.

**Photos for now:** Use the existing `*_after.jpg` as placeholder — 3 copies of each preset's after photo. User will replace with real example photos later. Data structure allows easy swap.

### Navigation Behavior

- Preset strip at the top (on the First Screen) remains as navigation for the main hero photo — clicking a thumbnail changes the hero photo only (current behavior).
- "See usage examples ↓" link scrolls to `#usage-examples` anchor.
- Each Usage Examples preset section has a stable anchor: `#preset-nude`, `#preset-fashion`, etc. (not used for auto-navigation in this phase — future enhancement).
- Second BUY NOW button and currency toggle state must stay synchronized with the first screen's state (shared JS state or single source of truth via a currency store).

## Data Model Changes

Extend `src/data/presets.ts`:

```typescript
export interface Preset {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;        // NEW: JTBD description
  examplePhotos: string[];    // NEW: array of 3 example photo paths
}
```

Add to each preset object: the JTBD `description` and an `examplePhotos` array with 3 paths (using existing after images as placeholders).

Also add display order metadata — the Usage Examples order is different from the preset strip order. Use a separate exported array:

```typescript
export const usageExamplesOrder = [
  'nude', 'fashion', 'dreamy-mood', 'honey',
  'golden-hour', 'film-haze', 'art-noir'
];
```

## Component Structure

**New components:**
- `src/components/IntroHero.astro` — intro section with quote + Vimeo video
- `src/components/UsageExample.astro` — single preset gallery (name, 3 photos, description)

**Modified files:**
- `src/pages/presets/index.astro` — add new sections, insert anchor link on first screen
- `src/data/presets.ts` — extend data model with descriptions and example photos
- `src/data/presets.ts` — add page content for intro quote and section labels/descriptions

## Assets Required

- `public/images/demos/how-it-works.gif` — placeholder for now
- `public/images/demos/how-to-install.gif` — placeholder for now
- (Future) `public/images/presets/examples/{preset-id}-{1,2,3}.jpg` — real example photos

## Technical Notes

- Vimeo `background=1` mode plays video silently, looping, no controls — perfect for showreel
- GIFs with `loading="lazy"` and `decoding="async"` for performance
- Currency toggle state on second BUY NOW must match first: use single data source and query both buttons on toggle
- Smooth scroll behavior already enabled in `html { scroll-behavior: smooth }`
- All new sections follow existing page patterns: max-width 600px, Tailwind utilities, `fade-in` class for scroll animations

## Out of Scope (Future)

- Real example photos (user will add later)
- Real demo GIFs (user will record later)
- Synchronized scrolling between top preset strip and Usage Examples sections
- Lightbox for example photos
