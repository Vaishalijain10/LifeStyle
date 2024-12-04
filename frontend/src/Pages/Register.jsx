import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/RegisterLoginForgotPassword.css";
import { RegisterUser } from "../Api/Basic";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Register() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);

  if (user.loggedIn) {
    Navigate("/");
  }

  const [FormData, SetFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    State: "",
    City: "",
    PinCode: "",
    Address: "",
    Password: "",
    ConfirmPassword: "",
  });

  const {
    FullName,
    Email,
    PhoneNumber,
    State,
    City,
    PinCode,
    Address,
    Password,
    ConfirmPassword,
  } = FormData;

  function HandleChange(event) {
    SetFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function HandleSubmit(event) {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      toast.error("Password and confirm password do not match!");
      Navigate("/register");
      return;
    }

    try {
      const response = await RegisterUser(FormData);
      if (response.status) {
        toast.success("Registered Successfully!");
        Navigate("/login");
      } else {
        toast.error(
          "Email or Phone Number already registered. " + response.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="background-image pb-2 pt-10 h-full ">
      <div className="bg-[#ffffff78] rounded-xl p-4 mx-auto border-2 border-white overflow-y-auto scrollbar-y-auto h-[70vh]  bg-[#AD825C] w-full max-w-[300px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px]">
        <h1 className="text-2xl sm:text-2xl lg:text-4xl text-gray-950 text-center mb-4 text-[#ffff] font-semibold">
          Registration Form
        </h1>
        <div className="form-transparent">
          <form>
            {/* Full Name */}
            <input
              placeholder="Full Name"
              name="FullName"
              value={FullName}
              onChange={HandleChange}
              type="text"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Email */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={HandleChange}
              type="email"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Phone Number */}
            <input
              placeholder="Phone Number"
              name="PhoneNumber"
              value={PhoneNumber}
              onChange={HandleChange}
              type="number"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              minLength={10}
              required
            />
            {/* State */}
            <input
              placeholder="State"
              name="State"
              value={State}
              onChange={HandleChange}
              type="text"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* City */}
            <input
              placeholder="City"
              name="City"
              value={City}
              onChange={HandleChange}
              type="text"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* PinCode */}
            <input
              placeholder="PinCode"
              name="PinCode"
              value={PinCode}
              onChange={HandleChange}
              type="number"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Address */}
            <input
              placeholder="Address"
              name="Address"
              value={Address}
              onChange={HandleChange}
              type="text"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Password */}
            <input
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={HandleChange}
              type="password"
              className="w-full mb-4 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Confirm Password */}
            <input
              placeholder="Confirm Password"
              name="ConfirmPassword"
              value={ConfirmPassword}
              onChange={HandleChange}
              type="password"
              className="w-full mb-5 px-4 py-2 text-base sm:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Submit Button */}
            <button
              className="w-full bg-[#74512D] text-white px-4 py-2 text-sm sm:text-base lg:text-lg font-medium uppercase rounded shadow-md hover:bg-[#78614a] transition duration-150 ease-in-out hover:shadow-lg active:bg-[#543310]"
              type="Submit"
              onClick={HandleSubmit}
            >
              Sign Up
            </button>
            {/* Login Link */}
            <h1 className="text-white text-sm sm:text-base font-semibold mt-2">
              Already have an account?{" "}
              <span className="cursor-pointer hover:text-[#141312] transition duration-150 ease-in-out hover:shadow-lg active:text-[#543310]">
                <Link to="/login">Login</Link>
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
