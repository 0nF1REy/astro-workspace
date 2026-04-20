(function () {
  function applyStoredTheme() {
    const isEnabled = localStorage.getItem("particles-disabled") === "true";
    const body = document.body;
    const btn = document.querySelector(".bg-toggle-btn");

    if (isEnabled) {
      body.classList.add("particles-disabled");
      if (btn) btn.classList.add("active");
      window.dispatchEvent(new CustomEvent("particles:stop"));
    } else {
      body.classList.remove("particles-disabled");
      if (btn) btn.classList.remove("active");
      window.dispatchEvent(new CustomEvent("particles:start"));
    }
  }

  function toggleParticles() {
    const isCurrentlyDisabled =
      document.body.classList.contains("particles-disabled");
    localStorage.setItem("particles-disabled", !isCurrentlyDisabled);
    applyStoredTheme();
  }

  document.addEventListener("astro:page-load", () => {
    applyStoredTheme();
    const btn = document.querySelector(".bg-toggle-btn");
    if (btn) {
      btn.addEventListener("click", toggleParticles);
    }
  });
})();
