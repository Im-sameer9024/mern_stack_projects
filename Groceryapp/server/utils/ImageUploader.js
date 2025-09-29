import { v2 as cloudinary } from "cloudinary";

const ImageUploader = async (file, folder) => {
  try {
    const options = {
      folder: folder,
      resource_type: "image",
      width: 500,
      height: 500,
      crop: "limit",
      quality: "auto",
    };

    const result = await cloudinary.uploader.upload(file.tempFilePath, options);

    console.log("result of image upload", result);
    return result;
  } catch (error) {
    console.log("error occur when uploading image to cloudinary", error);
  }
};

export default ImageUploader;
