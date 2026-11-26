# DMC – Gospel & World History

A lightweight installable web app / PWA for Disciple Making Community.

## Included in this first saved version
- Home, Gospel, World History, Timeline, Maps, Seven Wonders, Library, Updates and Admin sections.
- Starter study notes with Bible references and historical context.
- Interactive map using Leaflet and OpenStreetMap tiles, including biblical/ancient places and the Seven Wonders.
- Local article search and an Admin form that stores custom entries in the current browser using localStorage.
- Share/copy link controls and a basic service worker for caching the app shell.

## Run locally
Open `index.html` in a local web server, or deploy this repository as a static site on Vercel/GitHub Pages. For PWA installation, serve over HTTPS.

## Important limitations
- Admin-created articles are stored only on the current device/browser. There is no shared account, cloud database, moderation, or synchronization yet.
- Online map tiles and Internet search require a connection. The app shell may load offline after first visit, but external map tiles do not.
- The manifest has no icon yet. Add the icon artwork when supplied.
- This repository contains the web/PWA source, not a compiled Android APK. An APK can be produced later by wrapping the hosted PWA with an Android packaging workflow (for example, Trusted Web Activity) and signing it.
- Starter history entries are brief educational summaries, not a complete encyclopedia. Verify dates and debated historical claims against reputable sources before publication.

## Publishing
Import this GitHub repository into Vercel and deploy it as a static site. The public URL will make the app searchable/shareable once indexed, but search-engine indexing is not immediate or guaranteed. Add a custom domain and submit the sitemap to search engines when ready.

## Project
Disciple Making Community (DMC) — “Go and make disciples”.
