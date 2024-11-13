import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/RegisterLoginForgotPassword.css";
import { LoginUser } from "../Api/Basic";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAuth } from "../redux/slices/userSlice";

export default function Login() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // securing url
  if (user.loggedIn) {
    Navigate("/");
  }

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

    console.log(LoginFormData);
    try {
      const response = await LoginUser(LoginFormData);
      if (response.status) {
        dispatch(setAuth(response.data));
        toast.success("Login Successfully!");
        // this helps website / browser to understand weather the user has login  or not. Helps in rendering
        localStorage.setItem("Token", response.Token);
        console.log(localStorage);
        Navigate("/");
      } else {
        toast.error("Something went wrong!", response.message);
      }
    } catch (error) {
      toast.error("connectivity error");
      console.log(error);
    }
  }

  return (
    <div className="background-image pt-[20px] h-full overflow-y-hidden no-scrollbar ">
      <div className="bg-[#ffffff67] p-2  rounded-xl  md:w-[50%] max-w-[400px] m-auto border-2 border-white">
        <h1 className="text-center font-serif">Here's your way. </h1>
        <h1 className=" text-center mb-[20px]  px-10 text-black font-semibold  ">
          Please Log In
        </h1>

        <div className="form-transparent">
          <form className=" ">
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
                I don't have an account?
                <span className="cursor-pointer font-semibold hover:font-semibold hover:text-amber-950 transition ease-in-out duration-200">
                  <Link to="/register"> Register </Link>
                </span>
              </h1>

              <h1 className="text-white font-semibold py-2 mb-2">
                <span className="cursor-pointer font-semibold hover:font-semibold hover:text-amber-950 transition ease-in-out duration-200">
                  <Link to="/ForgotPassword"> Forget Password? </Link>
                </span>
              </h1>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
              type="Submit"
              onClick={LoginHandleSubmit}
            >
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
