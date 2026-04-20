import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let cleanupParticles: (() => void) | null = null;

type ParticleInstance = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  update: (w: number, h: number) => void;
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }
}

export function initLayoutParticles() {
  if (localStorage.getItem("particles-disabled") === "true") {
    destroyLayoutParticles();
    return;
  }

  cleanupParticles?.();

  const canvasElement = document.getElementById("bg-canvas");
  if (!(canvasElement instanceof HTMLCanvasElement)) return;
  const canvasEl = canvasElement;

  const ctx = canvasEl.getContext("2d");
  if (!ctx) return;
  const context = ctx;

  let particles: ParticleInstance[] = [];
  const particleCount = 60;

  function resize() {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    particles = Array.from(
      { length: particleCount },
      () => new Particle(canvasEl.width, canvasEl.height),
    );
  }

  function animate() {
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    context.strokeStyle = "rgba(30, 113, 183, 0.15)";
    context.fillStyle = "rgba(30, 113, 183, 0.5)";

    particles.forEach((p, i) => {
      p.update(canvasEl.width, canvasEl.height);
      context.beginPath();
      context.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      context.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

        if (dist < 180) {
          context.beginPath();
          context.lineWidth = 1 - dist / 180;
          context.moveTo(p.x, p.y);
          context.lineTo(p2.x, p2.y);
          context.stroke();
        }
      }
    });
  }

  resize();
  window.addEventListener("resize", resize);
  gsap.ticker.add(animate);

  const parallaxTween = gsap.to(canvasEl, {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  cleanupParticles = () => {
    window.removeEventListener("resize", resize);
    gsap.ticker.remove(animate);
    if (parallaxTween.scrollTrigger) parallaxTween.scrollTrigger.kill();
    parallaxTween.kill();
  };
}

export function destroyLayoutParticles() {
  cleanupParticles?.();
  cleanupParticles = null;
}

if (typeof window !== "undefined") {
  window.addEventListener("particles:stop", destroyLayoutParticles);
  window.addEventListener("particles:start", initLayoutParticles);
}
