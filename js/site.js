/**
 * ShineX Infra — Modern Interactive & Luxury UX Controller
 */
(function () {
  'use strict';

  // 1. Navigation Controller (Sticky state & Mobile Drawer)
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("open");
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && nav.classList.contains("open")) {
        nav.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
      }
    });
  }

  // Scroll effect on header
  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      nav && nav.classList.add("scrolled");
    } else {
      nav && nav.classList.remove("scrolled");
    }
  }, { passive: true });

  // 2. Luxury Before & After Interactive Slider
  document.querySelectorAll("[data-ba]").forEach(function (el) {
    const after = el.querySelector(".after");
    const line = el.querySelector(".ba-line");
    const range = el.querySelector(".ba-range");
    const handle = el.querySelector(".ba-handle");

    if (!after) return;

    const apply = function (val) {
      val = Math.max(0, Math.min(100, val));
      after.style.clipPath = "inset(0 0 0 " + val + "%)";
      if (line) line.style.left = val + "%";
      if (handle) handle.style.left = val + "%";
      if (range) range.value = val;
    };

    apply(50);

    if (range) {
      range.addEventListener("input", function () {
        apply(this.value);
      });
    }

    // Direct pointer drag interaction
    let isDragging = false;
    const handleDrag = function (e) {
      if (!isDragging) return;
      const rect = el.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const percent = ((clientX - rect.left) / rect.width) * 100;
      apply(percent);
    };

    el.addEventListener("mousedown", function (e) {
      isDragging = true;
      handleDrag(e);
    });

    el.addEventListener("touchstart", function (e) {
      isDragging = true;
      handleDrag(e);
    }, { passive: true });

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleDrag, { passive: true });

    window.addEventListener("mouseup", function () {
      isDragging = false;
    });
    window.addEventListener("touchend", function () {
      isDragging = false;
    });
  });

  // 3. Interactive BHK & Scope Chips on Consultation Form
  const form = document.querySelector("[data-visit-form]");
  if (form) {
    const bhkChips = form.querySelectorAll("[data-chip-bhk]");
    const bhkInput = form.querySelector("input[name='bhk_selected']");
    bhkChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        bhkChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        if (bhkInput) bhkInput.value = chip.dataset.chipBhk;
      });
    });

    const scopeChips = form.querySelectorAll("[data-chip-scope]");
    const scopeInput = form.querySelector("input[name='scope_selected']");
    scopeChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        scopeChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        if (scopeInput) scopeInput.value = chip.dataset.chipScope;
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "";
      const phone = data.get("phone") || "";
      const area = data.get("area") || "Seawoods";
      const bhk = data.get("bhk_selected") || data.get("bhk") || "2 BHK";
      const type = data.get("scope_selected") || data.get("type") || "Design + Civil";
      const society = data.get("society") || "";

      const msg =
        "✨ *ShineX Infra — Site Visit Request*%0A%0A" +
        "👤 *Client:* " + encodeURIComponent(name) + "%0A" +
        "📞 *Contact:* " + encodeURIComponent(phone) + "%0A" +
        "📍 *Location:* " + encodeURIComponent(society ? society + ", " + area : area) + "%0A" +
        "📐 *Home Config:* " + encodeURIComponent(bhk) + "%0A" +
        "🔨 *Scope:* " + encodeURIComponent(type) + "%0A%0A" +
        "_Inquiry dispatched via shinexinfra.com_";

      const box = form.parentElement.querySelector(".success-box") || form.parentElement.querySelector(".success");
      if (box) box.style.display = "block";
      form.style.display = "none";
      window.open("https://wa.me/918080390661?text=" + msg, "_blank");
    });
  }

  // 4. Floating Luxury WhatsApp Concierge Widget
  const conciergeToggle = document.querySelector("[data-concierge-toggle]");
  const conciergeCard = document.querySelector(".concierge-card");
  const conciergeClose = document.querySelector("[data-concierge-close]");

  if (conciergeToggle && conciergeCard) {
    conciergeToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      conciergeCard.classList.toggle("open");
    });

    if (conciergeClose) {
      conciergeClose.addEventListener("click", function (e) {
        e.stopPropagation();
        conciergeCard.classList.remove("open");
      });
    }

    document.addEventListener("click", function (e) {
      if (!conciergeCard.contains(e.target) && !conciergeToggle.contains(e.target)) {
        conciergeCard.classList.remove("open");
      }
    });

    // Quick Inquiry Chips inside Concierge
    document.querySelectorAll("[data-concierge-query]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const queryText = btn.getAttribute("data-concierge-query");
        const encoded = encodeURIComponent(
          "✨ *Hello ShineX Infra Studio,*%0A" +
          "I am reaching out regarding: " + queryText + ".%0A" +
          "Could you please share details and availability?"
        );
        window.open("https://wa.me/918080390661?text=" + encoded, "_blank");
      });
    });
  }

  // 5. Scroll Reveal Animation Trigger
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "40px 0px"
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 6. Architectural Custom Cursor Follower (Desktop Only)
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let cursor = document.querySelector(".custom-cursor");
    let dot = document.querySelector(".custom-cursor-dot");

    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      document.body.appendChild(cursor);
    }
    if (!dot) {
      dot = document.createElement("div");
      dot.className = "custom-cursor-dot";
      document.body.appendChild(dot);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let isVisible = false;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        cursor.classList.add("is-active");
        dot.classList.add("is-active");
      }
    });

    window.addEventListener("mouseleave", function () {
      isVisible = false;
      cursor.classList.remove("is-active");
      dot.classList.remove("is-active");
    });

    // Smooth Spring Render Loop
    function renderCursor() {
      // Lerp cursor ring
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      // Faster lerp for center dot
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      cursor.style.transform = "translate(" + cursorX + "px, " + cursorY + "px) translate(-50%, -50%)";
      dot.style.transform = "translate(" + dotX + "px, " + dotY + "px) translate(-50%, -50%)";

      // Sync ambient studio lighting pool across the textured plaster canvas
      document.documentElement.style.setProperty("--mouse-x", cursorX.toFixed(1) + "px");
      document.documentElement.style.setProperty("--mouse-y", cursorY.toFixed(1) + "px");

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover States
    function bindCursorInteractions() {
      // Drag cursor for sliders
      document.querySelectorAll("[data-cursor='drag'], .ba").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-drag");
          cursor.textContent = "DRAG ⟷";
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-drag");
          cursor.textContent = "";
        });
      });

      // Explore cursor for cards and case studies
      document.querySelectorAll("[data-cursor='explore'], .card, .featured-showcase, .portfolio-card").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-explore");
          cursor.textContent = "EXPLORE ↗";
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-explore");
          cursor.textContent = "";
        });
      });

      // Subtle hover for buttons & links
      document.querySelectorAll("a:not(.card):not(.featured-showcase), button:not(.timeline-nav-btn):not(.swatch-btn), .btn, .chip").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-hover");
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-hover");
        });
      });
    }

    bindCursorInteractions();
  }

  // 7. Subtle Smooth Parallax on Scroll
  const parallaxImages = document.querySelectorAll(".parallax-img");
  if (parallaxImages.length) {
    let ticking = false;

    function updateParallax() {
      const vh = window.innerHeight;
      parallaxImages.forEach(function (img) {
        const rect = img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const centerDelta = (rect.top + rect.height / 2) - (vh / 2);
          const percent = centerDelta / vh; // approx -0.5 to 0.5
          const translateY = percent * 24 - 8; // subtle 24px float offset
          img.style.transform = "translateY(" + translateY + "%)";
        }
      });
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }

  // 8. Interactive Tactile Material Swatch Library (Studio Page)
  const swatchWrap = document.querySelector(".swatch-library-wrap");
  if (swatchWrap) {
    const swatches = {
      kota: {
        title: "01. Polished & Flamed Kota Stone",
        origin: "Rajasthan & Gujarat Quarry · Monolithic Slab",
        desc: "A high-density calciferous limestone prized for high compressive strength and naturally cool surface temperatures in humid coastal climates like Navi Mumbai. Finished with hand-honed chamfered edges for seamless wet-area transitions.",
        badge: "Flooring & Thresholds · 20mm Sawn",
        img: "../assets/00-textures/00-kota-stone.jpg",
        specs: [
          { label: "Water Absorption", val: "< 0.4%" },
          { label: "Surface Finish", val: "River Washed / Honed" },
          { label: "Application", val: "Baths, Balconies, Foyer" },
          { label: "Durability", val: "30+ Year Lifecycle" }
        ]
      },
      veneer: {
        title: "02. Fluted Natural American White Oak",
        origin: "Sustainable Hardwood · Quarter-Sawn Architectural Veneer",
        desc: "Warm linear fluting designed to absorb flutter echoes in open-concept living salons. Factory cold-pressed on marine-grade BWR ply with low-sheen organic polyurethane to highlight natural grain variation without synthetic yellowing.",
        badge: "Architectural Joinery · Custom Fluted",
        img: "../assets/00-textures/00-veneer.jpg",
        specs: [
          { label: "Substrate", val: "BWP Grade 710 Birch" },
          { label: "Sheen Level", val: "5% Dead Flat Matte" },
          { label: "Application", val: "Fluted Partitions, TV Consoles" },
          { label: "VOC Rating", val: "Zero-VOC Hardwax Oil" }
        ]
      },
      plaster: {
        title: "03. Calcified Mineral Lime Plaster",
        origin: "Artisanal Hydraulic Lime · Breathable Mineral Matrix",
        desc: "Hand-troweled in three ultra-thin layers to impart soft light diffusion that changes subtly throughout the day. Naturally antimicrobial, mold-resistant, and vapor-permeable—preventing coastal humidity entrapment.",
        badge: "Wall Surfaces · Seamless Velvety Touch",
        img: "../assets/00-textures/00-plaster.jpg",
        specs: [
          { label: "Composition", val: "Aged Slaked Lime & Marble Powder" },
          { label: "Texture", val: "Velvety Suede Feel" },
          { label: "Application", val: "Master Bedroom & Living Walls" },
          { label: "Maintenance", val: "Self-Healing Carbonation" }
        ]
      },
      brass: {
        title: "04. Forged Unlacquered Architectural Brass",
        origin: "Solid Forged Brass · Living Metal Patina",
        desc: "Custom-machined hardware, recessed cabinet finger pulls, and floor transitions that are deliberately left unlacquered. Over years of touch and coastal air exposure, the metal develops an authentic, deep bronze heirloom patina.",
        badge: "Joinery Hardware & Inlays · Solid Forged",
        img: "../assets/00-textures/00-brass-macro.jpg",
        specs: [
          { label: "Alloy", val: "C36000 Architectural Brass" },
          { label: "Finish", val: "Directional 320-Grit Satin" },
          { label: "Application", val: "Door Pulls, Framing, Inlays" },
          { label: "Aging", val: "Natural Living Patina" }
        ]
      },
      linen: {
        title: "05. Heavy Woven Belgian Linen",
        origin: "Woven Flax Fiber · Natural Acoustical Softening",
        desc: "Substantial 460 GSM textured flax drapery hung on silent ceiling-recessed ripple-fold tracks. Delicately filters intense western coastal sunlight while introducing gentle acoustic dampening to high-ceiling salons.",
        badge: "Soft Architecture · 460 GSM Natural Flax",
        img: "../assets/00-textures/00-linen.jpg",
        specs: [
          { label: "Weight", val: "460 g/m² Heavy Drape" },
          { label: "Light Transmission", val: "Soft Ambient Diffusion" },
          { label: "Application", val: "Floor-to-Ceiling Ripplefold" },
          { label: "Origin", val: "Flanders Flax Co-op" }
        ]
      }
    };

    const macroImg = swatchWrap.querySelector(".swatch-macro-img");
    const macroBadge = swatchWrap.querySelector(".swatch-macro-badge");
    const titleEl = swatchWrap.querySelector(".swatch-info-title");
    const originEl = swatchWrap.querySelector(".swatch-info-origin");
    const descEl = swatchWrap.querySelector(".swatch-info-desc");
    const pillsWrap = swatchWrap.querySelector(".swatch-spec-pills");
    const buttons = swatchWrap.querySelectorAll(".swatch-btn");

    function updateSwatch(key) {
      const data = swatches[key];
      if (!data) return;

      if (macroImg) {
        macroImg.style.opacity = "0.2";
        macroImg.style.transform = "scale(0.98)";
        setTimeout(function () {
          macroImg.src = data.img;
          macroImg.style.opacity = "1";
          macroImg.style.transform = "scale(1)";
        }, 180);
      }
      if (macroBadge) macroBadge.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (originEl) originEl.textContent = data.origin;
      if (descEl) descEl.textContent = data.desc;

      if (pillsWrap && data.specs) {
        pillsWrap.innerHTML = data.specs.map(function (s) {
          return '<div class="swatch-spec-pill"><small style="color:var(--text-muted);font-size:11px;">' + s.label + '</small><strong>' + s.val + '</strong></div>';
        }).join("");
      }

      buttons.forEach(function (b) {
        b.classList.toggle("active", b.dataset.swatch === key);
      });
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        updateSwatch(b.dataset.swatch);
      });
    });
  }

  // 9. Interactive Milestone Timeline Scrubber (Process Page)
  const scrubberWrap = document.querySelector(".timeline-scrubber");
  if (scrubberWrap) {
    const stepsData = {
      1: {
        step: "Step 01",
        title: "Initial Brief & Lifestyle Diagnostic",
        duration: "Days 1 – 3 · Pre-Design Phase",
        lead: "We analyze your family's daily rhythms, Society NOC constraints, interior priorities, and architectural aspirations before a single pencil hits paper.",
        mediaType: "image",
        mediaSrc: "../assets/05-process/05-step-01-consult.jpg",
        deliverables: [
          "Lifestyle & storage space questionnaire",
          "Navi Mumbai CIDCO society structural guideline review",
          "Target budget parameters and timeline feasibility",
          "Initial material palette alignment"
        ]
      },
      2: {
        step: "Step 02",
        title: "Laser Site Measurement & Structural Audit",
        duration: "Days 4 – 7 · Field Diagnostics",
        lead: "A hands-on physical site audit using precision laser distancemeters. We measure every millimeter of column offsets, beam drops, plumbing shafts, and core wall dampness.",
        mediaType: "image",
        mediaSrc: "../assets/05-process/05-step-02-measure.jpg",
        deliverables: [
          "Millimeter-accurate 2D as-built floor CAD drawings",
          "Wall verticality & ceiling plumb line verification",
          "Existing plumbing & electrical shaft load audit",
          "Moisture & slab dampness pin testing"
        ]
      },
      3: {
        step: "Step 03",
        title: "Architectural 3D & Itemized BOQ Lock",
        duration: "Days 8 – 22 · Studio Architecture",
        lead: "Photorealistic 3D architectural renders paired with a binding Bill of Quantities (BOQ). Every square foot of tile, wood, hinge, and switch is itemized with zero surprise line items.",
        mediaType: "image",
        mediaSrc: "../assets/05-process/05-step-03-design.jpg",
        deliverables: [
          "High-definition 3D renders with true lighting simulation",
          "Physical material board sign-off in Seawoods studio",
          "Complete architectural civil, electrical, & plumbing sheets",
          "Guaranteed fixed-price itemized BOQ contract"
        ]
      },
      4: {
        step: "Step 04",
        title: "Civil Demolition, Wet Areas & Precision Millwork",
        duration: "Days 23 – 60 · Site Discipline",
        lead: "Execution by our dedicated in-house civil team. Multi-tier chemical waterproofing, concealed conduits, screeding, and modular millwork fabrication monitored by daily WhatsApp site logs.",
        mediaType: "video",
        mediaSrc: "../assets/video/v-process-site.mp4",
        deliverables: [
          "72-hour ponding test certification for wet areas",
          "Concealed CPVC pressure test at 10 bar",
          "Factory-pressed BWR marine ply joinery assembly",
          "Daily photo & progress logs direct to your phone"
        ]
      },
      5: {
        step: "Step 05",
        title: "Snag Clearance, Deep Clean & Key Handover",
        duration: "Days 61 – 65 · Turnkey Completion",
        lead: "A joint 120-point architectural punch-list walkthrough, followed by professional industrial deep cleaning, polish touch-ups, and warranty handover. Ready for immediate move-in.",
        mediaType: "image",
        mediaSrc: "../assets/05-process/05-step-05-handover.jpg",
        deliverables: [
          "Comprehensive 120-point snag checklist resolution",
          "Industrial deep scrub, window degreasing & wood wax",
          "Warranty booklet for waterproofing & hardware",
          "Ceremonial key handover ready to live in"
        ]
      }
    };

    const navButtons = scrubberWrap.querySelectorAll(".timeline-nav-btn");
    const panelMedia = scrubberWrap.querySelector(".timeline-panel-media");
    const stepBadge = scrubberWrap.querySelector(".timeline-step-badge");
    const titleEl = scrubberWrap.querySelector(".timeline-title");
    const durationBadge = scrubberWrap.querySelector(".timeline-duration-badge");
    const leadEl = scrubberWrap.querySelector(".timeline-lead");
    const deliverablesEl = scrubberWrap.querySelector(".timeline-deliverables-list");

    function renderTimelineStep(num) {
      const data = stepsData[num];
      if (!data) return;

      navButtons.forEach(function (btn) {
        btn.classList.toggle("active", btn.dataset.step == num);
      });

      if (stepBadge) stepBadge.textContent = data.step;
      if (titleEl) titleEl.textContent = data.title;
      if (durationBadge) durationBadge.textContent = data.duration;
      if (leadEl) leadEl.textContent = data.lead;

      if (panelMedia) {
        if (data.mediaType === "video") {
          panelMedia.innerHTML = '<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;"><source src="' + data.mediaSrc + '" type="video/mp4" /></video>';
        } else {
          panelMedia.innerHTML = '<img src="' + data.mediaSrc + '" alt="' + data.title + '" style="width:100%;height:100%;object-fit:cover;" />';
        }
      }

      if (deliverablesEl && data.deliverables) {
        deliverablesEl.innerHTML = data.deliverables.map(function (item) {
          return '<li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg><span>' + item + '</span></li>';
        }).join("");
      }
    }

    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        renderTimelineStep(this.dataset.step);
      });
    });
  }
})();

