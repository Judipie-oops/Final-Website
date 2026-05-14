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

let times = '';
let xhrLocationsReq = new XMLHttpRequest();
let xhrServicesReq = new XMLHttpRequest();

xhrLocationsReq.onload = function() {
  if (xhrLocationsReq.status === 200) {
    const locResponseObject = JSON.parse(xhrLocationsReq.responseText);

    let attCard = ''; let lanCard = ''; let grubCard = '';
    let footAttCard = ''; let footLanCard = ''; let footGrubCard = '';

    for (let i = 0; i < locResponseObject.attractions.length; i++) {
      const Item = locResponseObject.attractions[i];

      attCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footAttCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;
    }

    for (let i = 0; i < locResponseObject.landmarks.length; i++) {
      const Item = locResponseObject.landmarks[i];

      lanCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footLanCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;
    }

    for (let i = 0; i < locResponseObject.grub.length; i++) {
      const Item = locResponseObject.grub[i];

      grubCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.name}"><p>${Item.description}</p></a>`;

      footGrubCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;
    }

    document.querySelector('#attractionContent').innerHTML = attCard;
    document.querySelector('#landmarkContent').innerHTML = lanCard;
    document.querySelector('#grubContent').innerHTML = grubCard;
    document.querySelector('#attractionFooter').innerHTML = footAttCard;
    document.querySelector('#landmarkFooter').innerHTML = footLanCard;
    document.querySelector('#grubFooter').innerHTML = footGrubCard;
  }
};

xhrServicesReq.onload = function() {
  if (xhrServicesReq.status === 200) {
    const serResponseObject = JSON.parse(xhrServicesReq.responseText);

    let serCard = ''; let footSerCard = '';

    for (let i = 0; i < serResponseObject.services.length; i++) {
      const Item = serResponseObject.services[i];

      serCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.name} Logo" style="${Item.style}"></a>`;

      footSerCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;
    }

    document.querySelector('#servicesContent').innerHTML = serCard;
    document.querySelector('#servicesFooter').innerHTML = footSerCard;
  }
};

xhrLocationsReq.open("GET", "/../res/data/locations.json", true);
xhrServicesReq.open("GET", "/../res/data/services.json", true);
xhrLocationsReq.send();
xhrServicesReq.send();

const ohioArray = [];

for (let i = 1; i <= 239; i++) {
  ohioArray.push(`/res/ohio-res/ohio (${i}).jpg`)
}

// function randomImageScroll() {
//   const random = Math.floor(Math.random() * ohioArray.length);
//   const selection = ohioArray[random];
//   const title = document.getElementById("title");

//   if (title) {
//     title.style.backgroundImage = `url(${selection})`;
//     title.style.backgroundSize = "cover";
//     title.style.backgroundPosition = "center center";
//     title.style.backgroundRepeat = "no-repeat";
//   }
// }

// function updateTitleBackgroundPosition() {
//   const title = document.getElementById("title");
//   if (!title) return;

//   const scrollY = window.scrollY;
//   title.style.backgroundPosition = `center calc(50% + ${scrollY * 0.25}px)`;
// }

// document.addEventListener("DOMContentLoaded", () => {
//   randomImageTest();
//   updateTitleBackgroundPosition();
//   window.addEventListener("scroll", updateTitleBackgroundPosition);
// });