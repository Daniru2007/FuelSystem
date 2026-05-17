$(document).ready(function() {

    $("#searchNicBtn").on("click", searchByNIC);
    $("#searchRegNoBtn").on("click", searchByRegNo);

    $("#nicInput").on("keypress", function(e) {
        if (e.key === "Enter") searchByNIC();
    });
    $("#regNoInput").on("keypress", function(e) {
        if (e.key === "Enter") searchByRegNo();
    });
});

function searchByNIC() {
    
    const nic = $.trim($("#nicInput").val());

    if (!nic) {
        showToast("Please enter an NIC", "danger");
        return;
    }


    $.ajax({
        url: `http://localhost:3000/api/vehicles/search/nic/${nic}`,
        method: "GET",
        dataType: "json",
        success: function(response) {
            displayResults(response.data, "NIC");
            showToast("Search completed!", "success");
        },
        error: function(xhr) {
            const errorMsg = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : "Vehicle not found";
            showToast(errorMsg, "danger");
            clearResults();
        }
    });
}

function searchByRegNo() {

    const regNo = $.trim($("#regNoInput").val());

    if (!regNo) {
        showToast("Please enter a Registration Number", "danger");
        return;
    }

    $.ajax({
        url: `http://localhost:3000/api/vehicles/search/regno/${regNo}`,
        method: "GET",
        dataType: "json",
        success: function(response) {
            displayResults(response.data, "RegNo");
            showToast("Search completed!", "success");
        },
        error: function(xhr) {
            const errorMsg = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : "Vehicle not found";
            showToast(errorMsg, "danger");
            clearResults();
        }
    });
}

function displayResults(data, searchType) {

    const $resultsDiv = $("#resultsDiv");
    const $resultContainer = $("#resultContainer");
    $resultsDiv.html("");

    const vehicles = Array.isArray(data) ? data : [data];

    vehicles.forEach((vehicle) => {
        const resultHTML = `
            <div class="card result-card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h5 class="card-title fw-bold">${vehicle.vehicleModel}</h5>
                            <p class="mb-2"><strong>Registration No:</strong> ${vehicle.regNo}</p>
                            <p class="mb-2"><strong>Vehicle Type:</strong> ${vehicle.vehicleType}</p>
                            <p class="mb-2"><strong>Fuel Type:</strong> ${vehicle.fuelType}</p>
                            <p class="mb-2"><strong>Station:</strong> ${vehicle.station}</p>
                        </div>
                        <div class="col-md-6">
                            <h5 class="card-title fw-bold">Owner Information</h5>
                            <p class="mb-2"><strong>Name:</strong> ${vehicle.firstName} ${vehicle.lastName}</p>
                            <p class="mb-2"><strong>NIC:</strong> ${vehicle.ownerNIC}</p>
                            <p class="mb-2"><strong>Email:</strong> ${vehicle.email}</p>
                        </div>
                    </div>
                    ${vehicle.qrCode ? `<div class="mt-3 text-center"><img src="${vehicle.qrCode}" alt="QR Code" style="max-width: 150px;"></div>` : ''}
                </div>
            </div>
        `;
        $resultsDiv.append(resultHTML);
    });

    $resultContainer.show();
}

function clearResults() {

    $("#resultContainer").hide();

    $("#resultsDiv").html("");
}

function showToast(message, type) {
    const $toastEl = $("#searchToast");
    const $toastContent = $("#toastContent");

    if ($toastEl.length && $toastContent.length) {

        $toastContent.text(message);
        
        $toastEl.removeClass('bg-success bg-danger text-white').addClass(`bg-${type} text-white`);

        const bsToast = new bootstrap.Toast($toastEl[0]);
        bsToast.show();
    }
}