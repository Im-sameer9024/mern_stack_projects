import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import otpTemplate from "../templates/emailVerificationTemplate.js";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    otp: {
      type: String,
      trim: true,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 5 * 60,
    },
  },
  {
    timestamps: true,
    minimize: true,
  },
);

//a function to send email

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otpTemplate(otp),
    );
    console.log("Email send successfully", mailResponse);

    return mailResponse;
  } catch (error) {
    console.log("Error occur while sending email in OtpModel", error);
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

export default mongoose.model("Otp", otpSchema);
