import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection',
      },
    ],
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  },
  { timestamps: true }
);

const Section = mongoose.model('Section', sectionSchema);
export default Section;
