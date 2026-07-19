const progress = document.querySelector(".progress span");
const reveals = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
}

if (reducedMotion) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );
  reveals.forEach((element) => observer.observe(element));
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();
