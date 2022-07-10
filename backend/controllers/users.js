import Users from '../models/dbUsers.js';

// API Logic
export const createUser = async (req, res) => {
  const post = req.body;
  const newUser = new Users(post);

  try {
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
