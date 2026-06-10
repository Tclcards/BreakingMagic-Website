# Breaking Magic — Website

The public website for **Breaking Magic LLC**, a live card-breaking collective.
Built with Next.js and Tailwind CSS; deploys to Vercel with zero configuration.

## Pages

| Page | Path | Purpose |
| --- | --- | --- |
| Home | `/` | The recruitment pitch with the split-lockup hero |
| For Streamers | `/streamers` | The full offer, expectations, and FAQ |
| How It Works | `/how-it-works` | The six-step operational model |
| About | `/about` | The story, values, and legitimacy block |
| Apply | `/apply` | The application form (primary conversion) |
| Privacy / Terms | `/privacy`, `/terms` | Placeholder structure for real legal copy |

## Two things to do before launch

1. **Connect the application form.** Open `lib/config.ts` and paste a form
   endpoint URL (Formspree's free tier works — instructions are in the file).
   Until then, the form shows applicants a fallback email address.
2. **Replace the placeholder facts.** Search the project for `TODO` to find
   every placeholder: stats on the home page, split percentages, payout
   cadence, social links, contact email, the production domain in
   `lib/site.ts`, and the legal page copy.

## Working on the site

```bash
npm install     # once
npm run dev     # local preview at http://localhost:3000
npm run build   # production build (also catches errors)
```

Brand assets (lockups, wordmark, profile marks, extracted from the brand
guide) live in `public/brand/`. Brand colors and fonts are defined once in
`app/globals.css`; the signature gold rip lives in `components/Rip.tsx`.
