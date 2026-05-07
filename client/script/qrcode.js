document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleId = urlParams.get('id'); 

    if (vehicleId) {
        fetch(`http://localhost:3000/api/vehicles/qrcode/${vehicleId}`)
            .then(response => {
                if (!response.ok) throw new Error('Vehicle not found');
                return response.json();
                console.log(response);
            })
            .then(result => {
                const data = result.data; 


              
                console.log('QR Content:', data);
                const qrContent = JSON.stringify({
                    
                    vNo: data.regNo,
                    fType: data.fuelType,
                    type: data.vehicleType
                });

                setDetails(data._id)


                const qrElement = document.getElementById('qrCode');
                qrElement.innerHTML = `<img src="${data.qrCode}" alt="QR Code" style="width: 200px; height: 200px;" />`;

  
                
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error: ' + error.message);
            });
    } else {
        alert('No registration number found in URL. Use ?id=ABC-1234');
    }

        document.getElementById('downloadBtn').addEventListener('click', downloadQRCode);

        




});


function downloadQRCode() {
    const qrElement = document.getElementById('qrCode');
    if (!qrElement) {
        alert('QR code not found!');
        return;
    }
    html2canvas(qrElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'qr_code.png';
        link.href = canvas.toDataURL();
        link.click();
    }
    ).catch(err => {
        console.error('Error generating QR code image:', err);
        alert('Failed to download QR code. Please try again.');
    });
}

function setDetails(objectId){
    fetch(`http://localhost:3000/api/vehicles/${objectId}`)
    .then(response => {
        if (!response.ok) throw new Error('Vehicle not found');
        return response.json();
    })
    .then(data => {
        document.getElementById('ownerNIC').textContent = data.ownerNIC || 'N/A';
        document.getElementById('vehicleNumber').textContent = data.regNo || data.vehicleNumber;
        document.getElementById('vehicleType').textContent = data.vehicleType || data.type;
        document.getElementById('fuelType').textContent = data.fuelType;
    })
    .catch(error => {
        console.error('Error fetching vehicle details:', error);
        alert('Error fetching vehicle details: ' + error.message);
    });
}