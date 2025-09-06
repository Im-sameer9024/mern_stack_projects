import Razorpay from "razorpay";
import "dotenv/config.js"

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export default instance;
