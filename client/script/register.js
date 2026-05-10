function showTab(tab) {
    document.getElementById('registerTab').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('searchTab').style.display = tab === 'search' ? 'block' : 'none';
}

function register() {
    const regNo = document.getElementById('regNo').value.trim();
    const data = {
        regNo, fuelType: document.getElementById('fuelType').value,
        vehicleModel: document.getElementById('model').value.trim(),
        station: document.getElementById('station').value.trim(),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        ownerNIC: document.getElementById('ownerNIC').value.trim(),
        vehicleType: document.getElementById('vehicleType').value,
        email: document.getElementById('email').value.trim()
    };
    
    if (Object.values(data).some(v => !v)) {
        showToast('Fill all fields!', 'danger');
        return;
    }
    
    $.ajax({
        url: 'http://localhost:3000/api/vehicles/register', method: 'POST',
        contentType: 'application/json', data: JSON.stringify(data),
        success: () => {
            showToast('Registered!', 'success');
            setTimeout(() => window.location.href = `QRcodePage.html?id=${regNo}`, 1500);
        },
        error: (e) => showToast(e.responseJSON?.message || 'Error', 'danger')
    });
}

function search(type) {
    const val = document.getElementById(type === 'nic' ? 'searchNIC' : 'searchRegNo').value.trim();
    if (!val) { showToast('Enter value!', 'danger'); return; }
    
    $.ajax({
        url: `http://localhost:3000/api/vehicles/search/${type}/${val}`, method: 'GET',
        success: (r) => showResults(r.data),
        error: (e) => showToast(e.responseJSON?.message || 'Not found', 'danger')
    });
}

function showResults(vehicles) {
    if (!Array.isArray(vehicles)) vehicles = [vehicles];
    let html = vehicles.map(v => `<div class="p-2 mb-2 border rounded">
        <b>${v.regNo}</b> | ${v.firstName} ${v.lastName} | ${v.vehicleModel}
        <button class="btn btn-sm btn-info ms-2" onclick="viewQR('${v.regNo}')">QR</button>
    </div>`).join('');
    document.getElementById('results').innerHTML = html;
}

function viewQR(regNo) {window.location.href = `../pages/QRcodePage.html?id=${regNo}`; }

function showToast(msg, type) {
    let el = document.getElementById('regToast');
    el.textContent = msg;
    el.className = `toast bg-${type} text-white`;
    new bootstrap.Toast(el).show();
}