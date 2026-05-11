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
        vehicleType: document.getElementById("vehicleType").value,
        email: document.getElementById("email").value.trim()
    };

    
    for (const key in formData) {
        if (!formData[key]) {
            console.log("yeas")
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
            console.log("Registration successful:", response);
            showToast("Registration successful!", "success");

            setTimeout(() => {
                window.location.href = `../pages/QRcodePage.html?id=${regNoInput}`;
            }, 1500); 
        },
        error: function(xhr) {
            console.log("Registration failed:", xhr.responseJSON);
            const errorMsg = xhr.responseJSON && xhr.responseJSON.error ? xhr.responseJSON.error : "Registration failed. Please try again.";
            showToast(errorMsg, "danger");
        }
    });
}

function showToast(message, type) {
    const toastEl = document.getElementById('regToast');
    const toastContent = document.getElementById('toastContent'); 

    if (toastEl && toastContent) {
        toastContent.textContent = message;
        
    
        toastEl.classList.remove('bg-success', 'bg-danger', 'text-white');
        toastEl.classList.add(`bg-${type}`, 'text-white');

        const bsToast = new bootstrap.Toast(toastEl);
        bsToast.show();
    }
}