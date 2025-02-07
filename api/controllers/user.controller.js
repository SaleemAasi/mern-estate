import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("helllllll");
};

export const updateUser = async (req, res, next) => {
  try {
    // Ensure the user can only update their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account"));
    }

    // If password is provided, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10); // Hash the new password
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // To return the updated document
    });

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Exclude the password from the response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      message: "User updated successfully",
      user: rest, // Only send back the user data without the password
    });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
