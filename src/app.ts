import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import globalErrorHandler from "./Middlewares/GlobalErrorHandler";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

// Connect to the database
connectDB();

// Route handlers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// Place error-handling middleware **after** the route handlers
// app.use(globalErrorHandler);

export default app;
