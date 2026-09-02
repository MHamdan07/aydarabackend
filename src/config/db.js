import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[AYDARA Backend] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[AYDARA Backend] MongoDB connection warning: ${error.message}. Running with high-performance persistent fallback store.`);
    isConnected = false;
  }
};

export const getDBStatus = () => isConnected;
