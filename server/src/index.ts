console.log("Hello Node !");
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose"
import dotenv from 'dotenv'
// database connection
import {connection} from "./configs/db"

// import routes file
import router from  './routes/api/router'

const DBUrl ="mongodb://127.0.0.1:27017/Helthcareapp";

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

dotenv.config();

// const Url =process.env.Url;

app.use(cors({credentials:true}));

app.use('/',router);

const PORT=5000;
app.listen(PORT,()=>console.log(`server is running on port no  ${PORT}`));

connection(DBUrl);










// const server=http.createServer(app);

// server.listen(8080,()=>{
//     console.log(`server is runnin on http://localhost:8080/`)
// })

// const Mongodburl="mongodb+srv://KaliNethunter69:79iXM5FRKUGTBNq9@project.jqavgqx.mongodb.net/?retryWrites=true&w=majority";


// mongoose.Promise=Promise;

// mongoose.connect(Mongodburl);
// mongoose.connection.on(`error`,(error,Error)=>{console.log(error)});