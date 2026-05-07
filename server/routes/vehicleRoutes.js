// initiate express router

import express from 'express';
import { registerVehicle, getQRCodeByRegNo, getVehicleById } from '../controllers/vehicleController.js';
const router = express.Router();


router.post('/register', registerVehicle);
router.get('/qrcode/:regNo', getQRCodeByRegNo);
router.get('/:id', getVehicleById);


export default router;