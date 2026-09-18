import mongoose from 'mongoose';

const AutomationJobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    ruleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AutomationRule',
    },
    country: {
      type: String,
      default: 'IN',
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['queued', 'processing', 'needs_review', 'completed', 'failed'],
      default: 'queued',
      index: true,
    },
    draftPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    qualityScore: {
      type: Number,
      default: 0,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    logs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AutomationJob ||
  mongoose.model('AutomationJob', AutomationJobSchema);
