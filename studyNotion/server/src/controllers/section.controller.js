import Course from '../models/course.model.js';
import Section from '../models/section.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const CreateSection = async (req, res) => {
  try {
    const { name, courseId } = req.body;

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Course id is required');
    }

    const newSection = await Section.create({
      name: name,
      courseId: courseId,
    });

    // update course schema

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, newSection, 'Section created successfully');
  } catch (error) {
    return ApiResponse(res, 500, null, error.message, error);
  }
};

const UpdateSection = async (req, res) => {
  try {
    const { name, sectionId } = req.body;

    if (!sectionId) {
      return ApiResponse(res, 400, null, 'Section id is required');
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        name: name,
      },
      { new: true }
    );

    return ApiResponse(res, 200, updatedSection, 'Section updated successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    const deleteSection = await Section.findByIdAndDelete(sectionId);

    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, deleteSection, 'Section deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const GetAllSections = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return ApiResponse(res, 400, null, 'Course id is required');
    }

    const sections = await Section.find({ courseId: courseId }).populate('subSection').lean();

    return ApiResponse(res, 200, sections, 'Sections fetched successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateSection, UpdateSection, DeleteSection, GetAllSections };
