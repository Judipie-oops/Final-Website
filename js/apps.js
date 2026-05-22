// HAMBURGER BUTTON CODE WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
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

  // Close menu when a link is clicked #satisfying
  document.querySelectorAll(".nav_link a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navWrapper.classList.remove("active");
  }));
}

// JSON INTERPERATER WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
let times = '';
let xhrLocationsReq = new XMLHttpRequest();
let xhrServicesReq = new XMLHttpRequest();

// Creating a separate function cause innerHTML doesnt work with js code
function addMapMarker(item) {
  if (!window.map || !item.mapPoint) return;
  const coords = item.mapPoint.split(',').map(value => parseFloat(value.trim()));
  if (coords.length !== 2 || coords.some(Number.isNaN)) return;
  const popupText = item.mapName || item.name || ''; // Fallback to name if mapName is not provided (such as with grub)
  L.marker(coords)
    .addTo(map)
    .bindPopup(popupText);
}

// Load locations data from JSON files
xhrLocationsReq.onload = function() {
  if (xhrLocationsReq.status === 200) {
    const locResponseObject = JSON.parse(xhrLocationsReq.responseText);

    // List of card containers for each category, and their footer counterparts
    let attCard = ''; let lanCard = ''; let grubCard = '';
    let footAttCard = ''; let footLanCard = ''; let footGrubCard = '';

    for (let i = 0; i < locResponseObject.attractions.length; i++) {
      const Item = locResponseObject.attractions[i];

      attCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footAttCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      addMapMarker(Item);
    }

    for (let i = 0; i < locResponseObject.landmarks.length; i++) {
      const Item = locResponseObject.landmarks[i];

      lanCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footLanCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      addMapMarker(Item);
    }

    for (let i = 0; i < locResponseObject.grub.length; i++) {
      const Item = locResponseObject.grub[i];

      grubCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.name}"><p>${Item.description}</p></a>`;

      footGrubCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      addMapMarker(Item);
    }

    // Perpare locations in html to send data
    document.querySelector('#attractionContent').innerHTML = attCard;
    document.querySelector('#landmarkContent').innerHTML = lanCard;
    document.querySelector('#grubContent').innerHTML = grubCard;
    document.querySelector('#attractionFooter').innerHTML = footAttCard;
    document.querySelector('#landmarkFooter').innerHTML = footLanCard;
    document.querySelector('#grubFooter').innerHTML = footGrubCard;
  }
};

// Load services data from JSON file, seperated for organization
xhrServicesReq.onload = function() {
  if (xhrServicesReq.status === 200) {
    const serResponseObject = JSON.parse(xhrServicesReq.responseText);

    // Card container for services, and its footer counterpart
    let serCard = ''; let footSerCard = '';

    for (let i = 0; i < serResponseObject.services.length; i++) {
      const Item = serResponseObject.services[i];

      serCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.name} Logo" style="${Item.style}"></a>`;

      footSerCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;
    }

    // Perpare locations in html to send data
    document.querySelector('#servicesContent').innerHTML = serCard;
    document.querySelector('#servicesFooter').innerHTML = footSerCard;
  }
};

// Send data to html afte done interperating
xhrLocationsReq.open("GET", "/../res/data/locations.json", true);
xhrServicesReq.open("GET", "/../res/data/services.json", true);
xhrLocationsReq.send(); xhrServicesReq.send();

// CAROUSEL CODE WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
const ohioArray = []; // Array for images for scrollers
for (let i = 1; i <= 239; i++) {
  ohioArray.push(`/res/ohio-res/ohio (${i}).jpg`);
}

const rows = [ // Ceate 3 rows to fully cover the title height, and it looks cool
  { element: document.getElementById('track1'), direction: 'left',  scroll: 0, speed: 1.3 }, // Slightly fast haha
  { element: document.getElementById('track2'), direction: 'right', scroll: 0, speed: 1 }, // Normal speed haha
  { element: document.getElementById('track3'), direction: 'left',  scroll: 0, speed: 0.7 } // Slightly slow haha
];

// Distributes images to their own tracks
ohioArray.forEach((src, index) => {
  const targetTrackIndex = index % rows.length;
  
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('carousel-item');
  
  rows[targetTrackIndex].element.appendChild(img);
});

// Fuction that does the animation
function animateMultiCarousel() {
  rows.forEach(row => {
    const track = row.element;
    
    if (row.direction === 'left') {
      // Logic for scrolling left
      row.scroll -= row.speed;
      const firstChild = track.firstElementChild;
      
      if (firstChild) {
        const margin = parseFloat(window.getComputedStyle(firstChild).marginRight) || 0;
        const width = firstChild.getBoundingClientRect().width + margin;

        // When the track shifts far enough right, bring the back item to the front
        if (Math.abs(row.scroll) >= width) {
          track.appendChild(firstChild)
          row.scroll += width;
        }
      }
    } else {
      // Logic for scrolling right
      row.scroll += row.speed;
      const lastChild = track.lastElementChild;
      
      if (lastChild) {
        const margin = parseFloat(window.getComputedStyle(lastChild).marginRight) || 0;
        const width = lastChild.getBoundingClientRect().width + margin;

        // When the track shifts far enough right, bring the back item to the front
        if (row.scroll >= 0) {
          track.insertBefore(lastChild, track.firstElementChild);
          row.scroll -= width;
        }
      }
    }

    // Apply the translation to this specific row
    track.style.transform = `translateX(${row.scroll}px)`;
  });

  requestAnimationFrame(animateMultiCarousel);
}

window.addEventListener('DOMContentLoaded', () => {
  // Ensures the right-scrolling row populates its left boundary
  const row2 = rows[1];
  const lastChild = row2.element.lastElementChild;
  if (lastChild) {
    const margin = parseFloat(window.getComputedStyle(lastChild).marginRight) || 0;
    const width = lastChild.getBoundingClientRect().width + margin;
    row2.element.insertBefore(lastChild, row2.element.firstElementChild);
    row2.scroll = -width;
  }

  requestAnimationFrame(animateMultiCarousel);
});