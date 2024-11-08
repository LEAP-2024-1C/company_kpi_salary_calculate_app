"use client";

import { CgWorkAlt } from "react-icons/cg";
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
  const handleWork = () => {
    router.push("/salaryCalculator");
  };
  return (
    <div className="bg-gray-900 p-5 flex w-full justify-between items-center">
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
      <div className=" flex gap-8 items-center">
        <CgWorkAlt
          className="text-gray-400 w-[40px] h-[40px]"
          onClick={handleWork}
        />
        <DropdownMenuDemo />
      </div>
    </div>
  );
};

export default Header;
