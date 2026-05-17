document.addEventListener("DOMContentLoaded", () => {
    const gpsButton = document.getElementById("gpsButton");
    const longitudeInput = document.getElementById("longitude");
    const latitudeInput = document.getElementById("latitude");

    gpsButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            gpsButton.disabled = true;
            gpsButton.textContent = "Getting location...";

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;

                    longitudeInput.value = longitude;
                    latitudeInput.value = latitude;

                    // show map centered on current location
                    const mapFrame = document.getElementById("mapFrame");
                    const mapContainer =
                        document.getElementById("mapContainer");
                    if (mapFrame && mapContainer) {
                        mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
                        mapContainer.style.display = "block";
                    }

                    gpsButton.disabled = false;
                    gpsButton.textContent = "Get Current Location (GPS)";
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert(
                        "Unable to get your location. Please enter coordinates manually.",
                    );
                    gpsButton.disabled = false;
                    gpsButton.textContent = "Get Current Location (GPS)";
                },
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });

    const searchStationButton = document.getElementById("searchStationButton");
    const stationResult = document.getElementById("stationResult");

    searchStationButton.addEventListener("click", () => {
        const longitude = longitudeInput.value.trim();
        const latitude = latitudeInput.value.trim();

        if (!longitude || !latitude) {
            alert("Please enter both longitude and latitude.");
            return;
        }

        searchStationButton.disabled = true;
        searchStationButton.textContent = "Searching...";

        fetch(
            `http://localhost:3000/api/vehicles/nearest-station/${longitude}/${latitude}`,
        )
            .then((response) => response.json())
            .then((result) => {
                if (result.data) {
                    const station = result.data;
                    console.log(station);
                    document.getElementById("stationName").textContent =
                        station.name || "N/A";
                    document.getElementById("stationBrand").textContent =
                        station.brand || "N/A";
                    document.getElementById("stationCity").textContent =
                        station.city || "N/A";
                    document.getElementById("stationStreet").textContent =
                        station.street || "N/A";
                    document.getElementById("stationCoords").textContent =
                        `${station.location.coordinates[0]}, ${station.location.coordinates[1]}`;

                    // show result and map centered on station
                    stationResult.style.display = "block";
                    const mapFrame = document.getElementById("mapFrame");
                    const mapContainer =
                        document.getElementById("mapContainer");
                    if (
                        mapFrame &&
                        mapContainer &&
                        station.location &&
                        station.location.coordinates
                    ) {
                        const lon = station.location.coordinates[0];
                        const lat = station.location.coordinates[1];
                        mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
                        mapContainer.style.display = "block";
                    }
                } else {
                    alert(
                        "No station found. Please try different coordinates.",
                    );
                    stationResult.style.display = "none";
                }
            })
            .catch((error) => {
                console.error("Error fetching station:", error);
                alert("Unable to fetch station data.");
                stationResult.style.display = "none";
            })
            .finally(() => {
                searchStationButton.disabled = false;
                searchStationButton.textContent = "Find Nearest Station";
            });
    });
});
