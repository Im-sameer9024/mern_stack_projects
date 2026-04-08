import mongoose from "mongoose";

if (!process.env.MONGO_DB_URL) {
  console.error("MONGO_DB_URL is not defined in environment variables");
}

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
      process.exit(1);
    });
};


export default connectDB;
