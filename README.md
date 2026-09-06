# NOIRÉ — Cinematic 3D Microsite

A production-oriented scroll-driven perfume microsite built with semantic HTML, CSS and vanilla JavaScript using Three.js only for the WebGL scene. The supplied `assets/perfume_bottle.glb` is loaded as the hero object.

## Run locally
Because ES modules and GLB loading require HTTP, serve the folder rather than opening `index.html` directly:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Architecture
- `index.html` — semantic scene, navigation, narrative beats and catalog.
- `style.css` — design tokens, responsive layout, cinematic layers and reduced-motion mode.
- `app.js` — deterministic scroll timeline, Three.js scene, pointer parallax and accessible catalog rail.
- `assets/perfume_bottle.glb` — supplied 3D perfume model.

## Timeline
| Progress | Beat |
|---|---|
| 0.00–0.03 | Hero hold |
| 0.03–0.18 | Intro exits |
| 0.15–0.25 | Portal split + camera push |
| 0.25–0.44 | Narrative A |
| 0.44–0.48 | Panorama reset |
| 0.48–0.74 | Narrative B |
| 0.75–0.96 | Collection rail |
| 0.91–1.00 | Controls/final settle |

## Asset manifest
| Role | File | Dimensions / geometry | Anchor | Depth |
|---|---|---|---|---|
| 30 Hero object | `assets/perfume_bottle.glb` | GLB, 26.7 MB; 2 meshes / 7 nodes / 2 materials; no embedded animation | centered, normalized from bounding box | 30 |
| 00 Background plate | CSS world | viewport | center | 0 |
| 10 Distant landscape | CSS horizon | viewport | bottom-center | 10 |
| 20 Midground | CSS horizon/ground | viewport | bottom-center | 20 |
| 40/41 Foreground occluders | CSS portal panels | viewport + bleed | left/right edges | 40/41 |
| 50 Frame | CSS vignette/grain | viewport + bleed | center | 50 |

## Production notes
- The supplied GLB is relatively heavy at ~26.7 MB. For production, export a web-optimized GLB (Draco/Meshopt where compatible, reduced texture resolution, and only required material maps). Do not ship the master unchanged on mobile.
- The GLB contains no animation clips, so the cinematic opening is driven by camera, transform and foreground choreography. If a physically opening cap/door animation is desired, the model should be authored with separate parts or an animation clip.
- CSS background layers are intentional placeholders for atmospheric depth. They are named by role and can be replaced by real 00/10/20/40/41/50 assets without changing the timeline engine.
