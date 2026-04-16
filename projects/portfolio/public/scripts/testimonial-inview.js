const SECTION_SELECTOR = ".testimonial-section";
const ACTIVE_CLASS = "is-inview";

let sectionObserver;

function initTestimonialInView() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  const sections = document.querySelectorAll(SECTION_SELECTOR);
  if (!sections.length) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(ACTIVE_CLASS, entry.isIntersecting);
      });
    },
    {
      root: null,
      threshold: prefersReducedMotion ? 0.15 : 0.35,
      rootMargin: prefersReducedMotion
        ? "0px 0px -10% 0px"
        : "0px 0px -18% 0px",
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTestimonialInView);
} else {
  initTestimonialInView();
}

document.addEventListener("astro:page-load", initTestimonialInView);
document.addEventListener("astro:before-swap", () => {
  if (sectionObserver) {
    sectionObserver.disconnect();
  }
});
