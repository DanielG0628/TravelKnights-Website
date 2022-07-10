import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  phone: String,
  states: Object,
  trips: Object,
  secretanswer: String,
});

export default mongoose.model('users', userSchema);
