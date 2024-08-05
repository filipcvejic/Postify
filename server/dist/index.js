import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
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
app.use("/", router);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
