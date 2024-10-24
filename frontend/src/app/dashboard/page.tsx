"use client";

import TaskTracker from "@/components/task-card";
import React from "react";

const Dashboard = () => {
  const tasks = [
    { name: "Task 1", total: 9 },
    { name: "Task 2", total: 5 },
    { name: "Task 3", total: 7 },
  ];
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5 justify-center p-5">
      <TaskTracker totalTasks={9} />
      {tasks.map((task, index) => (
        <TaskTracker key={index} taskName={task.name} totalTasks={task.total} />
      ))}
    </div>
  );
};

export default Dashboard;
