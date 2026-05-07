import 'dotenv/config'; 
import express from 'express';
import connectDB from './server/config/db.js'; 


const app = express();
app.use(express.json());



const startServer = async () => {
    try {
        await connectDB(); 
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Fuel QR Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Critical failure:", err);
    }
};

startServer();