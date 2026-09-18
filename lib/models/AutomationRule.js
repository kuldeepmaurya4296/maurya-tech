import mongoose from 'mongoose';

const AutomationRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      enum: ['IN', 'US', 'UK', 'GLOBAL'],
      default: 'IN',
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    clusterType: {
      type: String,
      enum: ['pillar', 'spoke', 'tool_guide'],
      default: 'spoke',
    },
    targetKeywords: {
      type: [String],
      default: [],
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    aiProvider: {
      type: String,
      enum: ['none', 'groq', 'gemini', 'ollama'],
      default: 'none',
    },
    mode: {
      type: String,
      enum: ['manual', 'assisted_review'],
      default: 'assisted_review',
    },
    relatedToolSlug: {
      type: String,
      default: '',
    },
    lastRunAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AutomationRule ||
  mongoose.model('AutomationRule', AutomationRuleSchema);
