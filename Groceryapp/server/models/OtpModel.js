import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import { otpTemplate } from "../templates/otpVerification.js";

const OtpModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, //5 minutes
    },
  },
  { timestamps: true, minimize: true }
);

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verify Your Email on GreenCart Grocery App",
      otpTemplate(otp)
    );

    // console.log(
    //   "mail response is here in the sendVerificationEmail function",
    //   mailResponse
    // );

    return mailResponse;
  } catch (error) {
    console.log("Error occur while sending verification email",error);
  }
}

OtpModel.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default mongoose.model("Otp", OtpModel);
