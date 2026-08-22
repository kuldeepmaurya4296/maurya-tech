import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    customId: {
      type: String,
      unique: true,
      sparse: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'SaaS Platforms',
      trim: true,
    },
    role: {
      type: String,
      default: 'Full Stack Development',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    fullDescription: {
      type: String,
      default: '',
    },
    problem: {
      type: String,
      default: '',
    },
    solution: {
      type: String,
      default: '',
    },
    keyFeatures: [
      {
        title: String,
        description: String,
        icon: { type: String, default: 'Zap' },
      },
    ],
    techStack: {
      frontend: [String],
      backend: [String],
      infrastructure: [String],
      tools: [String],
    },
    results: [String],
    thumbnail: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    desktopImages: [String],
    mobileImages: [String],
    isFeatured: {
      type: Boolean,
      default: false,
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

ProjectSchema.virtual('id').get(function () {
  return this.customId || this.slug || this._id.toHexString();
});

ProjectSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
