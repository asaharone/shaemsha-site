# SHAEMSHA Presets Shop — Design Spec

## Overview

A fully functional shop page at `/presets/` (replacing the current `/shop/` "Coming Soon" placeholder) for selling the "SHAEMSHA Presets 01" pack — 7 Lightroom presets delivered digitally via email after payment.

The page is mobile-first, optimized for Instagram funnel traffic. Two payment channels serve different audiences: LemonSqueezy (USD, international) and Plata by Mono (UAH, Ukrainian).

## Product Details

- **Name:** SHAEMSHA Presets 01
- **Contents:** 7 Lightroom presets (.dng for Mobile + .xmp for Desktop)
- **Price USD:** $15.90 (via LemonSqueezy)
- **Price UAH:** 690₴ (via Plata by Mono)
- **Delivery:** Email with download link (both channels)

### Preset Names & Photos

Each preset has a before/after photo pair located in `public/images/presets/`:

| Preset | Before File | After File |
|--------|------------|------------|
| NUDE | nude_before.jpg | nude_after.JPG |
| DREAMY MOOD | dreamy_mood_before.jpg | dreamymood_after.jpg |
| GOLDEN HOUR | goldenhour_before.jpg | goldenhour_after.JPG |
| FASHION | fashoin_before.jpg | fashion_after.jpg |
| ART NOIR | ART_noir_before.JPG | art_noir_after.JPG |
| FILM HAZE 35mm | film_haze_before.jpg | film_haze_after.jpg |
| HONEY | honey_before.JPG | IMG_6605.JPG (rename to honey_after.JPG) |

Source photos: `/Users/macos/Documents/SHAEMSHA/photo_for_web_shaemsha/`
Copy to: `public/images/presets/` (optimized for web)

## Page Structure (Mobile-First)

### First Screen (No Scroll)

Everything needed for purchase is visible without scrolling:

1. **Header** — "SHAEMSHA Presets 01" + "7 presets · Lightroom Mobile & Desktop"
2. **Main Photo** — Full-width vertical (portrait ~3:4) before/after image with:
   - Preset name label (top-left, gold text on dark blur background)
   - **Pill toggle button** (bottom of photo) — iOS-style toggle with sliding indicator between BEFORE and AFTER. Active state highlighted in gold.
   - **Auto-toggle every 5 seconds** — the toggle switches automatically with a visible animation to demonstrate the before/after difference. Pauses on user interaction, resumes after idle.
3. **Preset Strip** — Horizontal scrollable row of all 7 preset thumbnails. The first preset (NUDE) is selected by default and shown as the main photo. Each thumbnail shows the AFTER version. Tapping a thumbnail:
   - Changes the main photo to that preset's before/after pair
   - Highlights the selected thumbnail with gold outline
   - Resets the auto-toggle timer
4. **Currency Toggle** — Pill switch: USD | UAH. Switches price and payment destination.
5. **Price** — Large gold text: "$15.90" or "690₴"
6. **Buy Button** — Full-width gold button "BUY NOW"
7. **Trust Badges** — "✓ Instant email · ✓ .dng + .xmp · ✓ Mobile & Desktop"

### Below the Fold (After Scroll)

8. **What's Included** — 3 items with checkmark icons:
   - 7 Lightroom Presets (.dng Mobile + .xmp Desktop)
   - Installation Guide (step-by-step for Mobile & Desktop)
   - Instant Email Delivery (download link sent to your email)

9. **How to Install** — 3 steps in a row:
   - Step 1: Buy & receive email
   - Step 2: Download .dng files
   - Step 3: Import to Lightroom

10. **FAQ** — Accordion (details/summary), questions:
    - Do these work on iPhone?
    - Can I use on Android?
    - How many photos can I edit?
    - Do I need the paid version of Lightroom?
    - Can I get a refund?
    - Will I receive updates?

11. **Second CTA** — "BUY NOW — $15.90" (or 690₴ based on toggle state)

### Desktop Adaptation

On desktop (md+), the page centers content at max-width ~600px to maintain the mobile-first vertical feel. No two-column layout — the same single-column flow scales up with more whitespace.

## Payment Architecture

### USD Flow (LemonSqueezy)

1. User clicks "BUY NOW" with USD selected
2. Redirect to LemonSqueezy hosted checkout page
3. LemonSqueezy handles payment, sends email with download link automatically
4. After payment, redirect back to `/presets/thank-you/` page

**Setup required:**
- Create LemonSqueezy account and product
- Configure product with preset files (.dng + .xmp archive)
- Get checkout URL for embedding in the buy button
- Set up success redirect URL

### UAH Flow (Plata by Mono)

1. User clicks "BUY NOW" with UAH selected
2. Redirect to Plata by Mono payment page (create invoice via API)
3. After payment, Mono sends webhook to Cloudflare Worker
4. Worker validates webhook signature, sends email with download link
5. User is redirected to `/presets/thank-you/` page

**Setup required:**
- Plata by Mono merchant account
- Cloudflare Worker with:
  - `POST /api/create-invoice` — creates Mono invoice, returns payment URL
  - `POST /api/mono-webhook` — receives payment confirmation, triggers email
- Email sending via Resend or similar (free tier: 100 emails/day)
- Preset files hosted on Cloudflare R2 (or static URL with obfuscated path)

### Cloudflare Worker Endpoints

```
POST /api/create-invoice
  → Calls Mono API to create invoice (amount: 69000 kopecks, currency: UAH)
  → Returns { paymentUrl: "https://pay.mbnk.biz/..." }

POST /api/mono-webhook
  → Validates X-Sign header (Mono webhook signature)
  → On successful payment: sends email with download link via Resend
  → Stores order in KV (optional, for tracking)
```

### Download Link Strategy

- LemonSqueezy: handled automatically (built-in file delivery)
- Mono: email contains a link to download the preset archive. The link can be:
  - A static obfuscated URL on R2 (simple, sufficient for MVP)
  - A signed URL with expiration (more secure, add later if needed)

## Navigation Changes

- Rename nav link from "Presets" → keep as "Presets" but change href from `/shop/` to `/presets/`
- Update all internal links pointing to `/shop/` → `/presets/`
- The current `src/pages/shop/index.astro` moves to `src/pages/presets/index.astro`
- Homepage preset teaser section links to `/presets/`

## Thank You Page

Simple static page at `/presets/thank-you/`:
- "Thank you for your purchase!"
- "Check your email for the download link."
- "If you don't see it within 5 minutes, check your spam folder."
- Link back to homepage
- Social links (Instagram @shaemsha)

## File Structure

```
src/pages/
  presets/
    index.astro          — Main shop page
    thank-you.astro      — Post-purchase page
public/images/presets/   — Before/after photos (optimized)
```

## Technical Notes

- Site is static (Astro `output: 'static'`, GitHub Pages)
- All payment logic is external (LemonSqueezy hosted checkout, Cloudflare Worker for Mono)
- No server-side rendering needed
- Currency toggle is client-side JS only (switches price display + buy button href)
- Before/after toggle is client-side JS with CSS transitions (crossfade)
- Auto-toggle uses setInterval, pauses on user interaction (click/touch), resumes after 10s idle
- Photos should be optimized for web (compressed, ~200KB max each) before deploying

## Out of Scope (Future)

- Multiple product support (SHAEMSHA Presets 02, masks, etc.)
- User accounts / order history
- Promo codes / discounts
- Analytics / conversion tracking (can add later with simple event tracking)
- Signed/expiring download URLs for Mono flow
