const HEADING_SELECTOR = ".title, .subtitle";
const ACTIVE_CLASS = "is-inview";

let headingObserver;

function initHeadingInView() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (headingObserver) {
    headingObserver.disconnect();
  }

  const headings = document.querySelectorAll(HEADING_SELECTOR);
  if (!headings.length) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  headingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(ACTIVE_CLASS, entry.isIntersecting);
      });
    },
    {
      root: null,
      threshold: prefersReducedMotion ? 0.12 : 0.28,
      rootMargin: prefersReducedMotion ? "0px 0px -8% 0px" : "0px 0px -14% 0px",
    },
  );

  headings.forEach((heading) => headingObserver.observe(heading));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeadingInView);
} else {
  initHeadingInView();
}

document.addEventListener("astro:page-load", initHeadingInView);
document.addEventListener("astro:before-swap", () => {
  if (headingObserver) {
    headingObserver.disconnect();
  }
});
