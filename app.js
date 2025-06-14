const map = L.map('map'); // initialize without setView yet

// Try to get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Set the map view to the user's location
      map.setView([lat, lng], 13);

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

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([3.5470688963663037, 103.42764374048754])
  .addTo(map)
  .bindPopup(`
    <h3>Abbas Saliimi bin Lokman</h3>
    Senior Lecturer<br>
    Faculty of Computing, UMPSA
    <p><a href="https://my.linkedin.com/in/abbas-saliimi-lokman-122aa039" target="_blank">LinkedIn</a></p>
  `)
  .openPopup();
