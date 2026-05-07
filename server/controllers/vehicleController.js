import * as VehicleService from '../services/vehicleService.js';


export const registerVehicle = async (req, res) => {
    try {

        const result = await VehicleService.registerVehicle(req.body);
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(201).json({ message: "Vehicle registered successfully", data: result });
    } catch (err) {
        console.error("Error in registerVehicle controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getQRCodeByRegNo = async (req, res) => {
    try {
        const regNo = req.params.regNo;
        const result = await VehicleService.getQRCodeByRegNo(regNo);
        if (result.error) {
            return res.status(result.status || 400).json({ message: result.error });
        }
        return res.status(200).json({ data: result });
    } catch (err) {
        console.error("Error in getQRCodeByRegNo controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getVehicleById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await VehicleService.getVehicleById(id);
        if (result.error) {
            return res.status(result.status || 404).json({ message: result.error });
        }
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error in getVehicleById controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}