// Routes is used to create api.
import express from "express";
import {
  addToWishlistController,
  authProfileController,
  editProfileController,
  loginController,
  registerController,
  removeFromWishlistController,
} from "../controllers/AuthController.js";
const UserRouter = express.Router();

// router setup for register
UserRouter.post("/register", registerController);

// router setup for login
UserRouter.post("/login", loginController);

// route setup for profile and its validation
UserRouter.get("/auth-profile/:user_id", authProfileController);

// route setup for edit Profile
UserRouter.put("/edit-profile", editProfileController);

// route setup for liked products
UserRouter.post("/add-to-wishlist", addToWishlistController);

// Route setup for removing from wishlist
UserRouter.post("/remove-from-wishlist", removeFromWishlistController);

export default UserRouter;
