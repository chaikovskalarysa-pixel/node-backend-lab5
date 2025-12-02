import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI не знайдено в .env файлі!");
  }

  try {
    await mongoose.connect(uri, {
      tls: true,
      tlsAllowInvalidCertificates: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Mongo error:", err.message || err);
    throw err;
  }
};
