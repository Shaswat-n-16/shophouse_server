import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";
import { connectDB } from "./utils/db.utils.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from "cors";
dotenv.config();

connectDB();

const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("welcome to shophouse ecommerce app");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`.bgCyan.white);
});
