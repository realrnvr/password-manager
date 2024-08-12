import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express from "express";
const app = express();

import cors from "cors";
import axios from "axios";

import { notFound } from "./middleware/notFound.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import connectDB from "./database/connectDB.js";

import authRouter from "./routes/auth.js";
import managerRouter from "./routes/manager.js";

import auth from "./middleware/authorization.js";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Spining!");
});

app.get("/api/v1/password", async (req, res) => {
  const response = await axios.get(
    "https://api.api-ninjas.com/v1/passwordgenerator?length=16",
    {
      headers: {
        "X-Api-Key": "xPrPA7wQGsOtB0PcqmDZBg==X5Gn3pYyjufZrUwi",
      },
    }
  );
  res.status(200).json(response.data);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/manager", auth, managerRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening to PORT ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
})();
