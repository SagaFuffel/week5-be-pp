const User = require("../models/userModel");
const moongoose = require("mongoose");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  }
  catch (error) {
    res.status(500).json({message: "Could not create.", error: error.message})
  }
};

// POST /users
const createUser = async (req, res) => {
  const newUser = await User.create({ ...req.body }); // Spread the req.body object

  try {
    if (newUser) {
      res.status(201).json(newUser); // 201 Created
    } else {
      // Handle error (e.g., failed to create user)
      res.status(400).json({ message: "Invalid user data. Ensure all fields are provided, including 'season' and 'specialOffer'." });
    }
  }

  catch (error) {
    res.status(500).json({message: "Could not create.", error: error.message})
  }
  
};
 
// GET /users/:userId
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {

    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({message: "Could not find by id.", error: error.message})
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID" });

  }

  const updatedUser = await User.findBYIdAndUpdate(userId, { ...req.body }); // Spread the req.body object

  try {
    if (updatedUser) {
    res.json(updatedUser);
    } else {
      // Handle update failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({message: "Could not find by id and update.", error: error.message})
  }

};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const isDeleted = await User.findByIdAndDelete(userId);

  try {
    if (isDeleted) {
    res.status(204).send(); // 204 No Content
    } else {
      // Handle deletion failure (e.g., user not found)
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({message: "Could not find by id and delete.", error: error.message})
  }
  
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};