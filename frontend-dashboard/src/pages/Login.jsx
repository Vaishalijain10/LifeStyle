import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/RegisterLoginForgotPassword.css";

export default function Login() {
  const Navigate = useNavigate();

  // initial state -> Initially setting variables names as empty which will be further given input by user and send it to backend.
  const [LoginFormData, SetLoginFormData] = useState({
    Email: "",
    Password: "",
  });

  // saving the input values in Login form data
  const { Email, Password } = LoginFormData;

  // html page rendering
  function LoginHandleChange(event) {
    SetLoginFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  // activating submit button
  async function LoginHandleSubmit(event) {
    event.preventDefault();

    // .env data
    const email = "Admin@gmail.com";
    const password = "123456789";
    // user input
    const UserInputEmail = LoginFormData.Email;
    const UserInputPassword = LoginFormData.Password;
    // form data === .env email password

    if (UserInputEmail === email && UserInputPassword === password) {
      localStorage.setItem("Admin", "###1");

      Navigate("/");
      window.location.reload();
    } else {
      alert("Admin email and password do not match!");
    }
  }

  return (
    <div className="background-image bg-black pb-[9.43%] pt-[9.43%] h-full overflow-y-hidden no-scrollbar ">
      <div className="container w-[90%] md:w-[50%] m-auto border-2 border-white">
        <h1 className="text-xl text-center my-2 mt-[-10px] px-10 text-black font-semibold ">
          DASHBOARD LOGIN FORM
        </h1>

        <div className="form-transparent">
          <form className=" px-10">
            {/* Email  */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={LoginHandleChange}
              type="email"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Password */}
            <input
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={LoginHandleChange}
              type="password"
              className="w-full mb-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Register and forgot password button */}
            <div className="flex gap-[30%]">
              <h1 className="text-white font-semibold py-2 mb-2">
                <span className="cursor-pointer font-semibold hover:font-semibold hover:text-[rgb(184,184,233)] transition ease-in-out duration-200">
                  <Link to="/forgot-password"> Forget Password? </Link>
                </span>
              </h1>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
              type="Submit"
              onClick={LoginHandleSubmit}
            >
              LogIn As Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
