import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  states: [
    {
      stateAbbreviation: String,
      cities: [
        {
          city: String,
          memories: [{ date: String, description: String, img: String }],
        },
      ],
    },
  ],
  emailToken:{
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
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

export default mongoose.model('Users', userSchema);
