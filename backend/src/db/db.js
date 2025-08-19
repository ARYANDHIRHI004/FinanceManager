import mongoose from "mongoose";
import { DB_NAME, enviroment } from "../constents.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${enviroment.MONGODB_URL}/${DB_NAME}`,
    );
    console.log(
      `MongoDB connected successfully host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`mongoDB connection failed ${error}`);
  }
};

export default connectDB;
