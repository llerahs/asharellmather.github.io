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

// ===== YouTube Modal (replace your current video modal block with this)

const videoModal = document.querySelector("#videoModal");
const videoFrame = document.querySelector("#videoFrame");
const closeEls = videoModal ? [...videoModal.querySelectorAll("[data-close],[data-video-close]")] : [];
const videoButtons = [...document.querySelectorAll("[data-youtube-id]")];

function openYoutubeModal(videoId) {
  if (!videoModal || !videoFrame) return;

  // autoplay works more reliably if muted=1
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;

  videoFrame.src = src;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
}

function closeYoutubeModal() {
  if (!videoModal || !videoFrame) return;

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");

  // stop playback
  videoFrame.src = "";
}

videoButtons.forEach((btn) => {
  btn.addEventListener("click", () => openYoutubeModal(btn.dataset.youtubeId));
});

closeEls.forEach((el) => el.addEventListener("click", closeYoutubeModal));

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal && videoModal.classList.contains("is-open")) {
    closeYoutubeModal();
  }
});
