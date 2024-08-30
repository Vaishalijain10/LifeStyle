import React from "react";
import "../Style/Footer.css";

export default function Footer() {
  return (
    <div className="Footer w-full bg-[#AD825C] px-8 py-[11px] sticky bottom-0 z-50">
      <h1 className="Footer-list text-white text-center text-[25px]">
        <span className="font-semibold hover:text-[26px] hover:text-amber-950 ease-in-out duration-200 cursor-pointer">
          © Vaishali & Devansh!
        </span>
      </h1>
    </div>
  );
}
