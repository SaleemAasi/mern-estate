import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.send("helllllll");
};

export const updateUser = async (req, res, next) => {
  console.log("🟢 Received Update Request:", req.body);
  console.log("🟢 Params ID:", req.params.id);
  console.log("🟢 Authenticated User ID:", req.user?.id);

  try {
    if (!req.user) {
      console.log("🔴 Authentication failed: No user found in request");
      return next(errorHandler(401, "Authentication required"));
    }

    if (req.user.id !== req.params.id) {
      console.log("🔴 Unauthorized: User does not match");
      return next(errorHandler(401, "You can only update your own account"));
    }

    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) {
      console.log("🟡 Hashing new password...");
      updates.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      console.log("🔴 User not found in database");
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    console.log("🟢 User Updated Successfully:", rest);

    res.status(200).json({
      message: "User updated successfully",
      user: rest
    });
  } catch (error) {
    console.log("🔴 Server Error:", error);
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  console.log("🟢 Received Delete Request for User ID:", req.params.id);

  try {
    if (!req.user) {
      console.log("🔴 Authentication failed: No user found in request");
      return next(errorHandler(401, "Authentication required"));
    }

    if (req.user.id !== req.params.id) {
      console.log("🔴 Unauthorized: User does not match");
      return next(errorHandler(403, "You can only delete your own account"));
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      console.log("🔴 User not found in database");
      return next(errorHandler(404, "User not found"));
    }

    // Clear the authentication cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it's only secure in production
      sameSite: "strict",
    });

    console.log("🟢 User Deleted Successfully & Cookie Cleared");
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("🔴 Server Error:", error);
    next(error);
  }
};
