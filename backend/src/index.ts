import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute";
import catRoute from "./routes/catRoute";
import proRoute from "./routes/proRoute";
import savedRoute from "./routes/savedRoute";
import compRoute from "./routes/compRoute";
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
app.use("/api/v1/cat", catRoute);
app.use("/api/v1", proRoute);
app.use("/api/v1", savedRoute);
app.use("/api/v1/comp", compRoute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-Commerce API Server");
});

// server

connectDB(MONGO_URI);
app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`);
});
