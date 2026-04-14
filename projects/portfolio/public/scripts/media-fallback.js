function applyImageFallback(img) {
  if (!(img instanceof HTMLImageElement)) return;
  if (img.dataset.fallbackBound === "1") return;

  img.dataset.fallbackBound = "1";

  img.addEventListener("error", () => {
    const fallbackSrc = img.dataset.fallbackSrc;
    const fallbackAlreadyApplied = img.dataset.fallbackApplied === "1";

    if (!fallbackSrc || fallbackAlreadyApplied) return;

    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  });
}

function bindMediaFallbacks(root = document) {
  const images = root.querySelectorAll("img[data-fallback-src]");
  images.forEach((image) => applyImageFallback(image));
}

document.addEventListener("astro:page-load", () => bindMediaFallbacks());
bindMediaFallbacks();
