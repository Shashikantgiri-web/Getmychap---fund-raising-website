import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local')
}

// 1. Mongoose Connection (For your app models)
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        return await mongoose.connect(uri);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

// 2. Native MongoDB Client (Required for NextAuth Adapter)
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export { connectDB, clientPromise };
export default connectDB;
