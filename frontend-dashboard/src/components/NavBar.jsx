import React, { useState } from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import img from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const Navigate = useNavigate();

  // before and after login setup
  const [LoggedIn, setLoggedIn] = useState(props.login);

  return (
    // Login/register || Links -> #AD825C
    <div className="NavBar bg-[#AD825C] flex justify-between p-2 md:px-5 shadow-sm shadow-slate-400 sticky top-0 h-[50px] z-50">
      <div className="NavBar-Logo text-[#FFFFFF] cursor-pointer flex gap-4 transition-colors md:ml-[30px]">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-10 h-10 mt-[-3px] rounded-full"
          width={20}
          height={20}
        />

        {/* name */}
        <h1
          className="font-semibold text-[12px] md:text-[20px] mt-2 md:mt-[2px] hover:text-amber-950 ease-in-out duration-200"
          onClick={() => Navigate("/")}
        >
          Dashboard LifeStyle - Admin Portal
        </h1>
      </div>

      <div className="NavBar-Links text-[#FFFFFF] cursor-pointer md:mr-[30px]">
        <ul className="NavBar-ul flex gap-4 md:gap-8 font-semibold ">
          <li
            className="NavBar-li  text-[12px] md:text-[20px] mt-2 md:mt-[2px] hover:text-amber-950 ease-in-out duration-200"
            onClick={() => Navigate("/")}
          >
            Home
          </li>

          {/* conditional rending -> logged in true -> display login will disappear and Profile button will display */}
          {/* loggedIn -> (true -> profile ) AND (false -> Login ) will appear -> ternary operator*/}
          {/* {LoggedIn ? Profile : Login} */}

          {LoggedIn ? (
            <>
              <li
                className="NavBar-li  text-[12px] md:text-[20px] mt-2 md:mt-[2px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => Navigate("/Profile")}
              >
                Profile
              </li>
              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className="NavBar-li  text-[12px] md:text-[20px] mt-2 md:mt-[2px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => {
                  localStorage.removeItem("Admin");
                  setLoggedIn(false);
                  Navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className="NavBar-li text-[12px] md:text-[20px] mt-2 md:mt-[2px] hover:text-amber-950 ease-in-out duration-200"
              onClick={() => {
                Navigate("/login");
                window.location.reload(); // Refresh the page after logging out
              }}
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
