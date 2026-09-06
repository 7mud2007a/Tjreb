# ROAND / VERSACE EROS — Motion Plan

## Signature moment

**Closed black door → door opens with scroll → intense light floods the scene → camera advances → bottle exits the doorway → bottle rotates → bottle reaches a hero position.**

The scroll is the master timeline. It does not merely reveal DOM sections.

## Timeline

| Progress | Scene | Main transformation |
|---|---|---|
| 0.00–0.10 | Darkness | Closed door, distant camera |
| 0.10–0.20 | Opening | Door leaves rotate, light rises |
| 0.20–0.30 | Threshold | Camera advances, intro copy exits |
| 0.30–0.55 | Reveal | Bottle emerges and starts 360° rotation |
| 0.55–0.72 | Approach | Bottle grows, camera moves closer |
| 0.72–1.00 | Hero hold | Light settles, particles move around product |

## Skill principles used

- Direct scrub for spatial transformations.
- A single GSAP ScrollTrigger timeline owns the hero scene.
- Three.js is the single renderer.
- Transform/opacity are preferred for DOM animation.
- DPR is capped to avoid runaway GPU cost.
- Mobile particle count is reduced.
- `prefers-reduced-motion` removes the heavy pinned choreography.
- The scene has a static readable DOM fallback underneath the canvas.
