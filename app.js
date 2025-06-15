const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Try to get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Set the map view to the user's location
      map.setView([lat, lng], 11);

      // Optional: add a marker at the user's location
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();
    },
    error => {
      console.error("Geolocation failed:", error);
      map.setView([3.139, 101.6869], 13); // fallback to KL
    }
  );
} else {
  console.warn("Geolocation not supported by this browser.");
  map.setView([3.139, 101.6869], 13); // fallback to KL
}

const locations = [
  {
    name: "Abbas Saliimi bin Lokman",
    title: "Senior Lecturer",
    org: "Faculty of Computing, UMPSA",
    lat: 3.5470688963663037,
    lng: 103.42764374048754,
    linkedin: "https://my.linkedin.com/in/abbas-saliimi-lokman-122aa039"
  },
  {
    name: "Jane Doe",
    title: "Engineer",
    org: "Tech Company",
    lat: 3.139,
    lng: 101.6869,
    linkedin: "https://linkedin.com/in/janedoe"
  }
];

// Detect platform
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

// Loop through array and create markers
locations.forEach(loc => {
  const mapsUrl = isIOS
    ? `http://maps.apple.com/?q=${loc.lat},${loc.lng}`
    : `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;

  const popupContent = `
    <h3>${loc.name}</h3>
    ${loc.title}<br>
    ${loc.org}
    <div class="button-group">
      <a href="${loc.linkedin}" target="_blank" class="btn btn-linkedin">LinkedIn</a>
      <a href="${mapsUrl}" target="_blank" class="btn btn-map">Open in Maps</a>
    </div>
  `;

  L.marker([loc.lat, loc.lng])
    .addTo(map)
    .bindPopup(popupContent);
});
