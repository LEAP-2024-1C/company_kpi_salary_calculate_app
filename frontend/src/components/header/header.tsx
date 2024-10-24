"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

// import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import { DropdownMenuDemo } from "./drowdown";

const Header = () => {
  const router = useRouter();

  const handleChange = () => {
    console.log("onclick successful");
  };

  return (
    <div className="bg-black p-5 grid grid-cols-3 w-full justify-between items-center">
      <div className="flex items-center justify-start gap-5 text-white">
        <img src="" alt="company logo" />
      </div>
      <div className="flex items-center gap-3  text-center justify-center">
        {/* <CiSearch className="text-gray-100" /> */}
        <Input
          className="bg-gray-300 rounded-full text-gray-400 w-1/7 border-none"
          placeholder="Боломжит ажлуудыг хайх"
        />
      </div>
      <div className="  self-end  ">
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
