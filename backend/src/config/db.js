import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully");
  } catch {
    console.error("Error:", error);
    process.exit(1);
  }
};
