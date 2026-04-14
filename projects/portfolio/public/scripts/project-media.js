function initProjectVideo(root = document) {
  const playBtn = root.querySelector('[data-role="load-full-video"]');
  const videoPlayer = root.querySelector('[data-role="project-video"]');

  if (!(playBtn instanceof HTMLButtonElement)) return;
  if (!(videoPlayer instanceof HTMLVideoElement)) return;

  if (videoPlayer.dataset.projectMediaBound === "1") return;
  videoPlayer.dataset.projectMediaBound = "1";

  const startPreviewPlayback = () => {
    if (videoPlayer.dataset.state === "full") return;

    videoPlayer.muted = true;
    videoPlayer.autoplay = true;
    videoPlayer.loop = true;
    videoPlayer.playsInline = true;

    const playPromise = videoPlayer.play();
    if (playPromise) {
      void playPromise.catch(() => {});
    }
  };

  videoPlayer.addEventListener("error", () => {
    const fallback = videoPlayer.dataset.previewFallbackSrc;
    const fallbackAlreadyApplied =
      videoPlayer.dataset.previewFallbackApplied === "1";

    if (
      fallback &&
      !fallbackAlreadyApplied &&
      videoPlayer.dataset.state !== "full"
    ) {
      videoPlayer.dataset.previewFallbackApplied = "1";
      videoPlayer.src = fallback;
      videoPlayer.load();
      void videoPlayer.play();
    }
  });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveData = navigator.connection?.saveData;

  if (prefersReducedMotion || saveData) {
    videoPlayer.autoplay = false;
    videoPlayer.loop = false;
    videoPlayer.controls = true;
    videoPlayer.pause();
    return;
  }

  videoPlayer.addEventListener("loadeddata", startPreviewPlayback, {
    once: true,
  });
  videoPlayer.load();
  startPreviewPlayback();

  playBtn.addEventListener("click", () => {
    const fullUrl = playBtn.dataset.fullUrl;

    if (!fullUrl) return;

    videoPlayer.dataset.state = "full";
    videoPlayer.src = fullUrl;
    videoPlayer.loop = false;
    videoPlayer.muted = false;
    videoPlayer.controls = true;
    videoPlayer.load();
    void videoPlayer.play();

    const overlay = playBtn.closest(".video-overlay");
    if (overlay instanceof HTMLElement) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }
  });
}

document.addEventListener("astro:page-load", () => initProjectVideo());
initProjectVideo();
