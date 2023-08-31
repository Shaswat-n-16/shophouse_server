import userSchema from "../db/userSchema.js";
import { hashPassword, comparePassword } from "../utils/auth.util.js";
import JWT from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, answer } = req.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "User Already exists",
        success: false,
      });
    }
    const hashedpassword = await hashPassword(password);
    const user = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedpassword,
      answer,
    });
    return res.status(201).json({
      message: "User created Successfully ",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Server Error",
      success: false,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User Doesn't exists",
        success: false,
      });
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Wrong Password",
        success: false,
      });
    }
    const token = await JWT.sign(
      { _id: user._id },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      message: "Logged in Successfully ",
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Server Error",
      success: false,
      error,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    const user = await userSchema.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userSchema.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error,
    });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, phone } = req.body;
    const user = await userSchema.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.user._id,
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
