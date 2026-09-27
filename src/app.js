import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import otpRoutes from "./route/otp.route.js";
import connectDB from "./config/dbConnection.js";

const app = express()

app.use(helmet())
app.use(cors({
  origin: "*", // or replace "*" with your frontend cloudflared URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB();

app.use("/api", otpRoutes);

export default app;
