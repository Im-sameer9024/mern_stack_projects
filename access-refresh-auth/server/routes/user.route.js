import express from "express";
import {
  Login,
  Signup,
  RefreshToken,
  GetUser,
} from "../controller/user.controller.js";
import { auth } from "../middleware/user.middleware.js";

const route = express.Router();

route.post("/signup", Signup);
route.post("/login", Login);
route.get("/refresh-token", RefreshToken);
route.get("/user", auth, GetUser);

export default route;
