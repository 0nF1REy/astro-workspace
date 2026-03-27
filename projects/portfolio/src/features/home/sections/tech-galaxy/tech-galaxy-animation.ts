import { gsap } from "gsap";

// Array para armazenar as animações e permitir controle global dentro deste módulo
let galaxyTweens: gsap.core.Tween[] = [];

export function initTechGalaxy() {
  // Limpa animações anteriores (importante para o Astro:page-load)
  galaxyTweens.forEach((t) => t.kill());
  galaxyTweens = [];

  const container = document.querySelector(".galaxy__container");
  if (!container) return;

  const items = document.querySelectorAll(".galaxy__item");
  const isMobile = window.innerWidth < 768;

  items.forEach((item, index) => {
    const orbit = item.getAttribute("data-orbit");
    const totalItems = document.querySelectorAll(
      `.galaxy__item[data-orbit="${orbit}"]`,
    ).length;

    const radiusX =
      orbit === "inner" ? (isMobile ? 120 : 200) : isMobile ? 220 : 380;
    const radiusY =
      orbit === "inner" ? (isMobile ? 40 : 70) : isMobile ? 70 : 130;
    const duration = orbit === "inner" ? 15 : 25;

    const startAngle = (index / totalItems) * Math.PI * 2;
    const obj = { angle: startAngle };

    const tween = gsap.to(obj, {
      angle: startAngle + Math.PI * 2,
      duration: duration,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const x = Math.cos(obj.angle) * radiusX;
        const y = Math.sin(obj.angle) * radiusY;

        const scale = gsap.utils.mapRange(-radiusY, radiusY, 0.6, 1.1, y);
        const opacity = gsap.utils.mapRange(-radiusY, radiusY, 0.3, 1, y);
        const zIndex = y > 0 ? 10 : 1;
        const filter = y > 0 ? "blur(0px)" : "blur(2px)";

        gsap.set(item, {
          x: x,
          y: y,
          scale: scale,
          autoAlpha: opacity,
          zIndex: zIndex,
          filter: filter,
        });
      },
    });

    galaxyTweens.push(tween);

    item.addEventListener("mouseenter", () => {
      galaxyTweens.forEach((t) => t.pause());
    });
    item.addEventListener("mouseleave", () => {
      galaxyTweens.forEach((t) => t.resume());
    });
  });
}
