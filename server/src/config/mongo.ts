import mongoose from "mongoose";
import dotenv from "dotenv"
import Logging from "../lib/color";
dotenv.config()

// connect to NOSQL database
const connectDB = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_URI}`);
    return res;
  } catch (error) {
    Logging.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
