import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const verificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

// NOTE for Daniel:
// The two awaits below are saying they have no effect
// maybe the actions are not async?
// We need to fix this
verificationTokenSchema.pre('save', async function (next) {
  if (this.isModified('token')) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }

  next();
});

verificationTokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

export default mongoose.model('VerificationToken', verificationTokenSchema);
