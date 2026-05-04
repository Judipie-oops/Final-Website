const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  // Toggle classes to trigger CSS animations and visibility
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}));