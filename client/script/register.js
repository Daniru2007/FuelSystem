document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); 
            register(); 
        });
    }
});

function register() {

    const regNoInput = document.getElementById("regNo").value.trim();
    
    const formData = {
        regNo: regNoInput,
        fuelType: document.getElementById("fuelType").value,
        vehicleModel: document.getElementById("model").value.trim(),
        station: document.getElementById("station").value.trim(),
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        ownerNIC: document.getElementById("ownerNIC").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    // Validation
    for (const key in formData) {
        if (!formData[key]) {
            showToast("Please fill in all fields!", "danger");
            return;
        }
    }

    $.ajax({
        url: "http://localhost:3000/api/vehicles/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(formData), 
        success: function(response) {
            showToast("Registration successful!", "success");

         
            setTimeout(() => {
                window.location.href = `../pages/QRcodePage.html?id=${regNoInput}`;
            }, 1500); 
        },
        error: function(xhr) {
            const errorMsg = xhr.responseJSON ? xhr.responseJSON.message : "Registration failed!";
            showToast(errorMsg, "danger");
        }
    });
}

function showToast(message, type) {
    const toastEl = document.getElementById('regToast');
    const toastMessage = document.getElementById('toastMessage');

    if (toastEl && toastMessage) {
        toastMessage.textContent = message;
        toastEl.classList.remove('bg-dark', 'bg-success', 'bg-danger');
        toastEl.classList.add(`bg-${type}`);

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }
}