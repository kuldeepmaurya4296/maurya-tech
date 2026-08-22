import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      index: true,
    },
    referrer: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    device: {
      type: String,
      enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
      default: 'Desktop',
    },
    browser: {
      type: String,
      default: '',
    },
    os: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'India',
    },
    ipHash: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

AnalyticsSchema.index({ createdAt: -1 });

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
