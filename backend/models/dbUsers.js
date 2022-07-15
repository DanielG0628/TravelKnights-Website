import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  states: Object,
  secretanswer: String,
});

export default mongoose.model('users', userSchema);
