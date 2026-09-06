# VERSACE EROS — Experimental Immersive 3D Scroll

This is a standalone experimental website built around the uploaded **cinematic-scroll** skill principles:
- pinned/scroll-driven storytelling
- one scroll clock
- direct scrubbing for spatial movement
- selective motion
- responsive degradation
- reduced-motion fallback
- Three.js renderer with capped DPR
- cinematic reveal / parallax / atmosphere

## Run

Because the page uses ES modules, serve it through a local HTTP server instead of opening `index.html` directly.

### Python
```bash
python3 -m http.server 8080
```

Then open:
http://localhost:8080

### Node
Any static server works too.

## Main files

- `index.html` — complete page structure
- `styles.css` — premium editorial styling
- `app.js` — Three.js scene + GSAP/ScrollTrigger + Lenis
- `docs/MOTION-PLAN.md` — scene timeline and implementation notes

## 3D bottle

The bottle is procedural so the demo works without a GLB.

To replace it later with a real model:
1. Put `roand-bottle.glb` (or another model) in `assets/models/`.
2. Replace `createBottle()` in `app.js` with `GLTFLoader`.
3. Keep the same `bottle` group name and transform hooks so the existing scroll choreography continues to work.

## Note

The current demo uses the requested **VERSACE EROS** name only as a visual prototype. Replace the brand/name and use authorized assets for a production/commercial deployment.
