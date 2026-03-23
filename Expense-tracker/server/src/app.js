import express from "express";
import cors from "cors";


//------------------- import all routes here------------------- 

import userRoute from "./routes/user.route.js";


const app = express();



app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//------------------ mount all routes here------------------------ 

app.use("/api/v1/user",userRoute)

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to the Expense Tracker API",
  });
});

export default app;
