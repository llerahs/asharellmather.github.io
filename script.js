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

// ===== Video Modal
const videoModal = $("#videoModal");
const videoPlayer = $("#videoPlayer");
const overlay = videoModal ? $(".videoModal__overlay", videoModal) : null;
const closeEls = videoModal ? $$("[data-close]", videoModal) : [];
const videoButtons = $$("[data-video-src]");

function openVideoModal(src) {
  if (!videoModal || !videoPlayer) return;

  const source = videoPlayer.querySelector("source");
  if (!source) return;

  // set src + load
  source.src = src;
  videoPlayer.load();

  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");

  // ✅ Best chance to autoplay: muted + playsinline
  videoPlayer.muted = true;
  videoPlayer.setAttribute("playsinline", "");
  videoPlayer.currentTime = 0;

  // try play after it can play
  const tryPlay = () => {
    videoPlayer.play().catch(() => {
      // If blocked, user can press play (controls should be enabled in HTML)
    });
    videoPlayer.removeEventListener("canplay", tryPlay);
  };

  videoPlayer.addEventListener("canplay", tryPlay);
}

function closeVideoModal() {
  if (!videoModal || !videoPlayer) return;

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");

  // stop and reset
  videoPlayer.pause();
  videoPlayer.currentTime = 0;

  const source = videoPlayer.querySelector("source");
  if (source) source.src = "";
  videoPlayer.load();
}

videoButtons.forEach((btn) => {
  btn.addEventListener("click", () => openVideoModal(btn.dataset.videoSrc));
});

closeEls.forEach((el) => el.addEventListener("click", closeVideoModal));

// ✅ click overlay closes modal
if (overlay) overlay.addEventListener("click", closeVideoModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && videoModal && videoModal.classList.contains("is-open")) {
    closeVideoModal();
  }
});
