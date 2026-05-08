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

const ohioArray = [];

for (let i = 1; i <= 239; i++) {
  ohioArray.push(`/res/ohio-res/ohio (${i}).jpg`)
}

function randomImageScroll() {
  const random = Math.floor(Math.random() * ohioArray.length);
  const selection = ohioArray[random];
  const title = document.getElementById("title");

  if (title) {
    title.style.backgroundImage = `url(${selection})`;
    title.style.backgroundSize = "cover";
    title.style.backgroundPosition = "center center";
    title.style.backgroundRepeat = "no-repeat";
  }
}

function updateTitleBackgroundPosition() {
  const title = document.getElementById("title");
  if (!title) return;

  const scrollY = window.scrollY;
  title.style.backgroundPosition = `center calc(50% + ${scrollY * 0.25}px)`;
}

document.addEventListener("DOMContentLoaded", () => {
  randomImageTest();
  updateTitleBackgroundPosition();
  window.addEventListener("scroll", updateTitleBackgroundPosition);
});