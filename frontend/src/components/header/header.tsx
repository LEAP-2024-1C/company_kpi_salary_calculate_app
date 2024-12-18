"use client";

import { CgWorkAlt } from "react-icons/cg";
import React from "react";

// import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

import { DropdownMenuDemo } from "./drowdown";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };
  const handleWork = () => {
    router.push("/my-tasks");
  };
  return (
    <div className="bg-teal-700 p-5 flex w-full justify-between items-center border-b">
      <div
        className="flex items-center justify-start gap-5 text-white"
        onClick={handleClick}
      >
        <img
          src="./images/clothing.logo.jpg"
          alt="company logo"
          className="h-[50px] w-[50px] rounded-xl"
        />
      </div>
      <div className="flex items-center gap-3  text-center justify-center">
        {/* <Input
          className="bg-gray-400 rounded-full text-gray-400 w-1/7 border-none"
          placeholder="Боломжит ажлуудыг хайх"
          /> */}
      </div>
      <div className=" flex gap-8 items-center ">
        <div className="text-gray-50 text-4xl" onClick={handleWork}>
          <CgWorkAlt />
        </div>
        <DropdownMenuDemo />
      </div>
    </div>
  );
};

export default Header;
