import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  states: Array,
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};

export default mongoose.model('users', userSchema);
