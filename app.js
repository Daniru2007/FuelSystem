import express from 'express';
import cors from 'cors';
import vehicleRoutes from './server/routes/vehicleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);

app.get('/', (req, res) => {
    res.send('Fuel System API is running...');
});

export default app;
