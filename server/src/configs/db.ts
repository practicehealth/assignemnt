import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config();

// const URL =process.env.Url;


export const connection = async (URL:string) => {
    // const URL = process.env.DB_URL;
    try {

        await mongoose.connect(URL);
        console.log("database connecting sucessfully");

    } catch (error) {
        console.log("error occurs while connecting database", error);

    }
}