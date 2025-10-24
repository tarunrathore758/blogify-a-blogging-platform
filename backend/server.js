import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import blogsRoutes from "./routes/blogs.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors({
  origin: "http://localhost:5173" // frontend URL
}));
app.use(express.json({ limit: "5mb" }));

// ===== Serve uploads folder so images can be accessed =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// ===== DB connection =====
const mongo = process.env.MONGO_URI;
if (!mongo) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(mongo, { dbName: "blogify" })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
