import React from "react";

const CloudLogo = ({ width = 80, height = "auto", className = "" }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex items-center justify-center">
        <img
          src="/logo.svg.png" // file in /public/logo.svg.png
          alt="Cloud Logo"
          style={{ width: `${width}px`, height: height }} // ✅ inline size
          className={`opacity-80 object-contain ${className}`}
        />
      </div>
    </div>
  );
};

export default CloudLogo;
