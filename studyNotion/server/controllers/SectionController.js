import Section from "../models/SectionModel.js";
import Course from "../models/CourseModel.js";

const createSection = async (req, res) => {
  try {
    //----------- fetch Data----------
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //---------- create section----------

    const newSection = await Section.create({ sectionName: sectionName });

    //----------- update the courseContent in CourseModel----------

    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      newSection,
    });
  } catch (error) {
    console.log("error occur in createSection", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update section
const updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true },
    ).exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log("error in update section controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete section

const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    //delete section
    await Section.findByIdAndDelete(sectionId);

    const course = await Course.findOne({ courseContent: sectionId });

    if (course) {
      // remove the section from courseContent in course model
      await Course.findByIdAndUpdate(
        course._id,
        {
          $pull: {
            courseContent: sectionId,
          },
        },
        { new: true },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    console.log("error in delete section controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createSection, updateSection, deleteSection };
