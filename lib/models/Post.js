import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
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
    excerpt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Maurya Technologies Team',
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    category: {
      type: String,
      default: 'Technology',
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual('id').get(function () {
  return this.customId || this.slug || this._id.toHexString();
});

PostSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
