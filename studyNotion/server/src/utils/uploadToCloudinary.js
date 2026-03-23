import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// export const UploadToCloudinary = async (
//   filePath,
//   folder,
//   resourceType = 'auto',

// ) => {
//   try {
//     const options = {
//       folder,
//       resource_type: resourceType,
//        transformation: [
//           { height: 400, crop: "scale" },
//           { quality: "auto:good" },
//           { fetch_format: "auto" }
//         ]
//     };

//     //--------------- add webhook only for video file or big file -------------
//     let result;
//     if (resourceType === 'video') {
//       options.eager = [
//         {
//           width: 300,
//           height: 300,
//           crop: 'pad',
//         },
//       ];
//       options.eager_async = true;
//       options.notification_url = `${process.env.BASE_URL}/api/webhook/cloudinary`;
//       result = await cloudinary.uploader.upload_large(filePath, options);
//     }else{
//       result = await cloudinary.uploader.upload(filePath, options);
//     }

//     // delete file after upload
//     await fs.promises.unlink(filePath);

//     return result;
//   } catch (error) {
//     // delete file if error happens
//     if (fs.existsSync(filePath)) {
//       await fs.promises.unlink(filePath);
//     }
//     throw error;
//   }
// };

export const UploadImage = (fileBuffer, folder, resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        transformation: [
          { quality: 'auto' }, //  auto-compress without quality loss
          { fetch_format: 'auto' }, //  serve webp/avif automatically
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer); // ✅ no streamifier needed
  });
};

export const UploadVideo = async (filePath, folder) => {
  try {
    const stats = await fs.promises.stat(filePath);
    const fileSize = stats.size;
    const isLarge = fileSize > 50 * 1024 * 1024;

    const uploadOptions = {
      folder,
      resource_type: 'video',
      eager: [{ width: 300, height: 300, crop: 'pad' }],
      eager_async: true,
      notification_url: `${process.env.BASE_URL}/api/webhook/cloudinary`,
    };

    const result = isLarge
      ? await cloudinary.uploader.upload_large(filePath, {
          ...uploadOptions,
          chunk_size: 6_000_000,
        })
      : await cloudinary.uploader.upload(filePath, uploadOptions);

    await fs.promises.unlink(filePath);
    return result;
  } catch (error) {
    await fs.promises.unlink(filePath).catch(() => {}); // silently ignore if already gone
    throw error;
  }
};
