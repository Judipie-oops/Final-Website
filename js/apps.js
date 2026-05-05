const hamburger = document.getElementById("mobile_menu");
const navMenu = document.querySelector("#nav_wrapper ul");
const navWrapper = document.getElementById("nav_wrapper");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    // Toggle classes to trigger CSS animations and visibility
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navWrapper.classList.toggle("active");
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".nav_link a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navWrapper.classList.remove("active");
  }));
}
