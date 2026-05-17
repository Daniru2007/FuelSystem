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
});
