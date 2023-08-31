import express, { Express, Request, Response } from "express"
import dotenv from "dotenv";
import connectDb from "./configs/db.js";
import Timeline from "./models/Timeline.js";
import authRoutes from "./routes/local-auth/auth.js";
import bodyParser from 'body-parser';
import { SessionUtils } from "./utils/util.js";
import userRoutes from "./routes/api/user.js";
import ValidateSession from "./middlewares/session.js";

dotenv.config();
connectDb();

const app:Express = express();
const port:string = process.env.PORT || "2000";

app.use(bodyParser.json());
app.use(SessionUtils.sessionizer());
app.use("/auth",  authRoutes )
app.use("/api", ValidateSession ,userRoutes);



app.get("/data", async( _: Request, res: Response ) => {
    const items = await Timeline.find({});
    res.send(items);
})


app.listen(port);
console.log(`Server is listening on port: ${port}`);
