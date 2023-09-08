import express, { Request, Response } from "express";
import config from "config";
import connectDB from "./config/mongo";
import logger from "./middleware/logger";
import session from "./middleware/session";
import router from "./routes";
import Logging from "./lib/color";
import cors from "./config/cors";
import cookieParser from "cookie-parser"

const PORT = config.get<number>("PORT");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors)
app.use(logger);
app.use(session);

app.use(router)

const start = async () => {
  connectDB().then((res) => {
    if (res) {
      Logging.info(`Mongo is successfully connected!`);
    }
    app.listen(PORT, () => {
      Logging.info(`http://localhost:${PORT}`);
    });
  });
};

start();
