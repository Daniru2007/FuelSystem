import * as VehicleService from '../services/vehicleService.js';

const handle = async (fn, req, res) => { try { const r = await fn(req.params); return r.error ? res.status(r.status || 400).json(r) : res.json({ data: r }); } catch (e) { res.status(500).json({ error: 'Error' }); } };

export const registerVehicle = (req, res) => handle(() => VehicleService.registerVehicle(req.body), req, res);
export const getQRCodeByRegNo = (req, res) => handle((p) => VehicleService.getQRCodeByRegNo(p.regNo), req, res);
export const getVehicleById = (req, res) => handle((p) => VehicleService.getVehicleById(p.id), req, res);
export const searchByNIC = (req, res) => handle((p) => VehicleService.searchByNIC(p.nic), req, res);
export const searchByRegNo = (req, res) => handle((p) => VehicleService.searchByRegNo(p.regNo), req, res);