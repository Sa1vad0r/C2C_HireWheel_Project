# Sunrise Cafe & Bakery — Site Handoff Summary

## Overview

A single-page marketing website for **Sunrise Cafe & Bakery**, a brunch café located at 2847 S Lamar Blvd, Austin TX 78704. The site showcases the menu, gallery, testimonials, hours/location, and a newsletter signup. It is a static site (HTML/CSS/JS only — no backend, no build step required).

---

## File Structure

```
sunrise-cafe/
├── index.html          # All content lives here (single page)
├── styles.css          # All styling
├── script.js           # Menu filtering, testimonial slider, scroll animations, mobile nav
├── favicon.svg         # SVG favicon (orange sunrise icon)
├── favicon.ico         # Place a .ico file here (see Favicon section below)
└── images/
    ├── hero/
    │   └── cafe-exterior.jpg
    ├── interior/
    │   ├── cafe-interior-cozy.jpg
    │   └── cafe-interior-rustic.jpg
    ├── gallery/
    │   └── fresh-produce-market.jpg
    ├── menu_bakery/
    │   └── croissants.jpg
    ├── menu_brunch/
    │   ├── avocado-toast.jpg
    │   └── blueberry-pancakes.jpg
    └── menu_drinks/
        └── latte-art.jpg
```

---

## Features

| Feature | Details |
|---|---|
| Navigation | Sticky navbar with mobile hamburger menu |
| Hero | Full-width image with animated headline and CTA buttons |
| About | Two-column layout with interior image and feature icons |
| Menu | Filterable grid (All / Brunch / Bakery / Drinks) |
| Gallery | CSS grid photo layout |
| Testimonials | Auto-advancing slider with dot navigation |
| Hours & Map | Google Maps embed + hours/contact info cards |
| Newsletter | Formspree-powered email capture form |
| Footer | Brand info, quick links, social icons |

---

## SEO

- **Title:** `Sunrise Cafe & Bakery | Brunch & Fresh Pastries | Austin, TX`
- **Meta description:** Set in `<head>`
- **Open Graph tags:** og:title, og:description, og:image, og:url, og:type — for rich previews on Facebook, WhatsApp, LinkedIn
- **Twitter Card:** summary_large_image — for Twitter/X link previews
- **Canonical URL:** `https://sunrisecafeatx.netlify.app/`

> **After deploying:** If your Netlify URL differs from `sunrisecafeatx.netlify.app`, update the `og:url`, `og:image`, `twitter:image`, and `<link rel="canonical">` values in `index.html`.

---

## Favicon

- `favicon.svg` — SVG favicon, works in all modern browsers (Chrome, Firefox, Safari 14+, Edge)
- For older browsers, add a `favicon.ico` (16×16 or 32×32 PNG converted to .ico):
  1. Open `favicon.svg` in a browser, screenshot or export as PNG
  2. Convert at [favicon.io](https://favicon.io/favicon-converter/) — upload PNG, download `.ico`
  3. Drop `favicon.ico` in the project root alongside `favicon.svg`

---

## Image Compression

Images should be compressed before deploying for faster load times.

**Recommended: [Squoosh.app](https://squoosh.app)** (free, browser-based, no upload limit)
- Format: WebP (best compression) or JPEG at 80% quality
- Target sizes: hero image < 200 KB, other images < 100 KB each

**Alternative: [TinyPNG.com](https://tinypng.com)** — drag and drop, free up to 20 images/month.

After compressing, replace the files in the `images/` folder with the optimized versions.

---

## Forms (Newsletter)

The newsletter form uses [Formspree](https://formspree.io). Currently the action URL contains a placeholder:

```html
action="https://formspree.io/f/{form_id}"
```

To activate it:
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form, copy the form ID (e.g. `xpznkgvb`)
3. In `index.html`, replace `{form_id}` with your actual form ID

---

## Online Ordering

The "Order Online" buttons link to `https://squareup.com/us/en`. To link to the actual Square Online storefront:
1. Log in to Square Dashboard → Online Store
2. Copy your store URL
3. Find all instances of `https://squareup.com/us/en` in `index.html` and replace with the store URL

---

## Deployment (Netlify)

1. Go to [netlify.com](https://netlify.com) and create a free account (no credit card needed)
2. On the dashboard, click **"Add new site" → "Deploy manually"**
3. Drag and drop the entire `sunrise-cafe/` project folder onto the deploy zone
4. Netlify assigns a URL like `random-name.netlify.app`
5. Optional: rename it under **Site settings → Change site name** (e.g. `sunrisecafeatx`)
6. Optional: connect a custom domain under **Domain management**

**After deployment:**
- Update the canonical/OG URLs in `index.html` to match your live URL
- Redeploy by dragging the folder again

---

## Post-Launch Checklist

- [ ] All images load correctly on the live URL
- [ ] Mobile navigation opens/closes properly
- [ ] Menu filter tabs work (All / Brunch / Bakery / Drinks)
- [ ] Testimonial slider auto-advances and responds to dot/arrow clicks
- [ ] Google Maps embed loads
- [ ] Newsletter form submits (check Formspree dashboard for test submissions)
- [ ] "Order Online" links go to the correct Square store
- [ ] Favicon appears in the browser tab
- [ ] OG preview looks correct — test at [opengraph.xyz](https://www.opengraph.xyz) or Facebook Debugger
- [ ] Page loads in < 3 seconds on mobile (test with [PageSpeed Insights](https://pagespeed.web.dev))

---

## Contact Info on the Site

| Field | Value |
|---|---|
| Address | 2847 S Lamar Blvd, Austin, TX 78704 |
| Phone | (512) 555-0147 |
| Instagram | @sunrisecafeatx |
| Hours (Mon–Thu) | 7 AM – 3 PM |
| Hours (Fri) | 7 AM – 4 PM |
| Hours (Sat) | 8 AM – 4 PM |
| Hours (Sun) | 8 AM – 2 PM |

---

*Built March 2026. Static HTML/CSS/JS — no frameworks, no dependencies, no build tools required.*
