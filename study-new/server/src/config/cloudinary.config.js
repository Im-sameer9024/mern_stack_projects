import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    });
    console.log('Cloudinary Connect successfully ✅ ');
  } catch (error) {
    throw new Error('Error in connecting to cloudinary');
  }
};

export default connectCloudinary;
