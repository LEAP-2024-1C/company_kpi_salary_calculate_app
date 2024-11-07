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

  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <div className="bg-gray-900 p-5 flex w-full justify-between items-center">
      <div
        className="flex items-center justify-start gap-5 text-white"
        onClick={handleClick}
      >
        <img src="" alt="company logo" />
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
