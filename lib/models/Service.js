import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true,
    },
    icon: {
      type: String,
      default: 'Code',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    features: [String],
    technologies: [String],
    category: {
      type: String,
      default: 'Development',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.virtual('id').get(function () {
  return this.customId || this._id.toHexString();
});

ServiceSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
