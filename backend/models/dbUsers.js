import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// NOTE for Daniel:
// added the verified attribute to user
// I'm also thinking we do not need to
// store the user's phone number since
// we have not made a plan to use it in
// any way?
// We should talk about this later
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  states: Array,
  verified: {
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
