import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
