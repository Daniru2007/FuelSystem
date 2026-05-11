import 'dotenv/config'; 
import express from 'express';
import app from './app.js';
import connectDB from './server/config/db.js'; 





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