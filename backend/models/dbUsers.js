import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  states: Array,
});

export default mongoose.model('users', userSchema);
