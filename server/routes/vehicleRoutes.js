// initiate express router

import express from 'express';
import { registerVehicle } from '../controllers/vehicleController.js';
const router = express.Router();


router.post('/register', registerVehicle);


export default router;