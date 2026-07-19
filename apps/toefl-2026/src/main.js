import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let lenis;

if (!reduceMotion) {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.88,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -64, duration: 1 });
    });
  });
}

const context = gsap.context(() => {
  const progress = document.querySelector(".reading-progress span");

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: ({ progress: value }) => {
      gsap.set(progress, { scaleX: value });
    },
  });

  if (reduceMotion) {
    gsap.set("[data-reveal]", { opacity: 1, y: 0 });
    gsap.set(".score-slope i", { scaleX: 1 });
    return;
  }

  gsap.from(".hero-copy > *", {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.from(".hero-facts p", {
    opacity: 0,
    y: 14,
    duration: 0.65,
    stagger: 0.08,
    delay: 0.35,
    ease: "power3.out",
  });

  gsap.to(".hero-media img", {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  gsap.utils.toArray("[data-reveal]").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 28,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  });

  gsap.utils.toArray("[data-parallax] img").forEach((image) => {
    gsap.fromTo(
      image,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: image.closest("[data-parallax]"),
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      },
    );
  });

  gsap.from(".day-line span", {
    scaleX: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "[data-day-visual]",
      start: "top 78%",
      once: true,
    },
  });

  const fragmentBox = document.querySelector("[data-fragment]");
  const fragmentItems = gsap.utils.toArray(".fragment-field span");
  const fragmentTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: fragmentBox,
      start: "top 78%",
      end: "bottom 38%",
      scrub: 0.65,
    },
  });

  fragmentTimeline
    .to(fragmentItems, {
      x: (_, element) => fragmentBox.clientWidth / 2 - element.offsetLeft,
      y: (_, element) => fragmentBox.clientHeight / 2 - element.offsetTop,
      opacity: 0.08,
      scale: 0.6,
      stagger: 0.02,
      ease: "power2.inOut",
    })
    .from(
      ".system-sentence",
      {
        opacity: 0,
        y: 28,
        scale: 0.96,
        ease: "power2.out",
      },
      0.38,
    );

  gsap.to(".score-slope i", {
    scaleX: 1,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-score-slope]",
      start: "top 75%",
      once: true,
    },
  });

  gsap.from(".score-journey div, .score-journey > i", {
    opacity: 0,
    x: -18,
    duration: 0.6,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-score-journey]",
      start: "top 78%",
      once: true,
    },
  });
});

window.addEventListener(
  "pagehide",
  () => {
    context.revert();
    lenis?.destroy();
  },
  { once: true },
);
