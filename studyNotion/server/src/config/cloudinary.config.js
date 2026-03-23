import { v2 as cloudinary } from 'cloudinary';

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_CLOUD_API_KEY ||
  !process.env.CLOUDINARY_CLOUD_API_SECRET
) {
  throw new Error('Please provide all the cloudinary credentials');
}

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
      api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
      secure: true, // production level
    });
    console.log('Cloudinary Connect successfully ✅ ');
  } catch (error) {
    console.log('Error in connecting to cloudinary ', error);
  }
};

export { connectCloudinary, cloudinary };
