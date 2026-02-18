import cloudinary from '../config/cloudinary.config';
import Section from '../models/section.model';
import SubSection from '../models/subSection.model';
import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import { UploadToCloudinary } from '../utils/uploadToCloudinary';

const CreateSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration, sectionId } = req.body;

    const video = req.file?.buffer;

    const uploadDetails = await UploadToCloudinary(
      video,
      String(process.env.CLOUDINARY_FOLDER_NAME_VIDEOS),
      'video'
    );

    console.log('upload video details', uploadDetails);

    const newSubSection = await SubSection.create({
      title: title,
      description: description,
      timeDuration: timeDuration,
      videoUrl: uploadDetails.secure_url,
      publicId: uploadDetails.public_id,
    });

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: newSubSection._id,
        },
      },
      {
        new: true,
      }
    );

    return ApiResponse(res, 200, newSubSection, 'SubSection created successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateSubSection = async (req, res) => {
  try {
    const { title, description, timeDuration, subSectionId } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (req.file) {
      //delete old video
      await cloudinary.uploader.destroy(subSection.publicId, {
        resource_type: 'video',
      });

      //upload new video
      const uploadNewVideo = await UploadToCloudinary(
        req.file.buffer,
        String(process.env.CLOUDINARY_FOLDER_NAME_VIDEOS),
        'video'
      );

      subSection.videoUrl = uploadNewVideo.secure_url;
      subSection.publicId = uploadNewVideo.public_id;
    }

    subSection.title = title;
    subSection.description = description;
    subSection.timeDuration = timeDuration;

    await subSection.save();

    return ApiResponse(res, 200, subSection, 'SubSection updated successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    await cloudinary.uploader.destroy(subSection.publicId, {
      resource_type: 'video',
    });

    await SubSection.findByIdAndDelete(subSectionId);

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, null, 'SubSection deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateSubSection, UpdateSubSection, DeleteSubSection };
