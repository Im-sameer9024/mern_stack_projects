import { v2 as cloudinary } from 'cloudinary';

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Cloudinary credentials are missing in environment variables');
}

const ConnectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return {
      success: true,
      message: 'Cloudinary connected successfully',
    };
  } catch (error) {
    console.log('Error occur in cloudinary config', error);
    return {
      success: false,
      message: 'Error in Cloudinary config',
    };
  }
};

export { ConnectCloudinary,cloudinary };
