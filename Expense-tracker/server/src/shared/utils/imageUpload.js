import { cloudinary } from '../../config/cloudinary.js';

export const UploadImageToCloudinary = async (file) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'expense-tracker',
            resource_type: 'image',
            public_id: `user_${Date.now()}`,
            format: 'webp',
            quality: 'auto',
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(file);
    });
  } catch (error) {
    console.log('Error in imageUploader function', error);
    throw new Error('Image upload failed');
  }
};
