# The Garage Flip

Single-page Vite + React marketing site for **thegarageflip.com** — a premium garage cleaning, organizing, and transformation business based in Orlando, FL.

This app lives inside the `Aura-Traveler-Github` repo but builds and deploys completely independently of the Aura Traveler app at the repo root.

## Stack

- Vite 6 + React 18
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Single-file app: `src/App.jsx`

## Local development

```bash
# from apps/garage-flip/
npm install
npm run dev         # http://localhost:3100
npm run build       # outputs to dist/
npm run preview
```

## Deploy (Vercel)

Vercel project settings:

| Setting          | Value               |
| ---------------- | ------------------- |
| Root Directory   | `apps/garage-flip`  |
| Framework Preset | Vite                |
| Build Command    | `npm run build`     |
| Output Directory | `dist`              |
| Install Command  | `npm install`       |

`vercel.json` in this directory mirrors those settings and adds SPA rewrites.

## Structure

```
apps/garage-flip/
├── index.html          # HTML entry (meta tags, structured data)
├── src/
│   ├── main.jsx        # React entry
│   ├── App.jsx         # Single-file site (Nav, Hero, Services, Process, Pricing, Results, FAQ, Footer)
│   └── index.css       # Tailwind + theme tokens
├── vite.config.js
├── vercel.json
└── package.json
```

## Brand

Updates to business info (phone, address, Calendly link, etc.) live in the `BRAND` config at the top of `src/App.jsx`.
