document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const searchButton = document.getElementById("searchButton");
    const searchNIC = document.getElementById("searchNIC");

    const runSearch = () => {
        const nic = searchNIC.value.trim();

        if (!nic) {
            showToast("Please enter an NIC first.", "danger");
            return;
        }

        $.ajax({
            url: `http://localhost:3000/api/vehicles/search/nic/${nic}`,
            method: "GET",
            success: function (response) {
                const vehicle = response.data && response.data[0];

                if (!vehicle) {
                    showToast("No vehicle found for this NIC.", "danger");
                    clearFields();
                    return;
                }

                document.getElementById("regNo").value = vehicle.regNo || "";
                document.getElementById("vehicleType").value =
                    vehicle.vehicleType || "";
                document.getElementById("model").value =
                    vehicle.vehicleModel || "";
                document.getElementById("fuelType").value =
                    vehicle.fuelType || "";
                document.getElementById("station").value =
                    vehicle.station || "";
                document.getElementById("firstName").value =
                    vehicle.firstName || "";
                document.getElementById("lastName").value =
                    vehicle.lastName || "";
                document.getElementById("ownerNIC").value =
                    vehicle.ownerNIC || "";
                document.getElementById("email").value = vehicle.email || "";
            },
            error: function () {
                showToast("Unable to load vehicle details.", "danger");
            },
        });
    };

    const updateVehicle = () => {
        const nic = searchNIC.value.trim();

        if (!nic) {
            showToast("Please search by NIC first.", "danger");
            return;
        }

        const formData = {
            regNo: document.getElementById("regNo").value.trim(),
            fuelType: document.getElementById("fuelType").value,
            vehicleModel: document.getElementById("model").value.trim(),
            station: document.getElementById("station").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            ownerNIC: document.getElementById("ownerNIC").value.trim(),
            vehicleType: document.getElementById("vehicleType").value,
            email: document.getElementById("email").value.trim(),
        };

        $.ajax({
            url: `http://localhost:3000/api/vehicles/update/nic/${encodeURIComponent(nic)}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function () {
                showToast("Vehicle updated successfully.", "success");
            },
            error: function () {
                showToast("Unable to update vehicle details.", "danger");
            },
        });
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        updateVehicle();
    });

    searchButton.addEventListener("click", runSearch);

    searchNIC.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            runSearch();
        }
    });
});

function clearFields() {
    [
        "regNo",
        "vehicleType",
        "model",
        "fuelType",
        "station",
        "firstName",
        "lastName",
        "ownerNIC",
        "email",
    ].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = "";
        }
    });
}

function showToast(message, type) {
    const toastEl = document.getElementById("updateToast");
    const toastContent = document.getElementById("updateToastContent");

    if (toastEl && toastContent) {
        toastContent.textContent = message;

        toastEl.classList.remove("bg-success", "bg-danger", "text-white");
        toastEl.classList.add(`bg-${type}`, "text-white");

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }
}
