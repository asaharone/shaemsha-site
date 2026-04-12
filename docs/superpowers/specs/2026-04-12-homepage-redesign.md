# Homepage Redesign — Design Spec

## Overview

Redesign the homepage as a minimal router that directs visitors to one of three business verticals. Each vertical is represented by a full-bleed card with B&W photo/video background, short description, and CTA button. Clicking through leads to the respective page where the same visual appears in color.

## Site Architecture (New)

```
shaemsha.com/           → Homepage router (this spec)
shaemsha.com/ugc/       → UGC · PR · Content (new page, replaces /collaborate/)
shaemsha.com/production/ → Video Production (existing, to be updated separately)
shaemsha.com/presets/    → Presets shop (existing, already built)
```

**Pages removed:**
- `/work/` — video portfolio moves into /production/ and /ugc/
- `/about/` — bio moves into footer or individual pages
- `/collaborate/` — replaced by /ugc/
- `/contact/` — forms live on each page
- `/shop/` — already replaced by /presets/

## Homepage Layout

### Mobile (default)

```
┌─────────────────────┐
│    SHAEMSHA (nav)    │
├─────────────────────┤
│  ┌─────────────────┐│
│  │  B&W photo/video ││
│  │                  ││
│  │  UGC · PR ·     ││
│  │  Content         ││
│  │  (description)   ││
│  │  [CTA Button]    ││
│  └─────────────────┘│
├─────────────────────┤
│  ┌─────────────────┐│
│  │  B&W photo/video ││
│  │                  ││
│  │  Video           ││
│  │  Production      ││
│  │  (description)   ││
│  │  [CTA Button]    ││
│  └─────────────────┘│
├─────────────────────┤
│  ┌─────────────────┐│
│  │  B&W photo/video ││
│  │                  ││
│  │  Presets         ││
│  │  (description)   ││
│  │  [CTA Button]    ││
│  └─────────────────┘│
├─────────────────────┤
│      Footer         │
└─────────────────────┘
```

### Desktop (md+)

```
┌───────────────────────────────────────┐
│           SHAEMSHA (nav)              │
├──────────────────┬────────────────────┤
│                  │                    │
│  UGC · PR ·      │  Video             │
│  Content         │  Production        │
│  (ч/б)           │  (ч/б)             │
│  [CTA]           │  [CTA]             │
│                  │                    │
├──────────────────┴────────────────────┤
│                                       │
│         Presets (ч/б)                 │
│         [CTA]                         │
│                                       │
├───────────────────────────────────────┤
│              Footer                   │
└───────────────────────────────────────┘
```

## Card Design

Each of the 3 cards follows the same pattern:

### Visual
- **Background:** Full-bleed B&W (grayscale CSS filter) photo or looping video
- **Overlay:** Dark gradient overlay from bottom for text readability
- **On hover (desktop):** Subtle brightness increase or slight scale

### Content (overlaid on the image, bottom-aligned)
- **Title:** Large serif text (Cormorant Garamond), white
  - Card 1: "UGC · PR · Content" (or "UGC · PR" if too long)
  - Card 2: "Video Production"
  - Card 3: "Presets"
- **Description:** 1 sentence, small sans-serif, white/muted
  - Card 1: "Cinematic content, brand storytelling, and influencer collaborations"
  - Card 2: "Commercials, brand films, and fashion campaigns"
  - Card 3: "Professional Lightroom presets for cinematic color grading"
- **CTA Button:** Outlined or filled, gold accent
  - Links to respective page

### B&W → Color Transition
When the user clicks a card and arrives at the destination page:
- The same photo/video appears at the top of that page, but in **full color**
- This creates a visual continuity and "reveal" effect
- Implementation: use the same image file, apply `grayscale(1)` CSS filter on homepage, no filter on destination page

## Navigation

### Desktop Nav
```
SHAEMSHA          UGC · PR · Content    Production    Presets
(logo/home)       (link)                (link)         (link)
```

### Mobile Nav
- Hamburger menu → fullscreen overlay (existing pattern)
- Links: UGC · PR · Content, Production, Presets
- Social links at bottom (existing)

**Removed from nav:** Work, Collaborate, About, Contact, Book button

## Footer

Minimal footer for homepage:
- SHAEMSHA logo
- One-line bio: "Videographer · Photographer · Director — Cyprus"
- Social links row (Instagram, Telegram, Vimeo, Email)
- Copyright

No navigation links in footer (homepage IS the navigation).

## Card Sizing

### Mobile
- Each card: full width, approximately 40vh height (enough for photo + text overlay)
- All 3 cards stack vertically, total page ~120vh + nav + footer
- User scrolls through all 3

### Desktop
- Top 2 cards: 50% width each, ~50vh height
- Bottom card (Presets): full width, ~35vh height
- Total page fits in ~1 screen + footer (minimal scrolling)

## Assets Required

For each card, one of:
- A hero photo (will be displayed B&W on homepage, color on destination page)
- Or a short looping video (same treatment)

**Card 1 (UGC):** Use existing hero.jpg or a new UGC/collaboration photo
**Card 2 (Production):** Frame from showreel or production still
**Card 3 (Presets):** One of the preset after photos (e.g., nude_after.jpg)

For now, use existing images as placeholders. The B&W filter is CSS-only.

## Technical Notes

- Static Astro page, no JS needed for homepage (CSS-only hover effects)
- `filter: grayscale(1)` for B&W effect, `transition: filter 0.3s` for hover
- Grid layout: `grid-cols-2` for top row on desktop, full width for presets row
- Each card is an `<a>` tag wrapping the entire card area (large click target)
- Lazy loading for images below the fold
- Video backgrounds (if used): `<video autoplay muted loop playsinline>` with poster image fallback

## File Changes

- **Rewrite:** `src/pages/index.astro` — complete rewrite as router
- **Modify:** `src/components/Nav.astro` — update links, remove old items
- **Modify:** `src/components/Footer.astro` — simplify for homepage context
- **Create:** `src/pages/ugc/index.astro` — new UGC page (separate spec)
- **Delete:** `src/pages/work/index.astro`
- **Delete:** `src/pages/about.astro`
- **Delete:** `src/pages/contact.astro`

Note: The UGC page and Production page updates are separate specs. This spec covers only the homepage redesign.

## Out of Scope

- UGC page content and layout (separate spec)
- Production page updates (separate spec)
- Presets page (already built)
- SEO/meta tags optimization
- Analytics/tracking setup
