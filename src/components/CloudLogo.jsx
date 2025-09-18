import React from 'react'
import CloudImg from "../Logo/PNG_Screen/logo.png.png";  // extension must match your file

const CloudLogo = () => {
  return (
    <div>
       <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center">
         <img
        src={CloudImg}
        alt="Cloud"
        className="w-[80px] h-auto opacity-80 object-contain"
      />
        </div>
      </div>
    </div>
  )
}

export default CloudLogo;
