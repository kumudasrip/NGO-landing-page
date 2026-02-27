// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (!navbarCollapse) return;

    if (navbarCollapse.classList.contains("show")) {
      // bootstrap is available because bootstrap.bundle.min.js is loaded in index.html
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  })
);

// Number counter animation on scroll
function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/[^0-9]/g, ""), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      element.textContent = element.textContent.replace(/[0-9,KM.]+/, formatNumber(target));
      clearInterval(timer);
    } else {
      element.textContent = element.textContent.replace(
        /[0-9,KM.]+/,
        formatNumber(Math.floor(current))
      );
    }
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

// Intersection Observer for counter animation
const observerOptions = { threshold: 0.5, rootMargin: "0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
      entry.target.classList.add("counted");
      animateCounter(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".impact-number").forEach((number) => observer.observe(number));
