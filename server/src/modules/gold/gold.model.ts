import mongoose from 'mongoose';

const goldPriceSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  currency: { type: String, default: 'KGS' },
  timestamp: { type: Date, default: Date.now },
});

export const GoldPrice = mongoose.model('GoldPrice', goldPriceSchema);
