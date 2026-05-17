import express from "express";
import {
    registerVehicle,
    getQRCodeByRegNo,
    getVehicleById,
    searchByNIC,
    searchByRegNo,
    findNearestStation,
    updateByNIC,
} from "../controllers/vehicleController.js";
const router = express.Router();

router.post("/register", registerVehicle);
router.get("/qrcode/:regNo", getQRCodeByRegNo);
router.get("/search/nic/:nic", searchByNIC);
router.get("/search/regno/:regNo", searchByRegNo);
router.get("/nearest-station/:longitude/:latitude", findNearestStation);
router.get("/:id", getVehicleById);
router.put("/update/nic/:nic", updateByNIC);

export default router;
