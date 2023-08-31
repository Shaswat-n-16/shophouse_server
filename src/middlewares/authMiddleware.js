import JWT from "jsonwebtoken";
import userSchema from "../db/userSchema.js";
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.AUTH_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.user._id);
    if (user.role !== 1) {
      res.status(401).json({
        message: "Unauthorized Access",
        succces: false,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error in server",
      succces: false,
    });
  }
};
