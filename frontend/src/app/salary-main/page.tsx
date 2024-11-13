"use client";

import { EmployeeResult } from "@/components/salary-main/result";
import MonthlySalary from "@/components/salary-main/monthlySalary";
import React from "react";

const Salary = () => {
  return (
    <div
      className="w-full flex justify-center bg-gray-100"
      style={{
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://i.pinimg.com/474x/55/3f/e1/553fe1cc62f86ea61c26ef0ff0b7c0ac.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="p-28 flex gap-20">
        <EmployeeResult />
        <MonthlySalary />
      </div>
    </div>
  );
};

export default Salary;
