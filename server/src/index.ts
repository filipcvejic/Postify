import { connectDB } from "./config/db";
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_API_BASE_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
