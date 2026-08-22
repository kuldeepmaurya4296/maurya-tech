import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['user', 'company', 'sales'],
      required: true,
      default: 'user',
      index: true,
    },
    // User fields
    name: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    subject: String,
    message: String,

    // Company fields
    contactName: String,
    workEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    companyName: String,
    jobTitle: String,
    service: String,
    budget: String,
    details: String,

    // Sales fields
    fullName: String,
    officialEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    organization: String,
    partnershipType: String,

    status: {
      type: String,
      enum: ['New', 'In Progress', 'Responded', 'Closed'],
      default: 'New',
      index: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
