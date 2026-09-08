# AURELIS — Cinematic 3D Scroll

A one-page cinematic product experience built as a dependency-light static site.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy to Render

Create a **Static Site** from this GitHub repo.
- Build Command: leave empty
- Publish Directory: `.`

The included `render.yaml` can also be used with a Render Blueprint.

## Stack

- Vanilla HTML/CSS/JS
- Three.js `0.160.0` (pinned CDN import map)
- GSAP `3.12.5` + ScrollTrigger `3.12.5`
- Procedural geometry, so no GLB/image asset is required for the core 3D experience
- Responsive and reduced-motion fallbacks
