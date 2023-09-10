import app from "./app";
import connectDb from "./config/dbConnect";

const PORT: Number | String = process.env.PORT || 4000;

connectDb();

const serverOn: Function = (): void => {
  app.listen(PORT, (): void => {
    console.log(`App is listening to http://localhost:${PORT}`);
  });
};

serverOn();