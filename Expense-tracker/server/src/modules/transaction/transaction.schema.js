import mongoose from 'mongoose';
import { TransactionEnum } from '../../shared/utils/constants.js';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
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
    
    source: {
      type: String,
      required: true,
      trim:true
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ userId: 1, transactionType: 1 });
transactionSchema.index({ userId: 1, source: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
