// Routes is used to create api.

import express, { response } from "express";
import users from "../Models/Users.js";

const UserRouter = express.Router();

// router setup for register
UserRouter.post("/register", async (req, res) => {
  // used for debugging
  console.log("Register Reached here!!!!!!");
  console.log(req.body);

  // try-catch block -> checking the status of database if something issue occur -> it will give false and exist from the function
  try {
    // process -> checking email id and phone number already registered or not..using OR operator
    // mongodb query -> below query find one user from user (schema) and check email and phone number for verification
    const UserAlreadyExist = await users.findOne({
      $or: [{ Email: req.body.Email }, { PhoneNumber: req.body.PhoneNumber }],
    });

    // return function will exist lead to exist the function
    if (UserAlreadyExist === null) {
      const newUser = await users(req.body);
      newUser.save(); //saving data in db
      console.log("User registered successfully");
      // creating object and send it to the frontend
      return res.send({
        success: true,
        message: "User registered successfully",
      });
    }
    // if user already exist than below code will work!
    console.log("Email id Or Phone Number already registered");
    return res.send({ success: false, message: "User already exists!" });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Something went wrong in the database.",
    });
  }
});

// router setup for login
UserRouter.post("/login", async (req, res) => {
  console.log("Login Reached here!!!!!!");
  console.log(req.body);
  try {
    // process -> checking email id from user input and check in the database weather the email id  already exists or not.
    // LoginUserExist -> database checking and finding email that matches with frontend user input
    // FrontendReqLoginUserEmail -> email: req.body.email -> frontend user input
    const FrontendReqLoginUserEmail = { Email: req.body.Email };
    const LoginUserExist = await users.findOne(FrontendReqLoginUserEmail);

    // account already exist or not
    if (LoginUserExist === null) {
      console.log("User does not exist. Create an account!");
      return res.send({
        success: false,
        message: "User does not exist. Create an account!",
      });
    }

    // displaying email id coming from backend and matching it with the user input. -> just for debugging!
    console.log(LoginUserExist);

    // email id matching with password saved in the backend
    // LoginUserExist.Password -> backend password
    // req.body.Password -> user input password
    // token -> _id is the unique code generated in mongodb used to -> to locally store the active status of user which will further help in rendering the features of website like before and after login -> changes that occurs in home page and navbar.
    if (LoginUserExist.Password === req.body.Password) {
      console.log("Password match successfully!");
      return res.send({
        success: true,
        Token: LoginUserExist._id,
      });
    }
    // database password not equal to user input password
    response.send({
      success: false,
      message: "Password is Incorrect!",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Opps! Database error!",
    });
  }
});

// route setup for profile and its validation
UserRouter.post("/auth-profile", async (req, res) => {
  console.log("Reached here : auth-profile route");
  // frontend id is coming here-->
  console.log(req.body);
  // fetching backend id from here
  users
    .findOne({ _id: req.body.Token_id })
    .then((response) => {
      if (response !== null) {
        console.log("Object found");
        res.send({ status: true, userInfo: response });
      } else {
        res.send({ status: false, message: "user not logged in" });
      }
    })
    .catch((error) => {
      console.log("error at auth.js", error);
      return res.send({ status: false, message: error.message });
    });
});

// route setup for edit Profile
UserRouter.put("/edit-profile", async (req, res) => {
  console.log("Edit profile route hit");

  try {
    const user = await users.findOne({ Email: req.body.Email });

    if (user) {
      // Update the user profile fields
      user.FullName = req.body.FullName || user.FullName;
      user.PhoneNumber = req.body.PhoneNumber || user.PhoneNumber;
      user.Address = req.body.Address || user.Address;

      await user.save(); // Save changes to database

      return res.send({
        success: true,
        message: "User profile updated successfully",
      });
    } else {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "An error occurred while updating the user profile",
    });
  }
});

// route setup for liked products
UserRouter.post("/add-to-wishlist", (req, res) => {
  console.log("Reached wishlist route for liked products");
  //add to set is an operation

  users
    .updateOne(
      { _id: req.body.userId },
      { $push: { WishList: req.body.productId } }
    )
    .then((result) => {
      console.log("WishList updated:", result);
      return res.send({
        status: true,
      });
    })
    .catch((error) => {
      console.error("Error updating wishlist:", error);
      return res.send({
        status: false,
        message: error.message,
      });
    });
});

// Route setup for removing from wishlist
UserRouter.post("/remove-from-wishlist", (req, res) => {
  console.log("reached to remove product from wish List");
  const { userId, productId } = req.body;

  users
    .updateOne({ _id: userId }, { $pull: { WishList: productId } })
    .then((result) => {
      console.log("Product removed from WishList:", result);
      res.send({ status: true });
    })
    .catch((error) => {
      console.error("Error removing product from wishlist:", error);
      res.send({ status: false, message: error.message });
    });
});

export default UserRouter;
