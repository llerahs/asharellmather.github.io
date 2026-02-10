// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth active nav highlighting
const links = Array.from(document.querySelectorAll(".nav__link"))
  .filter(a => a.getAttribute("href")?.startsWith("#"));

const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = "#" + entry.target.id;
    links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
  });
}, { rootMargin: "-50% 0px -45% 0px", threshold: 0.01 });

sections.forEach(s => io.observe(s));

// Glowing cursor dot
const dot = document.querySelector(".cursor-dot");
window.addEventListener("mousemove", (e) => {
  dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
});

const toggle = document.querySelector('.nav__toggle');
const mobileMenu = document.querySelector('.mobileMenu');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});
