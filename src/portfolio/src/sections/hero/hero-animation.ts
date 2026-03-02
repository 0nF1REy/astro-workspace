import { gsap } from "gsap";

let roleLoop: gsap.core.Animation | null = null;

function startRoleTextLoop() {
  const roleElement = document.querySelector(
    ".hero__subtitle-role",
  ) as HTMLElement | null;

  if (!roleElement) return;

  if (roleLoop) {
    roleLoop.kill();
    roleLoop = null;
  }

  const roles = [
    "Desenvolvedor Full Stack",
    "Técnico em Desenvolvimento de Sistemas",
  ];

  let roleIndex = 0;

  const cycle = () => {
    roleLoop = gsap.to(roleElement, {
      autoAlpha: 0,
      y: -8,
      filter: "blur(6px)",
      duration: 0.35,
      ease: "power2.out",
      onComplete: () => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleElement.textContent = roles[roleIndex];

        gsap.fromTo(
          roleElement,
          {
            autoAlpha: 0,
            y: 8,
            filter: "blur(6px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              roleLoop = gsap.delayedCall(2.4, cycle);
            },
          },
        );
      },
    });
  };

  roleLoop = gsap.delayedCall(2.6, cycle);
}

export function initHeroAnimation() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const roleElement = document.querySelector(
    ".hero__subtitle-role",
  ) as HTMLElement | null;

  if (roleLoop) {
    roleLoop.kill();
    roleLoop = null;
  }

  if (prefersReducedMotion) {
    if (roleElement) {
      roleElement.textContent =
        "Desenvolvedor Full Stack • Técnico em Desenvolvimento de Sistemas";
    }

    gsap.set(
      [
        ".hero__intro",
        ".hero__name",
        ".hero__subtitle",
        ".hero__actions",
        ".hero__social",
        ".hero__media",
      ],
      {
        autoAlpha: 1,
        clearProps: "transform,filter,visibility,opacity",
      },
    );
    return;
  }

  if (roleElement) {
    roleElement.textContent = "Desenvolvedor Full Stack";
  }

  gsap.set(".hero__intro", {
    autoAlpha: 0,
    y: -20,
    filter: "blur(10px)",
  });

  gsap.set(".hero__name", {
    autoAlpha: 0,
    scale: 0.9,
    rotationX: -45,
  });

  gsap.set(".hero__subtitle", {
    autoAlpha: 0,
    x: -30,
    filter: "blur(8px)",
  });

  gsap.set(".hero__actions", {
    autoAlpha: 0,
    scale: 0,
    rotation: 360,
    y: 100,
  });

  gsap.set(".hero__media", {
    autoAlpha: 0,
    x: 40,
    scale: 0.95,
    filter: "blur(8px)",
  });

  gsap.set(".hero__social", {
    autoAlpha: 0,
    y: 14,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  timeline
    .to(".hero__intro", {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      delay: 0.2,
    })
    .to(
      ".hero__name",
      {
        autoAlpha: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.2)",
      },
      "-=0.5",
    )
    .to(
      ".hero__name span",
      {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      },
      "-=0.2",
    )
    .to(
      ".hero__subtitle",
      {
        autoAlpha: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.7,
      },
      "-=0.6",
    )
    .to(
      ".hero__actions",
      {
        autoAlpha: 1,
        scale: 1.15,
        rotation: 0,
        y: 0,
        duration: 0.45,
        ease: "back.out(4)",
      },
      "-=0.3",
    )
    .to(
      ".hero__media",
      {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
      },
      "-=0.4",
    )
    .to(
      ".hero__social",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
      },
      "-=0.35",
    )
    .to(".hero__actions", {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(2, 0.4)",
    })
    .to(".hero__actions .btn", {
      scale: 1.15,
      boxShadow: "0 0 30px rgba(30, 113, 183, 0.8)",
      duration: 0.3,
      repeat: 2,
      yoyo: true,
      ease: "power2.inOut",
    })
    .to(".hero__actions .btn", {
      y: -8,
      scale: 1.08,
      rotation: 2,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

  startRoleTextLoop();
}
