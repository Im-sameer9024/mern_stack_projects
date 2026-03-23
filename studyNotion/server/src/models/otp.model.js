import mongoose from 'mongoose';
import { mailSender } from '../utils/mailSender.js';
import otpTemplate from '../mail/templates/emailVerificationTemplate.js';
import bcrypt from 'bcrypt'

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, //5 minutes
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'Verification email from StudyNotion',
      otpTemplate(otp)
    );
    return mailResponse;
  } catch (error) {
    console.log('Error occur in sendVerificationEmail', error);
    throw error;
  }
}

otpSchema.pre('save', async function () {
  if (!this.isNew) return; // send only on creation
  try {
    await sendVerificationEmail(this.email, this.otp);
  } catch (error) {
    console.log('Error occur in presave hook in model', error);
    throw error;
  }
});

// ✅ Hash OTP before saving
otpSchema.pre('save', async function () {
  if (!this.isNew) return;
  this.otp = await bcrypt.hash(this.otp, 10);
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
