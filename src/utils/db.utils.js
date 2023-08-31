import mongoose from "mongoose";
import colors from "colors";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to MongoDB`.bgGreen.white);
  } catch (error) {
    console.log(`Error while MongoDB connection: ${error}`.bgRed.white);
  }
};
