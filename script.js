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


// Services accordion
(function(){
  const root = document.querySelector("[data-accordion]");
  if(!root) return;

  const items = Array.from(root.querySelectorAll(".svcItem"));
  const panels = Array.from(root.querySelectorAll(".svcPanel"));

  function closeAll(){
    items.forEach(btn => {
      btn.classList.remove("is-open");
      btn.setAttribute("aria-expanded","false");
    });
    panels.forEach(p => p.classList.remove("is-open"));
  }

  items.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.classList.contains("is-open");
      closeAll();
      if(!isOpen){
        btn.classList.add("is-open");
        btn.setAttribute("aria-expanded","true");
        panels[index].classList.add("is-open");
      }
    });
  });
})();
