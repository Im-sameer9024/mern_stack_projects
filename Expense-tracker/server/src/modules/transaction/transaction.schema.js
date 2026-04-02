import mongoose from 'mongoose';
import { TransactionEnum } from '../../shared/utils/constants.js';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionId:{
        type:String,
        required:true
    },
    transactionType: {
      type: String,
      enum: TransactionEnum,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    transactionAmount: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
    },
    source: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
