import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute";
import { connectDB } from "./config/db";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || "";

// create express application object

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-Commerce API Server");
});

// server

connectDB(MONGO_URI);
app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`);
});
