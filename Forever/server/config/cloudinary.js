import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js";

const cloudinaryConnect = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    console.log("cloudinary connected");
  } catch (error) {
    console.log("error in connecting to cloudinary config", error);
  }
};

export default cloudinaryConnect;
