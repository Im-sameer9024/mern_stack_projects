import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim:true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
      trim:true
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

incomeSchema.index({ userId: 1, date: -1 });
incomeSchema.index({ source: 1 });
incomeSchema.index({ createdAt: -1 });



const Income = mongoose.model('Income', incomeSchema);

export default Income;
