(() => {
  const observedTitles = new WeakSet();
  const TITLE_SELECTOR = "h2.title";

  let classObserver;
  let pageObserver;

  const calculateTitleUnderlines = () => {
    const titles = document.querySelectorAll(TITLE_SELECTOR);

    titles.forEach((title) => {
      const range = document.createRange();
      range.selectNodeContents(title);
      const rect = range.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();

      title.style.setProperty("--underline-width", `${rect.width}px`);
      title.style.setProperty(
        "--underline-offset",
        `${rect.left - titleRect.left}px`,
      );
    });
  };

  const scheduleRecalculate = () => {
    // Two frames + timeout avoids stale dimensions during Astro swaps and font settling.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        calculateTitleUnderlines();
        setTimeout(calculateTitleUnderlines, 120);
      });
    });
  };

  const observeTitleClasses = () => {
    if (!classObserver) {
      classObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            scheduleRecalculate();
          }
        });
      });
    }

    document.querySelectorAll(TITLE_SELECTOR).forEach((title) => {
      if (!observedTitles.has(title)) {
        classObserver.observe(title, { attributes: true });
        observedTitles.add(title);
      }
    });
  };

  const initTitleUnderline = () => {
    observeTitleClasses();
    scheduleRecalculate();

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleRecalculate);
    }

    if (!pageObserver) {
      pageObserver = new MutationObserver(() => {
        observeTitleClasses();
        scheduleRecalculate();
      });
    }

    pageObserver.observe(document.body, { subtree: true, childList: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTitleUnderline);
  } else {
    initTitleUnderline();
  }

  window.addEventListener("resize", scheduleRecalculate);
  document.addEventListener("astro:page-load", initTitleUnderline);
  document.addEventListener("astro:before-swap", () => {
    if (classObserver) classObserver.disconnect();
    if (pageObserver) pageObserver.disconnect();
  });
})();
