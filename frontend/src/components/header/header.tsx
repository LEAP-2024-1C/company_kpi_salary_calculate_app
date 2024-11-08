"use client";

import React from "react";

// import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

import { DropdownMenuDemo } from "./drowdown";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <div className="bg-gray-900 p-5 flex w-full justify-between items-center">
      <div
        className="flex items-center justify-start gap-5 text-white"
        onClick={handleClick}
      >
        <Image src="" alt="company logo" />
      </div>
      <div className="flex items-center gap-3  text-center justify-center">
        {/* <CiSearch className="text-gray-100" /> */}
        {/* <Input
          className="bg-gray-400 rounded-full text-gray-400 w-1/7 border-none"
          placeholder="Боломжит ажлуудыг хайх"
        /> */}
      </div>
      <div className=" ">
        {/* <Button
          className=" w-[50px] h-[50px] rounded-full  bg-cover"
          style={{
            backgroundImage: `url("/images/defaultProfilePic.jpg")`,
          }}
          // onClick={handleChange}
        ></Button> */}
        <DropdownMenuDemo />
      </div>
    </div>
  );
};

export default Header;
