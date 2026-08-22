import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      index: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Applicant email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Applicant phone number is required'],
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
    },
    resume: {
      type: String,
      required: [true, 'Resume link/URL is required'],
      trim: true,
    },
    coverLetter: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewing', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'],
      default: 'Pending',
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
