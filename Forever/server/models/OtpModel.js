import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";

const OtpModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 5 minutes
    },
  },
  {
    minimize: true,
    timestamps: true,
  }
);

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verify Your Email",
      `Your verification code is ${otp}`
    );
    console.log("mailResponse sent", mailResponse);
    return mailResponse;
  } catch (error) {
    console.log("Error occur while sending mail", error);
  }
}

OtpModel.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

const Otp = mongoose.model("Otp", OtpModel);

export default Otp;
