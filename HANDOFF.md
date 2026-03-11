# Sunrise Cafe & Bakery — Site Handoff

## What was built

A single-page marketing website for **Sunrise Cafe & Bakery**, a brunch café at 2847 S Lamar Blvd, Austin TX 78704. Static HTML/CSS/JS — no framework, no build step, no backend.

---

## File structure

```
sunrise-cafe/
├── index.html               # All page content (single page)
├── styles.css               # All styling + responsive breakpoints
├── script.js                # Menu filter, testimonial slider, scroll animations, mobile nav
├── favicon.svg              # SVG favicon (orange sunrise icon, brand color #e8913a)
├── favicon.ico              # Drop a .ico here for legacy browser support (see below)
└── images/
    ├── hero/
    │   └── cafe-exterior.webp
    ├── interior/
    │   ├── cafe-interior-cozy.webp
    │   └── cafe-interior-rustic.webp
    ├── gallery/
    │   └── fresh-produce-market.webp
    ├── menu_bakery/
    │   └── croissants.webp
    ├── menu_brunch/
    │   ├── avocado-toast.webp
    │   └── blueberry-pancakes.webp
    └── menu_drinks/
        └── latte-art.webp
```

---

## Sections

| Section          | ID                | Notes                                                   |
| ---------------- | ----------------- | ------------------------------------------------------- |
| Navigation       | `#navbar`         | Sticky, collapses to hamburger on mobile                |
| Hero             | `#hero`           | Full-width image, animated headline, two CTA buttons    |
| About            | `#about`          | Two-column layout with interior photo and feature icons |
| Menu             | `#menu`           | Filterable card grid (All / Brunch / Bakery / Drinks)   |
| Gallery          | `#gallery`        | CSS grid photo layout, 6 images                         |
| Reviews          | `#testimonials`   | Auto-advancing slider, arrow + dot navigation           |
| Hours & Location | `#hours-location` | Google Maps embed + hours/contact cards                 |
| Newsletter       | `#contact`        | Email capture via Formspree                             |
| Footer           | —                 | Brand info, quick links, social icons                   |

---

### 2. Formspree (newsletter form)

The form action is currently a placeholder:

```html
action="https://formspree.io/f/{form_id}"
```

1. Sign up free at [formspree.io](https://formspree.io)
2. Create a form, copy the ID (e.g. `xpznkgvb`)
3. Replace `{form_id}` with that ID in `index.html`

### 3. Square Online ordering

All "Order Online" buttons point to `https://squareup.com/us/en`.
Replace with the actual Square storefront URL from the Square Dashboard → Online Store.

## Business info on the site

|           |                                     |
| --------- | ----------------------------------- |
| Address   | 2847 S Lamar Blvd, Austin, TX 78704 |
| Phone     | (512) 555-0147                      |
| Instagram | @sunrisecafeatx                     |
| Mon – Thu | 7 AM – 3 PM                         |
| Friday    | 7 AM – 4 PM                         |
| Saturday  | 8 AM – 4 PM                         |
| Sunday    | 8 AM – 2 PM                         |

---

_Static site. No dependencies, no build tools. To make changes: edit `index.html`, `styles.css`, or `script.js` directly, then redeploy to Netlify._
