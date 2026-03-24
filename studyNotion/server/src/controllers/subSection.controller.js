import { cloudinary } from '../config/cloudinary.config.js';
import Section from '../models/section.model.js';
import SubSection from '../models/subSection.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { UploadVideo } from '../utils/uploadToCloudinary.js';
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';
import { formatDuration } from '../utils/formatDuration.js';

ffmpeg.setFfprobePath(ffprobeStatic.path);

export const getLocalDuration = (filePath) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(Math.floor(metadata.format.duration));
    });
  });

const processVideoUpload = async (filePath, subSectionId) => {
  try {
    const uploadDetails = await UploadVideo(filePath, process.env.CLOUDINARY_FOLDER_NAME_VIDEOS);

    const durationInSeconds = uploadDetails.duration
      ? Math.floor(uploadDetails.duration)
      : await getLocalDuration(filePath); // see below

    const formattedDuration = formatDuration(durationInSeconds); // remove the stray await

    await SubSection.findByIdAndUpdate(subSectionId, {
      videoUrl: uploadDetails.secure_url,
      video_publicId: uploadDetails.public_id,
      timeDuration: formattedDuration.toString(),
      durationInSeconds,
      videoStatus: 'ready',
    });
  } catch (error) {
    await SubSection.findByIdAndUpdate(subSectionId, { videoStatus: 'failed' });
    throw error;
  }
};

const CreateSubSection = async (req, res) => {
  try {
    const { title, description, sectionId } = req.validatedData;

    if (!req.file) {
      return ApiResponse(res, 400, null, 'Please upload a video');
    }

    const videoPath = req.file.path;

    const newSubSection = await SubSection.create({
      title,
      description,
      timeDuration: '00:00',
      durationInSeconds: 0,
      videoUrl: '',
      video_publicId: '',
      videoStatus: 'processing',
    });

    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    );

    ApiResponse(res, 200, newSubSection, 'SubSection created successfully');

    processVideoUpload(req.file.path, newSubSection._id).catch((err) => {
      console.error('Background upload failed:', err);
    });
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const UpdateSubSection = async (req, res) => {
  try {
    const { title, description, subSectionId } = req.validatedData;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return ApiError(res, 404, null, 'SubSection not found');
    }

    // 🟢 CASE: New video uploaded
    if (req.file) {
      // delete old video (optional: can also move to background)
      if (subSection.video_publicId) {
        await cloudinary.uploader.destroy(subSection.video_publicId, {
          resource_type: 'video',
        });
      }

      // mark processing
      subSection.videoStatus = 'processing';
      subSection.videoUrl = '';
      subSection.video_publicId = '';
    }

    // 🟢 Update text
    subSection.title = title;
    subSection.description = description;

    await subSection.save();

    // ✅ Send response immediately
    ApiResponse(res, 200, subSection, 'SubSection update started');

    // 🔥 BACKGROUND VIDEO PROCESSING
    if (req.file) {
      processVideoUpload(req.file.path, subSection._id).catch((err) => {
        console.error('Background update upload failed:', err);
      });
    }
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    const subSection = await SubSection.findById(subSectionId);

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

    ApiResponse(res, 200, subSection, 'SubSection deleted successfully');
    await cloudinary.uploader.destroy(subSection.video_publicId, {
      resource_type: 'video',
    });
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateSubSection, UpdateSubSection, DeleteSubSection };
