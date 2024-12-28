// Routes is used to create api.
import express from "express";
import {
  authProfileController,
  editProfileController,
  loginController,
  registerController,
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



export default UserRouter;
