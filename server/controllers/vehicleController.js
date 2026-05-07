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