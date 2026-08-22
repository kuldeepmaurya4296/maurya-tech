import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'admin',
    },
    avatar: {
      type: String,
      default: '',
    },
    // Enterprise Security: DB-backed account lockout
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    // Enterprise Security: Admin Multi-Factor Authentication (2FA)
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
      select: false,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property to check if account is currently locked
UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
