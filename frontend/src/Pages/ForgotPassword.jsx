import React from "react";
import "../Style/RegisterLoginForgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="background-image bg-black pb-[8.45%] pt-[8.45%] h-full overflow-y-hidden no-scrollbar ">
      <div className="container w-[50%] m-auto border-2 border-white bg-[#AD825C]">
        <h1 className="text-3xl text-center mb-[20px] mt-[30px] px-10 text-black font-semibold ">
          Forgot Password
        </h1>
        <div className="form-transparent">
          {/* ForgotPassword ? Email : "10 min code expire"  */}
          {/* Email ?  OTP : "Otp does not match" */}
          {/* email && OTP ? Password : "Try to enter new Password" */}

          <form className=" px-20">
            {/* Email  */}
            <input
              placeholder="Email"
              type="email"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />

            {/* Submit Email Button */}
            <button
              className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
              type="Submit"
            >
              Get Code
            </button>

            {/* OTP  */}
            <input
              placeholder="Enter the Code sent in registered email."
              type="email"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />

            {/* Submit Code */}
            <button
              className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
              type="Submit"
            >
              Submit Code
            </button>

            {/* Password */}
            <input
              placeholder="Password"
              type="password"
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />

            {/* Submit Button */}
            <button
              className="w-full mb-[30px] bg-amber-950 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-amber-900 transition duration-150 ease-in-out hover:shadow-lg active:bg-amber-900 "
              type="Submit"
            >
              Save New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
