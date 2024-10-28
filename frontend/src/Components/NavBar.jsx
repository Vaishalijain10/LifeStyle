import React, { useState } from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import img from "../images/logo-new.jpeg";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slices/userSlice";
import Search from "./Search";

export default function NavBar() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("navbar : user: ", user);

  const [active, setActive] = useState("/");
  // Function to handle navigation and set active state
  const handleNavigate = (path) => {
    setActive(path); // Set the active path
    Navigate(path); // Navigate to the new path
  };

  return (
    // Login/register || Links -> #AD825C
    <div className="NavBar bg-[#AD825C] flex justify-between px-8 py-1 shadow-sm shadow-slate-400 pt-2 pb-2 sticky top-0 z-50">
      <div className="NavBar-Logo text-[#FFFFFF] cursor-pointer flex gap-5 transition-colors ">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-16 h-16 rounded-full"
          width={20}
          height={20}
        />

        {/*LifeStyle name */}
        <h1 className="font-semibold text-2xl mt-[12px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200">
          LifeStyle!
        </h1>
      </div>

      {/* <h1>Home</h1> */}
      {/* Condition rendering -> before login and after login */}
      <div className="flex items-center w-full gap-2">
        {/* Username */}
        <div className="flex-shrink-0 pt-0 ml-60 ">
          <p className="text-[20px] font-semibold text-white ">
            Hey, {user.loggedIn ? user.userData.FullName : "User!"}
          </p>
        </div>

        {/* Search Box */}
        <Search />
      </div>

      <div className="NavBar-Links text-[#FFFFFF] cursor-pointer  ">
        <ul className="NavBar-ul flex gap-8 font-semibold mt-[15px] uppercase">
          {/* home */}
          <li
            className={`NavBar-li text-[25px] ${
              active === "/"
                ? "text-amber-950 text-[30px] ease-in-out duration-200"
                : ""
            } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
            onClick={() => handleNavigate("/")}
          >
            <FaHome />
          </li>

          {/* logged in */}
          {user.loggedIn ? (
            <>
              {/* wish List */}
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/WishList"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/WishList")}
              >
                <MdFavorite />
              </li>
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/AddToCart"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/AddToCartPage")}
              >
                <FaShoppingCart />
              </li>

              <li
                className={`NavBar-li text-[25px] ${
                  active === "/Profile"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => handleNavigate("/Profile")}
              >
                <MdManageAccounts />
              </li>

              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className={`NavBar-li text-[25px] ${
                  active === "/login"
                    ? "text-amber-950 text-[30px] ease-in-out duration-200"
                    : ""
                } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
                onClick={() => {
                  localStorage.removeItem("Token");
                  dispatch(deleteAuth());
                  handleNavigate("/login");
                }}
              >
                <IoMdLogOut />
              </li>
            </>
          ) : (
            // log In
            <li
              className={`NavBar-li text-[25px] ${
                active === "/login"
                  ? "text-amber-950 text-[30px] ease-in-out duration-200"
                  : ""
              } hover:text-[30px] hover:text-amber-950 ease-in-out duration-200`}
              onClick={() => handleNavigate("/login")}
            >
              <IoMdLogIn />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
