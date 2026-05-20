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
    let mapAttCard = ''; let mapLanCard = ''; let mapGrubCard = ''

    for (let i = 0; i < locResponseObject.attractions.length; i++) {
      const Item = locResponseObject.attractions[i];

      attCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footAttCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      mapAttCard += `<script>var ${Item.mapVar} = L.marker([${Item.mapPoint}]).addTo(map);
      ${Item.mapVar}.bindPopup("${Item.mapName}").openPopup;</script>`
    }

    for (let i = 0; i < locResponseObject.landmarks.length; i++) {
      const Item = locResponseObject.landmarks[i];

      lanCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.alt}"><p>${Item.description}</p></a>`;

      footLanCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      mapLanCard += `<script>var ${Item.mapVar} = L.marker([${Item.mapPoint}]).addTo(map);
      ${Item.mapVar}.bindPopup("${Item.mapName}").openPopup;</script>`
    }

    for (let i = 0; i < locResponseObject.grub.length; i++) {
      const Item = locResponseObject.grub[i];

      grubCard += `<a href="${Item.link}" target="_blank" rel="noopener noreferrer">
      <img src="${Item.image}" alt="${Item.name}"><p>${Item.description}</p></a>`;

      footGrubCard += `<a href="${Item.map}" target="_blank" rel="noopener noreferrer">${Item.name}</a>`;

      mapGrubCard += `<script>var ${Item.mapVar} = L.marker([${Item.mapPoint}]).addTo(map);
      ${Item.mapVar}.bindPopup("${Item.Name}").openPopup;</script>`
    }

    document.querySelector('#attractionContent').innerHTML = attCard;
    document.querySelector('#landmarkContent').innerHTML = lanCard;
    document.querySelector('#grubContent').innerHTML = grubCard;
    document.querySelector('#attractionFooter').innerHTML = footAttCard;
    document.querySelector('#landmarkFooter').innerHTML = footLanCard;
    document.querySelector('#grubFooter').innerHTML = footGrubCard;
    document.querySelector('#mapAttContent').innerHTML = mapAttCard;
    document.querySelector('#mapLanContent').innerHTML = mapLanCard;
    document.querySelector('#mapGrubContent').innerHTML = mapGrubCard;
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
xhrLocationsReq.send(); xhrServicesReq.send();

// Array for images for scrollers
const ohioArray = [];
for (let i = 1; i <= 239; i++) {
  ohioArray.push(`/res/ohio-res/ohio (${i}).jpg`);
}

const rows = [
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