import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db";
import indexRouter from "../src/routes/index";
import usersRouter from "../src/routes/users";
import authRouter from "../src/routes/auth";
import cors from "cors";
// Initialize environment variables
dotenv.config();
// Initialize express application
const app = express();
// Set up CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Set up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(bodyParser.json());
// Connect to database
connectDB();
// Set up routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
// app.use(globalErrorHandler);
// Export the app
export default app;
