import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URI;
console.log(url)
const client = new MongoClient(url);

const dbName = 'fuelsystem'; 
let db;

export default async function connectDB() {
    if (db) return db;
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        
        await client.connect();
        
        console.log("✅ Connected to MongoDB Atlas successfully!");
        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        throw err; 
    }
}