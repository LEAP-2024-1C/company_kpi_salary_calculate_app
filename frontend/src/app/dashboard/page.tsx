"use client";

import TaskCard from "@/components/task-card";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5 justify-center p-5">
      <TaskCard />
    </div>
  );
};

export default Dashboard;
