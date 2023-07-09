import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./Config/db.js";
import Router from "./Router/Index.js" 
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
// ==========Congfigs=========
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDb();
// =========End Configs ======
app.use("/api", Router);
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});
app.listen(process.env.PORT, () => {
  console.log("server Running on " + process.env.PORT);
});