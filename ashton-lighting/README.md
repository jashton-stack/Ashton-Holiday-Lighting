# Ashton Holiday Lighting

Omaha's premier Govee permanent outdoor lighting installer.

## Stack
- React 18 + TypeScript
- Vite
- Deployed on Netlify

## Setup

```bash
npm install
npm run dev
```

## Add Photos

Drop your images into `public/images/` — they're already referenced in `App.tsx`:

- `public/images/IMG_7323.jpeg`
- `public/images/IMG_6792.jpeg`
- `public/images/IMG_6807.jpeg`
- `public/images/IMG_6874.jpeg`
- `public/images/IMG_6879.jpeg`

## Build & Deploy

```bash
npm run build
```

Netlify auto-deploys on push to `main`. Build command: `npm run build`, publish dir: `dist`.

## Integrations

- **Booking calendar**: GoHighLevel calendar embed (Calendar ID in `App.tsx`)
- **Contact form**: Posts directly to GHL Contacts API
