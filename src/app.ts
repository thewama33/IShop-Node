import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import db from "./config/db";
import authRoute from "./routes/auth.routes";
import addressesRoute from "./routes/addresses.routes";
const app = express();

// Middlewraes
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api", authRoute);
app.use("/api", addressesRoute);

// 404 NOT FOUND Handler
app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    code: res.statusCode,
    message: "Not Found",
  });
});

db.then(() => {
  app.listen(3000, () => {
    console.log("Server Started Successfully http://localhost:3000");
  });
});
