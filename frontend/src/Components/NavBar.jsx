import React from "react";
import "../Style/NavBar.css";
// importing images and storing it in img variable
import img from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuth } from "../redux/slices/userSlice";

export default function NavBar() {
  const Navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("navbar : user: ", user);

  return (
    // Login/register || Links -> #AD825C
    <div className="NavBar bg-[#AD825C] flex justify-between px-8 py-1 shadow-sm shadow-slate-400">
      <div className="NavBar-Logo text-[#FFFFFF] cursor-pointer flex gap-5 transition-colors ">
        {/* logo */}

        <img
          src={img}
          alt="logo"
          className="w-10 h-10 rounded-full"
          width={20}
          height={20}
        />

        {/*LifeStyle name */}
        <h1 className="font-semibold text-2xl mt-[2px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200">
          LifeStyle!
        </h1>
      </div>

      <div className="NavBar-Links text-[#FFFFFF] cursor-pointer  ">
        <ul className="NavBar-ul flex gap-8 font-semibold mt-[8px] uppercase">
          {/* home */}
          <li
            className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
            onClick={() => Navigate("/")}
          >
            <FaHome />
          </li>

          {/* logged in */}
          {user.loggedIn ? (
            <>
              <li
                className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => Navigate("/Profile")}
              >
                <MdManageAccounts />
              </li>
              {/* wish List */}
              <li
                className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => Navigate("/WishList")}
              >
                <MdFavorite />
              </li>

              {/* in logout section -> local storage -> null -> setLoggedIn-> value changes  */}
              <li
                className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
                onClick={() => {
                  localStorage.removeItem("Token");
                  dispatch(deleteAuth());
                  Navigate("/login");
                }}
              >
                <IoMdLogOut />
              </li>
            </>
          ) : (
            // log In
            <li
              className="NavBar-li text-[25px] hover:text-[30px] hover:text-amber-950 ease-in-out duration-200"
              onClick={() => {
                Navigate("/login");
              }}
            >
              <IoMdLogIn />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
