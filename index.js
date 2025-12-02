import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./services/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Додаємо цей рядок — головна сторінка
app.get("/", (req, res) => {
  res.json({ message: "MyStore API працює!", time: new Date().toISOString() });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Підключення до MongoDB
connectDB().catch(err => {
  console.error("Не вдалося підключитися до MongoDB", err);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on https://node-backend-lab5.onrender.com`);
  console.log(`PORT: ${PORT}`);
});
