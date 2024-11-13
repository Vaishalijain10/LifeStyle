import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/RegisterLoginForgotPassword.css";
import { RegisterUser } from "../Api/Basic";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  // securing url
  if (user.loggedIn) {
    Navigate("/");
  }
  // sending data in the backend -> using states and hooks
  //  initial state -> Initially setting variables names as empty which will be further given input by user and send it to backend.
  const [FormData, SetFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
  });

  // assigning values to form data -> input made by user is save in the form data.
  const { FullName, Email, PhoneNumber, Address, Password, ConfirmPassword } =
    FormData;

  // hooks implementation -> html page rendering by setFormData
  function HandleChange(event) {
    // console.log(event.target.value);
    // console.log("vj");
    SetFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // onClick event activated
  async function HandleSubmit(event) {
    event.preventDefault();

    // password = confirm password
    if (Password !== ConfirmPassword) {
      toast.error("Password and confirm password does not match!");
      Navigate("/register");
      return;
    }

    // data sent to the database if password = confirm password
    // some other issue handling -> like network issue thats why using try catch block!
    console.log("register : formdata : ", FormData);
    try {
      const response = await RegisterUser(FormData);
      if (response.status) {
        toast.success("Registered Successfully!");
        Navigate("/login");
      } else {
        toast.error(
          "Email id Or Phone Number already registered. " + response.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // forgot password and login link
    <div className="background-image pb-[2.78%] pt-[2.78%] h-full overflow-y-hidden no-scrollbar ">
      <div className="w-[400px] rounded-xl bg-[#ffffff78] p-2 m-auto border-2 border-white bg-[#AD825C]">
        <h1 className="text-3xl text-gray-950 text-center mb-2 text-[#ffff] font-semibold ">
          Registration Form
        </h1>
        <div className="form-transparent">
          <form className="">
            {/* name */}
            <input
              placeholder="Full Name"
              name="FullName"
              value={FullName}
              onChange={HandleChange}
              type="text"
              className="w-full  mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />
            {/* Email */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={HandleChange}
              type="email"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Phone Number */}
            <input
              placeholder="Phone Number"
              name="PhoneNumber"
              value={PhoneNumber}
              onChange={HandleChange}
              type="number"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              minLength={10}
              required
            />

            {/* Address */}
            <input
              placeholder="Address"
              name="Address"
              value={Address}
              onChange={HandleChange}
              type="text"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Password */}
            <input
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={HandleChange}
              type="password"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/*Confirm password */}
            <input
              placeholder="Confirm Password"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={HandleChange}
              type="password"
              className="w-full mb-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            <h1 className="text-white font-semibold py-2 mb-2">
              Already have an account?
              <span className="cursor-pointer hover:text-[#78614a] transition duration-150 ease-in-out hover:shadow-lg active:text-[#543310]">
                <Link to="/login"> Login </Link>
              </span>
            </h1>

            {/* Submit Button */}
            <button
              className="w-full bg-[#74512D] text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-[#78614a] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#543310]"
              type="Submit"
              onClick={HandleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
