import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  return (
    <div
      className="relative w-full h-[420px] flex flex-col items-center justify-center text-center bg-cover bg-center rounded-xl mt-6"
      style={{ backgroundImage: "url('/banner1.jpg')" }}
    >
      <div className="bg-black/40 w-full h-full absolute top-0 left-0 rounded-xl z-0" />
      <div className="relative z-10 px-4 md:px-0">
        <h1 className="text-white text-3xl md:text-5xl font-bold max-w-2xl leading-tight">
          Transform Your Space
        </h1>
         <h5 className="text-white text-base md:text-lg font-medium max-w-2xl leading-relaxed">
  Premium slatted wall and ceiling panels for modern interiors. 100% recyclable, lightweight, and easy to install.
</h5>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
          <button className="px-8 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-full text-sm font-medium">
            Explore Collection
          </button>
          {/* <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-white border border-white rounded-full">
            Find more
            <Image
              className="group-hover:translate-x-1 transition"
              src={assets.arrow_icon}
              alt="arrow_icon"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;