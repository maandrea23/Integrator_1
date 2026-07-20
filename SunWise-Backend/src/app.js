import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import estimateRoutes from "./routes/estimateRoutes.js";
import installerRoutes from "./routes/installerRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import { errorHandler, notFound } from "./middlewares/errors.js";

const app = express();
const productionOrigins = (process.env.FRONTEND_URL || "http://localhost:5173").split(",").map((origin) => origin.trim());
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? productionOrigins : true,
  credentials: false,
}));
app.use(express.json({ limit: "1mb" }));
app.get("/api", (_req, res) => res.json({
  name: "SunWise API",
  status: "ok",
  version: "1.0.0",
  documentation: {
    health: "GET /api/health",
    login: "POST /api/auth/login",
    register: "POST /api/auth/register",
    catalog: "GET /api/catalog/products",
  },
}));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/estimates", estimateRoutes);
app.use("/api/installers", installerRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/catalog", catalogRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
