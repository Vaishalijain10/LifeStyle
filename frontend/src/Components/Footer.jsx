import React from "react";
import "../Style/Footer.css";

export default function Footer() {
  return (
    <div className="Footer w-full bg-[#AD825C] px-8 py-[11px] sticky bottom-0 z-50">
      <h1 className="Footer-list text-[#FFFFFF] text-center text-[15px]">
        <span className="font-semibold text-white hover:text-[16px]  hover:text-amber-950 ease-in-out duration-200 cursor-pointer">
          ©LifeStyle - An Imitation Jewelry Store At Your Service!"
        </span>
      </h1>
    </div>
  );
}
