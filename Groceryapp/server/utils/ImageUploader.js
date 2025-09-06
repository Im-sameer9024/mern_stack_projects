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
    return result;
  } catch (error) {
    console.log("error occur when uploading image to cloudinary", error);
    return res.status(500).json({
      success: false,
      message: "Error occur when uploading image to cloudinary",
    });
  }
};


export default ImageUploader;
