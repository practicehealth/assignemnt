import express, { Express } from "express"
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import authRoutes from "./routes/local-auth/auth.js";
import bodyParser from 'body-parser';
import { SessionUtils } from "./utils/util.js";
import userRoutes from "./routes/api/user.js";
import ValidateSession from "./middlewares/session.js";
import cors from 'cors';

dotenv.config();
connectDb();

const app:Express = express();
const port:string = process.env.PORT || "2000";

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(SessionUtils.sessionizer());
app.use("/auth",  authRoutes )
app.use("/api", ValidateSession ,userRoutes);


app.listen(port);
console.log(`Server is listening on port: ${port}`);
