import React from 'react';

const GradientBackground = ({ 
    children, 
  className = "",
  // change defaults here 👇
  gradientFrom = "from-[#1B65A6]", 
  gradientVia = "",            // leave empty if you don’t need a mid color
  gradientTo = "to-[#262D61]",
  showCircles = true 
}) => {
  return (
<div
      className={`min-h-screen relative overflow-hidden 
        bg-gradient-to-br ${gradientFrom} ${gradientTo} ${className}`}>      {/* Background curved elements */}
      {showCircles && (
        <div className="absolute inset-0">
          {/* Thin curved lines - matching the screenshot */}
          <div className="absolute inset-0">
            {/* Top right curved lines */}
            <div className="absolute top-0 right-0 w-96 h-96 border border-white/20 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute top-10 right-10 w-80 h-80 border border-white/15 rounded-full transform translate-x-24 -translate-y-24"></div>
            {/* <div className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full transform translate-x-16 -translate-y-16"></div> */}
            
            {/* Bottom left curved lines */}
            <div className="absolute bottom-0 left-0 w-96 h-96 border border-white/20 rounded-full transform -translate-x-32 translate-y-32"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 border border-white/15 rounded-full transform -translate-x-24 translate-y-24"></div>
            {/* <div className="absolute bottom-20 left-20 w-64 h-64 border border-white/10 rounded-full transform -translate-x-16 translate-y-16"></div> */}
          </div>

          {/* Dark curved lines - the ones you marked in black */}
          <div className="absolute inset-0">
            {/* Top right dark curved line */}
            {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] border-2 border-black/30 rounded-full transform translate-x-40 -translate-y-40"></div> */}
            
            {/* Bottom left dark curved line */}
            {/* <div className="absolute bottom-0 left-0 w-[450px] h-[450px] border-2 border-black/30 rounded-full transform -translate-x-36 translate-y-36"></div> */}
            
            {/* Middle curved line */}
            {/* <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] border-2 border-black/25 rounded-full transform translate-x-20 -translate-y-10"></div> */}
            
            {/* Additional subtle dark lines for depth */}
            {/* <div className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] border border-black/20 rounded-full transform -translate-x-16 translate-y-8"></div> */}
          </div>

          {/* Small decorative dots */}
          <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 bg-black/15 rounded-full"></div>
        </div>
      )}

      {/* Content container with relative positioning */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;