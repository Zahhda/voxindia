import React from "react";

const HeaderSlider = () => {
  return (
    <div
      className="relative h-[420px] rounded-xl mt-6"
      style={{
        marginLeft: "2px",
        marginRight: "2px",
        backgroundImage: "url('/banner1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />

      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1200px]">
        <div className="text-white max-w-xl text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Transform Your Spacee
          </h1>
          <h5 className="text-base md:text-lg font-medium mt-3 leading-relaxed">
            Premium slatted wall and ceiling panels for modern interiors. 100% recyclable, lightweight, and easy to install.
          </h5>
          <div className="mt-6 flex gap-4">
            <button className="px-8 py-2.5 bg-red-700 hover:bg-red-800 rounded-full text-sm font-medium transition">
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
