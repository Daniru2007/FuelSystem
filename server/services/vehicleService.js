import QRCode from 'qrcode';
import connectDB from '../config/db.js';


export const registerVehicle = async (vehicleData) => {
  
        const db = await connectDB();
        const existingVehicle = await db.collection('vehicles').findOne({ regNo: vehicleData.regNo });
        if (existingVehicle) {
            return { error: "Vehicle with this registration number already exists" };
        }

        const qrContent = `RegNo: ${vehicleData.regNo} | NIC: ${vehicleData.ownerNIC} | Fuel: ${vehicleData.fuelType}`;
        const generatedQR = await QRCode.toDataURL(qrContent);

        const newVehicle = {
           ...vehicleData,
            qrCode: generatedQR,
            createdAt: new Date()
        }
        const result = await db.collection('vehicles').insertOne(newVehicle);
        return {id: result.insertedId, qrCode: generatedQR};
    }
