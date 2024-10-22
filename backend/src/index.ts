// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// import authRoute from "./routes/auth";
// import { connectDB } from "./config/db";
// import { sendEmail } from "./utils/sendEmail";
// import categoryRoute from "./routes/category";
// import productRoute from "./routes/product";
// import cartRoute from "./routes/cart";

// const MONGO_URI = process.env.MONGO_URI || "";
// const PORT = process.env.PORT || "";

// // create express application object

// const app = express();

// // middlewares
// app.use(cors());
// app.use(express.json());
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/category", categoryRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/carts", cartRoute);

// app.get("/", async (req: Request, res: Response) => {
//   const rndOtp = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(4, "0");
//   sendEmail("", rndOtp);
//   res.send("Welcome E-Commerce API Server");
// });

// // server

// connectDB(MONGO_URI);
// app.listen(PORT, () => {
//   console.log(`Server is running at localhost:${PORT}`);
// });
