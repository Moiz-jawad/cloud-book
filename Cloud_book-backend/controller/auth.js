const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashPassword });

    await user.save();

    return res.status(201).json({
      code: 201,
      status: true,
      message: "User successfully created",
      userData: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      code: "200",
      status: true,
      message: "User login successfully",
      data: { authToken: token },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "user not found!",
      });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Get user data successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getUser };
