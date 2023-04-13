// Load object data
fetch(
  "https://raw.githubusercontent.com/waliot/test-tasks/master/assets/data/frontend-1-dataset.json"
)
  .then((response) => response.json()).then((data) => {

      console.log(data)
    // Create map
    const map = L.map("map").setView(
      [data[0].latitude, data[0].longitude],10
    );

    // Add tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Create markers
    const markers = [];
    data.forEach((object) => {
      const marker = L.marker([object.latitude, object.longitude]).addTo(map);
      marker.id = object.id;
      marker.name = object.name;
      marker.on("click", function () {
        // Highlight marker
        markers.forEach((m) =>
          m.setIcon(L.icon({ iconUrl: "./assets/location-pin.png" }))
        );
        this.setIcon(L.icon({ iconUrl: "./assets/location.png" }));

        // Center map on marker
        map.setView(this.getLatLng(), 10);
      });
      markers.push(marker);
    });


    // Populate list
    const list = document.getElementById("list");
    data.forEach((object) => {
      const item = document.createElement("li");
      item.textContent = object.name;
      item.addEventListener("click", function () {
        // Select object
        markers.forEach((m) =>
          m.setIcon(L.icon({ iconUrl: "./assets/circle_icon.png" }))
        );
        const marker = markers.find((m) => m.id === object.id);
        if (marker) {
          marker.setIcon(L.icon({ iconUrl: "./assets/location-pin.png" }));
          map.setView(marker.getLatLng(), 10);
        }
      });
      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.error("Error loading object data:", error);
  });