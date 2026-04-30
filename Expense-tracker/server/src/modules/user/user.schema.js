import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: '',
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({
  resetPasswordToken: 1,
  resetPasswordExpires: 1,
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  // Avoid re-hashing already-hashed passwords
  if (typeof this.password === 'string' && this.password.startsWith('$2')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User;
