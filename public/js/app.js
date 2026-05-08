/* ═══════════════════════════════════════════════════════
   Family Golf — Frontend JavaScript
   ═══════════════════════════════════════════════════════ */

// ── GSAP Setup ──
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Custom Cursor ──
const crsr = document.querySelector("#cursor");
const blur = document.querySelector("#cursor-blur");

if (crsr && blur) {
  document.addEventListener("mousemove", (e) => {
    crsr.style.left = e.x + "px";
    crsr.style.top = e.y + "px";
    blur.style.left = e.x - 200 + "px";
    blur.style.top = e.y - 200 + "px";
  });

  // Cursor hover effects on navigation
  document.querySelectorAll("#nav a, .btn, .card, .elem").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      crsr.style.scale = 3;
      crsr.style.border = "1px solid #fff";
      crsr.style.backgroundColor = "transparent";
    });
    el.addEventListener("mouseleave", () => {
      crsr.style.scale = 1;
      crsr.style.border = "0px solid #95C11E";
      crsr.style.backgroundColor = "#95C11E";
    });
  });
}

// ── Mobile Nav Toggle ──
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = navToggle.querySelector("i");
    icon.className = navLinks.classList.contains("open")
      ? "ri-close-line"
      : "ri-menu-3-line";
  });
}

// ── GSAP Animations (only on pages with these elements) ──
function initAnimations() {
  if (typeof gsap === "undefined") return;

  // Navbar shrink on scroll
  if (document.querySelector("#hero-video")) {
    gsap.to("#nav", {
      backgroundColor: "rgba(0,0,0,0.95)",
      height: "70px",
      scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
      },
    });

    gsap.to("#main", {
      backgroundColor: "#000",
      scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
      },
    });
  }

  // About section
  if (document.querySelector("#about-us")) {
    gsap.from("#about-us img, #about-us-in", {
      y: 80,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        start: "top 75%",
        end: "top 65%",
        scrub: 1,
      },
    });
  }

  // Cards
  if (document.querySelector(".card")) {
    gsap.from(".card", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start: "top 75%",
        end: "top 65%",
        scrub: 1,
      },
    });
  }

  // Quote marks
  if (document.querySelector("#colon1")) {
    gsap.from("#colon1", {
      y: -70,
      x: -70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });
    gsap.from("#colon2", {
      y: 70,
      x: 70,
      scrollTrigger: {
        trigger: "#colon1",
        scroller: "body",
        start: "top 55%",
        end: "top 45%",
        scrub: 4,
      },
    });
  }

  // CTA heading
  if (document.querySelector("#page4 h1")) {
    gsap.from("#page4 h1", {
      y: 50,
      scrollTrigger: {
        trigger: "#page4 h1",
        scroller: "body",
        start: "top 75%",
        end: "top 70%",
        scrub: 3,
      },
    });
  }

  // Content cards (inner pages)
  if (document.querySelector(".content-card")) {
    gsap.from(".content-card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".content-card",
        scroller: "body",
        start: "top 80%",
        end: "top 70%",
        scrub: 1,
      },
    });
  }

  // Review cards
  if (document.querySelector(".review-card")) {
    gsap.from(".review-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".reviews-grid",
        scroller: "body",
        start: "top 80%",
        end: "top 65%",
        scrub: 1,
      },
    });
  }

  // Feature items
  if (document.querySelector(".feature-item")) {
    gsap.from(".feature-item", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".features-row",
        scroller: "body",
        start: "top 80%",
        end: "top 70%",
        scrub: 1,
      },
    });
  }
}

// ── Form Submissions (AJAX) ──
function setupForms() {
  // Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("newsletter-msg");
      const email = newsletterForm.querySelector('input[name="email"]').value;

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        msg.textContent = data.message;
        msg.className = "form-message " + (data.success ? "success" : "error");
        if (data.success) newsletterForm.reset();
      } catch {
        msg.textContent = "Network error. Please try again.";
        msg.className = "form-message error";
      }
    });
  }

  // Booking
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    // Pre-fill activity from URL param
    const params = new URLSearchParams(window.location.search);
    const actParam = params.get("activity");
    if (actParam) {
      const sel = bookingForm.querySelector('select[name="activity"]');
      if (sel) sel.value = actParam;
    }

    // Set min date to today
    const dateInput = bookingForm.querySelector('input[name="date"]');
    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
    }

    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("booking-msg");
      const formData = Object.fromEntries(new FormData(bookingForm));

      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        msg.textContent = data.message;
        msg.className = "form-message " + (data.success ? "success" : "error");
        if (data.success) bookingForm.reset();
      } catch {
        msg.textContent = "Network error. Please try again.";
        msg.className = "form-message error";
      }
    });
  }

  // Contact
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("contact-msg");
      const formData = Object.fromEntries(new FormData(contactForm));

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        msg.textContent = data.message;
        msg.className = "form-message " + (data.success ? "success" : "error");
        if (data.success) contactForm.reset();
      } catch {
        msg.textContent = "Network error. Please try again.";
        msg.className = "form-message error";
      }
    });
  }

  // Review
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = document.getElementById("review-msg");
      const formData = Object.fromEntries(new FormData(reviewForm));

      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        msg.textContent = data.message;
        msg.className = "form-message " + (data.success ? "success" : "error");
        if (data.success) reviewForm.reset();
      } catch {
        msg.textContent = "Network error. Please try again.";
        msg.className = "form-message error";
      }
    });
  }
}

// ── Initialize ──
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  setupForms();
});
