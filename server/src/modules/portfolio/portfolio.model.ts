import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balanceKGS: { type: Number, default: 0 },
  goldWeightG: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true },
  kgsAmount: { type: Number, required: true },
  goldAmountG: { type: Number, required: true },
  pricePerGram: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
