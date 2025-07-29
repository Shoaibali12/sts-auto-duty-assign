import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex items-center justify-center pb-4 gap-4">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <Image
          src="/siba-logo.png"
          alt="Sukkur IBA Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Text Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black">Sukkur IBA University</h1>
        <p className="text-black font-medium">Merit, Quality, Excellence</p>
        <p className="text-lg mt-2 font-semibold text-black">
          Direct Aptitude Test - 2025 (Phase II)
        </p>
        <p className="text-black">(Test Held on Sunday July 13, 2025)</p>
      </div>
    </div>
  );
};

export default Header;
