import QRCode from 'qrcode';
import connectDB from '../config/db.js';
import { ObjectId } from 'mongodb';

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


export async function getQRCodeByRegNo(regNo) {
    const db = await connectDB();
    const vehicle = await db.collection('vehicles').findOne({ regNo });
    if (!vehicle) {
        return { error: "Vehicle not found", status: 404 };
    }

    return { qrCode: vehicle.qrCode, _id: vehicle._id };
}



export async function getVehicleById(id) {
    const db = await connectDB();
    if (!ObjectId.isValid(id)) {
        return { error: "Invalid vehicle ID", status: 400 };
    }
    const vehicle = await db.collection('vehicles').findOne({ _id: new ObjectId(id) });
    if (!vehicle) {
        return { error: "Vehicle not found", status: 404 };
    }

    return vehicle;
}


