import "dotenv/config.js";
import express from "express";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRoute from "./routes/user.route.js";

const app = express();

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
