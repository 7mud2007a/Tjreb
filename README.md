# VERSACE EROS — Immersive 3D v2

Standalone cinematic scroll experience. The supplied fragrance photo is stored at `assets/eros-reference.jpg` as the visual reference used for the procedural prototype.

## Run
Serve the folder over HTTP:
`python3 -m http.server 8080`
Then open `http://localhost:8080`.

## Signature interaction
Closed architectural door → scroll-controlled hinged opening → intense threshold light → camera advances → bottle emerges from darkness → controlled 3D rotation → bottle settles at a readable hero distance.

The bottle is procedural. For a photoreal production version, replace `createBottle()` with an authorized `.glb/.gltf` model and keep the existing scroll transform hooks.
