import QRCode from "qrcode";
import connectDB from "../config/db.js";
import { ObjectId } from "mongodb";

export const registerVehicle = async (data) => {
    const db = await connectDB();
    const exists = await db
        .collection("vehicles")
        .findOne({ regNo: data.regNo });
    if (exists) return { error: "RegNo exists" };

    const qr = await QRCode.toDataURL(
        `RegNo: ${data.regNo} | NIC: ${data.ownerNIC}`,
    );
    const result = await db
        .collection("vehicles")
        .insertOne({ ...data, qrCode: qr, createdAt: new Date() });
    return { id: result.insertedId, qrCode: qr };
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
