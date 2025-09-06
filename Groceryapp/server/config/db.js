import mongoose from "mongoose";
import "dotenv/config.js";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.log("MONGODB_URL is not defined");
  process.exit(1);
}

const dbConnection = async () => {
  await mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("DB is connected successfully");
    })
    .catch((err) => {
      console.log("DB creates an error ", err);
      process.exit(1);
    });
};

export default dbConnection;
