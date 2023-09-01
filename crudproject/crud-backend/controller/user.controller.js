import User from "../models/user.model.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: `User already exists with ${email}`,
      });

    user = await User.create({ name, email, password, gender });

    return res.status(201).json({
      success: true,
      message: "User registered succssfully.",
    });
  } catch (error) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.find({ email }).select("+password");

    if (!user || user.password != password)
      return res.status(400).json({
        success: false,
        message: `Invalid Email/Password`,
      });

    return res.status(200).json({
      success: true,
      message: "Login succssfully.",
      user,
    });
  } catch (error) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });

    if (!user)
      return res.status(400).json({
        success: false,
        message: `No user exists with id : ${userId}`,
      });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const { name, gender, active } = req.body;

    const user = await User.findById({ _id: userId });

    if (!user)
      return res.status(400).json({
        success: false,
        message: `No user exists with id : ${userId}`,
      });

    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (active) user.active = active;

    await user.save({ new: true });

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById({ _id: userId });

    if (!user)
      return res.status(400).json({
        success: false,
        message: `No user exists with id : ${userId}`,
      });

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(error.status).json({
      success: false,
      error: error.message,
    });
  }
};
