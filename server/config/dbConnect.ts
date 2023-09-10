import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", true);

const mongo_uri = process.env.MONGO_DB_URI || 'mongodb+srv://asadansari:asadansari@asadansaricluster.q0lpgva.mongodb.net/healthcare?retryWrites=true&w=majority';


const connectDb: Function = (): void => {
  mongoose
    .connect(`${mongo_uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((conn) => {
      console.log(`Connected to mongoose on ${conn.connection.host} `);
    });
};

export default connectDb;