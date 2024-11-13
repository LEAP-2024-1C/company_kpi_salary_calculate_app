import React from "react";
import { SalaryChart } from "./salaryChart";

const MonthlySalary = () => {
  return (
    <div className="w-[] h-[] bg-gray-200 rounded-xl p-5">
      <SalaryChart />
      {/* <p className="text-3xl"></p> */}
    </div>
  );
};

export default MonthlySalary;
