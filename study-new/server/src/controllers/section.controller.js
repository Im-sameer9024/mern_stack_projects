import Course from '../models/course.model.js';
import Section from '../models/section.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const CreateSection = async (req, res) => {
  try {
    const { name, courseId } = req.body;

    const newSection = await Section.create({
      name: name,
    });

    // update course schema

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          sections: newSection._id,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, null, 'Section created successfully');
  } catch (error) {
    return ApiResponse(res, 500, null, error.message, error);
  }
};

const UpdateSection = async (req, res) => {
  try {
    const { name, sectionId } = req.body;

    await Section.findByIdAndUpdate(
      sectionId,
      {
        name: name,
      },
      { new: true }
    );

    return ApiResponse(res, 200, null, 'Section updated successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

const DeleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    await Section.findByIdAndDelete(sectionId);

    await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          sections: sectionId,
        },
      },
      { new: true }
    );

    return ApiResponse(res, 200, null, 'Section deleted successfully');
  } catch (error) {
    return ApiError(res, 500, null, error.message, error);
  }
};

export { CreateSection, UpdateSection, DeleteSection, GetAllSections };
