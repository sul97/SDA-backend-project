import mongoose from "mongoose";
import { dev } from ".";

export const connectDB = async () => {
  try {
    //mongoose.set("strictQuery", true);
    await mongoose.connect(dev.db.url);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
}