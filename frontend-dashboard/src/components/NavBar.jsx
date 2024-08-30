import React, { useState } from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import img from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const Navigate = useNavigate();

  // before and after login setup
  const [LoggedIn, setLoggedIn] = useState(
    localStorage.getItem("Token") !== null
  );

  return (
    // Login/register || Links -> #AD825C
    <div className="NavBar bg-[#AD825C] flex  justify-between px-8 py-2 shadow-sm shadow-slate-400">
      <div className="NavBar-Logo text-[#FFFFFF] cursor-pointer flex gap-5 transition-colors  ">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-20 h-20 rounded-full"
          width={20}
          height={20}
        />

        {/* name */}
        <h1 className="font-semibold text-4xl mt-5 hover:text-[40px] hover:text-amber-950 ease-in-out duration-200">
          Dashboard LifeStyle!
        </h1>
      </div>

      <div className="NavBar-Links text-[#FFFFFF] cursor-pointer  ">
        <ul className="NavBar-ul flex gap-8 font-semibold mt-5 ">
          <li
            className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
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
                className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => Navigate("/Profile")}
              >
                Profile
              </li>
              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => {
                  localStorage.removeItem("Token");
                  setLoggedIn(false);
                  Navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li
              className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
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