/* ==========================================================================
   ROAND — Behavior layer
   ---------------------------------------------------------------------------
   Architecture: each scroll-driven scene owns exactly one clock (a single
   rAF-throttled scroll handler) and writes only CSS custom properties or
   toggles classes on threshold-cross — it never fights another module for
   the same property. Every module checks prefers-reduced-motion before it
   attaches a single listener; the CSS reduced-motion contract in styles.css
   is the real safety net, so JS modules simply stand down rather than
   duplicate that work.

   Modules:
     - initProgressBar   fixed top scroll-progress hairline
     - initCornerMark    persistent wordmark, shown once the hero is passed
     - initReveals       one-shot IntersectionObserver entrance reveals
     - initParallaxMovers  lerped drift for simple single-layer movers
     - initHeroEngine    the signature hero scrub (--bx/--wx/--dx/--ax/--cue)
     - initNotesEngine   scent-pyramid pin scrub (--p, active third)
     - initBottleEngine  bottle pin scrub (--p, active quarter)
     - initMagneticButton  fine-pointer-only CTA pull
   ========================================================================== */
(function () {
  "use strict";

  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fineMQ = window.matchMedia("(hover: hover) and (pointer: fine)");

  const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
  const remap = (p, a, b) => clamp01((p - a) / (b - a));

  /** Scroll fraction (0→1) across a tall section's own pin/scrub range. */
  function pinProgress(el) {
    const rect = el.getBoundingClientRect();
    const span = el.offsetHeight - window.innerHeight;
    return span > 0 ? clamp01(-rect.top / span) : 0;
  }

  /* ---------------------------------------------------------------- */
  /* Fixed chrome                                                      */
  /* ---------------------------------------------------------------- */
  function initProgressBar() {
    const bar = document.getElementById("progressBar");
    if (!bar) return;
    let ticking = false;

    function frame() {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", frame, { passive: true });
    frame();
  }

  function initCornerMark() {
    const hero = document.getElementById("hero");
    const mark = document.getElementById("cornerMark");
    if (!hero || !mark || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) mark.classList.toggle("is-visible", !e.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(hero);
  }

  /* ---------------------------------------------------------------- */
  /* Generic one-shot entrance reveals (PinnedReveal / KineticHeadline) */
  /* ---------------------------------------------------------------- */
  const REVEAL_SELECTOR =
    ".chapter, .cta, .experience__copy, .bottle-scene__pin, .notes-scene__pin, .notes-scene__group";

  function initReveals() {
    const targets = document.querySelectorAll(REVEAL_SELECTOR);
    if (reduceMQ.matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------- */
  /* Lerped single-layer parallax (Essence line, Experience planes)    */
  /* One rAF loop, cached centers, transform-only — mobile-motion.md.  */
  /* ---------------------------------------------------------------- */
  function initParallaxMovers() {
    if (reduceMQ.matches) return null;
    const els = [...document.querySelectorAll("[data-parallax]")];
    if (!els.length) return null;

    const movers = els.map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallax) || 0.15,
      center: 0,
      cur: 0,
      target: 0,
    }));

    function measure() {
      const sy = window.scrollY;
      for (const m of movers) {
        const r = m.el.getBoundingClientRect();
        m.center = r.top + sy + r.height / 2;
      }
    }
    measure();

    let running = false;
    function frame() {
      const sy = window.scrollY;
      const vh2 = window.innerHeight / 2;
      let settling = false;
      for (const m of movers) {
        if (m.el.offsetParent === null) continue;
        m.target = (sy + vh2 - m.center) * m.speed;
        m.cur += (m.target - m.cur) * 0.12;
        m.el.style.transform = "translate3d(0," + m.cur.toFixed(2) + "px,0)";
        if (Math.abs(m.target - m.cur) > 0.1) settling = true;
      }
      if (settling) requestAnimationFrame(frame);
      else running = false;
    }
    function onScroll() {
      if (!running) { running = true; requestAnimationFrame(frame); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return { teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    } };
  }

  /* ---------------------------------------------------------------- */
  /* HERO — the signature moment. One clock, five derived properties.  */
  /* Fully reversible for free: every value is a pure function of p.   */
  /* ---------------------------------------------------------------- */
  function initHeroEngine() {
    const hero = document.getElementById("hero");
    const copy = hero && hero.querySelector(".hero__copy");
    if (!hero || !copy) return null;
    if (reduceMQ.matches) return null; // CSS forces the resolved static state

    let ticking = false;
    let headlineIn = false;

    function frame() {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const span = hero.offsetHeight - window.innerHeight;
      const p = span > 0 ? clamp01(-rect.top / span) : 0;

      const bx = remap(p, 0.08, 0.34); // bottle rise + scale
      const wx = remap(p, 0.12, 0.42); // wordmark recedes
      const dx = remap(p, 0.30, 0.64); // void → ivory crossfade
      const ax = remap(p, 0, 0.30);    // atmosphere glow ramps in
      const cue = 1 - remap(p, 0, 0.08); // scroll cue fades almost immediately

      hero.style.setProperty("--bx", bx.toFixed(4));
      hero.style.setProperty("--wx", wx.toFixed(4));
      hero.style.setProperty("--dx", dx.toFixed(4));
      hero.style.setProperty("--ax", ax.toFixed(4));
      hero.style.setProperty("--cue", cue.toFixed(4));

      // Discrete, hysteresis-gated so a jitter near the threshold can't flicker.
      if (!headlineIn && p >= 0.55) { headlineIn = true; copy.classList.add("is-in"); }
      else if (headlineIn && p < 0.50) { headlineIn = false; copy.classList.remove("is-in"); }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();

    return { teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    } };
  }

  /* ---------------------------------------------------------------- */
  /* THE NOTES — scent pyramid. One clock: thread growth + active third*/
  /* ---------------------------------------------------------------- */
  function initNotesEngine() {
    const scene = document.getElementById("notes");
    if (!scene) return null;
    if (reduceMQ.matches) return null; // CSS shows all three groups statically

    const groups = [...scene.querySelectorAll(".notes-scene__group")];
    let ticking = false;
    let activeIndex = -1;

    function frame() {
      ticking = false;
      const p = pinProgress(scene);
      scene.style.setProperty("--p", p.toFixed(4));

      const idx = Math.min(2, Math.floor(p * 3));
      if (idx !== activeIndex) {
        activeIndex = idx;
        groups.forEach((g, i) => g.classList.toggle("is-active", i === idx));
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();

    return { teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    } };
  }

  /* ---------------------------------------------------------------- */
  /* THE BOTTLE — the object as the scene. One clock: pose + captions. */
  /* ---------------------------------------------------------------- */
  function initBottleEngine() {
    const scene = document.getElementById("bottle");
    if (!scene) return null;
    if (reduceMQ.matches) return null; // CSS rests the bottle in its static pose

    const captions = [...scene.querySelectorAll(".bottle-scene__caption")];
    const glows = [...scene.querySelectorAll(".bottle-scene__glow")];
    let ticking = false;
    let activeIndex = -1;

    function frame() {
      ticking = false;
      const p = pinProgress(scene);
      scene.style.setProperty("--p", p.toFixed(4));

      const idx = Math.min(3, Math.floor(p * 4));
      if (idx !== activeIndex) {
        activeIndex = idx;
        captions.forEach((c, i) => c.classList.toggle("is-active", i === idx));
        glows.forEach((g, i) => g.classList.toggle("is-active", i === idx));
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    frame();

    return { teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    } };
  }

  /* ---------------------------------------------------------------- */
  /* Magnetic CTA — fine pointer only; settles with the playful ease.  */
  /* ---------------------------------------------------------------- */
  function initMagneticButton() {
    const btn = document.querySelector("[data-magnetic]");
    if (!btn || !fineMQ.matches || reduceMQ.matches) return;

    btn.addEventListener("pointermove", (ev) => {
      const r = btn.getBoundingClientRect();
      const dx = (ev.clientX - r.left) / r.width - 0.5;
      const dy = (ev.clientY - r.top) / r.height - 0.5;
      btn.style.setProperty("--ease-tilt", "var(--ease-reveal)");
      btn.style.transform = "translate(" + (dx * 16).toFixed(1) + "px," + (dy * 16).toFixed(1) + "px)";
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.setProperty("--ease-tilt", "var(--ease-playful)");
      btn.style.transform = "translate(0,0)";
    });
  }

  /* ---------------------------------------------------------------- */
  /* Boot + reduced-motion re-sync for the three scrubbed scenes.      */
  /* Mirrors the component library's own sync() pattern: on a live     */
  /* preference change, tear down and re-evaluate rather than guess.   */
  /* ---------------------------------------------------------------- */
  function boot() {
    initProgressBar();
    initCornerMark();
    initReveals();
    let parallaxCtl = initParallaxMovers();
    initMagneticButton();

    let heroCtl = initHeroEngine();
    let notesCtl = initNotesEngine();
    let bottleCtl = initBottleEngine();

    reduceMQ.addEventListener("change", () => {
      heroCtl && heroCtl.teardown && heroCtl.teardown();
      notesCtl && notesCtl.teardown && notesCtl.teardown();
      bottleCtl && bottleCtl.teardown && bottleCtl.teardown();
      parallaxCtl && parallaxCtl.teardown && parallaxCtl.teardown();

      heroCtl = initHeroEngine();
      notesCtl = initNotesEngine();
      bottleCtl = initBottleEngine();
      parallaxCtl = initParallaxMovers();
    });

    // Re-measure once webfonts land — Cormorant/EB Garamond can reflow
    // section heights, which the pin engines size themselves against.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => window.dispatchEvent(new Event("resize")));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
