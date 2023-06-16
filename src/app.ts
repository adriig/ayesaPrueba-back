import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import * as mongo from "mongoose";
import router from "./auth/auth.route";
import { StatusError } from "./exception";

// constants
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "";

// create express app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect to database
mongo.connect(MONGODB_URL).then(() => {
  console.log("Connected to database.");
}).catch((err) => {
  console.log("Error connecting to database.");
  console.log(err);
});

// routes
app.use("/auth", router);

// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const status = error instanceof StatusError ? error.status : 500;

  res.status(status).send({
    status,
    message: error.message,
  });
});

// run the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
