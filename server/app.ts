import express, { NextFunction, Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import { logger } from "./config/logger";
const app = express();

if (process.env.ENVIRONMENT !== "PRODUCTION") {
  dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });
}

const corsOptions = {
  origin: 'http://localhost:5173/',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'application/json', 'Access-Control-Allow-Origin']
};


//------------cors--------------------
app.use(cors());
// app.options('/auth', cors(corsOptions))
// app.use(cors(corsOptions));

app.use(session({
  secret: 'secretSessionisAMyth:001092', resave: true, saveUninitialized: true, cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
  },
}));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Adding rourtes
import TimeLineRouter from "./routes/TimeLine-Routes";
import UserRouter from "./routes/User-Routes";
import ErrorHandler from "./utils/errorHandler";

app.use("/auth", UserRouter);
app.use("/api/v1", TimeLineRouter);

// Error handling middleware
app.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;


  //Wrong mongo db id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400)
  }

  //Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, 400)
  }

  //Wrong JWT error 
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid , try again !`;
    err = new ErrorHandler(message, 400)
  }

  //Jwt exxpire error
  if (err.name === "TokenExpireError") {
    const message = `Json web token is Expired , try again !`;
    err = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

export default app;
