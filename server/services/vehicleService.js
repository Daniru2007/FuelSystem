import QRCode from "qrcode";
import connectDB, { connectLocationsDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const registerVehicle = async (vehicleData) => {
    const db = await connectDB();
    const existingVehicle = await db
        .collection("vehicles")
        .findOne({ regNo: vehicleData.regNo });
    const existingNIC = await db
        .collection("vehicles")
        .findOne({ ownerNIC: vehicleData.ownerNIC });
    const numberPart = vehicleData.ownerNIC.substring(0, 9);
    const lastLetter = vehicleData.ownerNIC.slice(-1).toUpperCase();

    const validateNIC =
        !isNaN(numberPart) &&
        numberPart.length === 9 &&
        (lastLetter === "V" || lastLetter === "X");
    if (!validateNIC) {
        return { error: "Invalid NIC format." };
    }
    if (existingNIC) {
        return { error: "A vehicle with this owner NIC already exists" };
    }
    if (existingVehicle) {
        return {
            error: "Vehicle with this registration number already exists",
        };
    } else {
        const qrContent = `RegNo: ${vehicleData.regNo} | NIC: ${vehicleData.ownerNIC} | Fuel: ${vehicleData.fuelType}`;
        const generatedQR = await QRCode.toDataURL(qrContent);

        const newVehicle = {
            ...vehicleData,
            qrCode: generatedQR,
            createdAt: new Date(),
        };
        const result = await db.collection("vehicles").insertOne(newVehicle);
        return { id: result.insertedId, qrCode: generatedQR };
    }
};

export const getQRCodeByRegNo = async (regNo) => {
    const db = await connectDB();
    const v = await db.collection("vehicles").findOne({ regNo });
    return v
        ? { qrCode: v.qrCode, _id: v._id }
        : { error: "Not found", status: 404 };
};

export const searchByNIC = async (nic) => {
    const db = await connectDB();
    const v = await db.collection("vehicles").find({ ownerNIC: nic }).toArray();
    return v.length > 0 ? v : { error: "Not found", status: 404 };
};

export const searchByRegNo = async (regNo) => {
    const db = await connectDB();
    const v = await db.collection("vehicles").findOne({ regNo });
    return v ? v : { error: "Not found", status: 404 };
};

export const getVehicleById = async (id) => {
    const db = await connectDB();
    if (!ObjectId.isValid(id)) return { error: "Invalid ID", status: 400 };
    const v = await db
        .collection("vehicles")
        .findOne({ _id: new ObjectId(id) });
    return v ? v : { error: "Not found", status: 404 };
};

export const updateByNIC = async (nic, data) => {
    const db = await connectDB();
    const v = await db
        .collection("vehicles")
        .updateOne({ ownerNIC: nic }, { $set: data });
    return v ? v : { error: "Not found", status: 404 };
};

export const findNearestStation = async (longitude, latitude) => {
    const db = await connectLocationsDB();

    const station = await db.collection("stations").findOne({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
            },
        },
    });

    return station ? station : { error: "No station found", status: 404 };
};
