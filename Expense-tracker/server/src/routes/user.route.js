import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { SignupValidationSchema } from "../validator/user.validationSchema.js";
import { SignUp } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/signup", validate(SignupValidationSchema), SignUp);

export default route;
