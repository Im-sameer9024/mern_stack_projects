import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((error) => {
      console.log("Error while connecting to database", error);
      process.exit(1);
    });
};

export default dbConnection;
