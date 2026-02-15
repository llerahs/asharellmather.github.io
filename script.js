// ===== Helpers
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// ===== Year
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Cursor dot
const cursorDot = $(".cursor-dot");
if (cursorDot) {
  window.addEventListener("mousemove", (e) => {
    cursorDot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
  });
}

// ===== Mobile menu
const navToggle = $(".nav__toggle");
const mobileMenu = $(".mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // ✅ FIX: this selector was wrong in your code
  $$(".mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
  });
}

// ===== Accordion
const accordion = document.querySelector("[data-accordion]");
if (accordion) {
  const items = $$(".svcItem", accordion);

  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.classList.contains("is-open");

      // close all
      items.forEach((b) => {
        b.classList.remove("is-open");
        b.setAttribute("aria-expanded", "false");
        const p = b.nextElementSibling;
        if (p && p.classList) p.classList.remove("is-open");
      });

      // open if it wasn't open
      if (!isOpen) {
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        if (panel && panel.classList) panel.classList.add("is-open");
      }
    });
  });
}

// ===== YouTube Video Modal
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeBtns = videoModal ? [...videoModal.querySelectorAll("[data-video-close]")] : [];
const videoButtons = [...document.querySelectorAll("[data-youtube-id]")];

function openVideoModal(youtubeId) {
  if (!videoModal || !videoFrame) return;

  videoFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0`;

  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
}

function closeVideoModal() {
  if (!videoModal || !videoFrame) return;

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");

  // Stop video
  videoFrame.src = "";
}

videoButtons.forEach((btn) => {
  btn.addEventListener("click", () => openVideoModal(btn.dataset.youtubeId));
});

closeBtns.forEach((el) => el.addEventListener("click", closeVideoModal));

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideoModal();
  }
});

