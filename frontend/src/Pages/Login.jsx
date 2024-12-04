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

  if (user.loggedIn) {
    Navigate("/");
  }

  const [LoginFormData, SetLoginFormData] = useState({
    Email: "",
    Password: "",
  });

  const { Email, Password } = LoginFormData;

  function LoginHandleChange(event) {
    SetLoginFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function LoginHandleSubmit(event) {
    event.preventDefault();

    try {
      const response = await LoginUser(LoginFormData);
      if (response.status) {
        dispatch(setAuth(response.data));
        toast.success("Login Successfully!");
        localStorage.setItem("Token", response.Token);
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
    <div className="background-image pt-16 h-full overflow-y-hidden no-scrollbar">
      <div className="bg-[#ffffff67] p-5 mt-auto rounded-xl border-2 border-white mx-auto w-auto sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
        <h1 className="text-center mb-5 px-5 text-black font-semibold text-xl md:text-2xl lg:text-3xl">
          LOGIN
        </h1>

        <div className="form-transparent">
          <form>
            {/* Email */}
            <input
              placeholder="Email"
              name="Email"
              value={Email}
              onChange={LoginHandleChange}
              type="email"
              className="w-full mb-4 px-4 py-2 text-base md:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Password */}
            <input
              placeholder="Password"
              name="Password"
              value={Password}
              onChange={LoginHandleChange}
              type="password"
              className="w-full mb-4 px-4 py-2 text-base md:text-lg lg:text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              required
            />

            {/* Register and forgot password buttons */}
            <div className="flex flex-col md:flex-row md:justify-between">
              <h1 className="text-white font-semibold">
                I don't have an account?
                <span className="cursor-pointer font-semibold hover:text-amber-950 transition ease-in-out duration-200">
                  <Link to="/register"> Register </Link>
                </span>
              </h1>

              <h1 className="text-white font-semibold py-2 mb-2">
                <span className="cursor-pointer font-semibold hover:text-amber-950 transition ease-in-out duration-200">
                  <Link to="/ForgotPassword"> Forget Password? </Link>
                </span>
              </h1>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mb-5 bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900"
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
