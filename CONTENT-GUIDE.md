# Content Guide — edit the site in 2 minutes, no code

Everything you'd want to change lives in **`src/content/`** as plain text files.
Edit, save, and the site rebuilds. You never touch code.

## Where things live

| Want to change… | Edit this file |
| --- | --- |
| Brand name, nav links, social links, the CTA label | `src/content/site.json` |
| Your booking link (Cal.com / Google / Calendly) | `src/content/site.json` → `booking.bookingUrl` |
| The hero headline / sub / ball label | `src/content/offer.json` → `hero` |
| The 3-step deal | `src/content/offer.json` → `deal` |
| The "Why me" pillars + your bench | `src/content/offer.json` → `whyMe` |
| The "Sound like you?" mirror lines | `src/content/offer.json` → `mirror` |
| Your About story | `src/content/about.json` |

## Rules of thumb
- Keep the quotes and commas exactly as they are — they're part of the format.
- Don't put your email anywhere in these files. It lives **only** as a server
  setting (`CONTACT_EMAIL`) so it never appears on the public site.
- Adding a whole new section/page? That's a new block under
  `src/components/<feature>/` — ask Claude; it's designed to drop in without
  touching the existing blocks.

## Design knobs (optional)
Colors, fonts, spacing, and the scroll-tint strength are all in
`src/styles/global.css` at the top (the `:root` tokens). Change one value, the
whole site stays consistent.
