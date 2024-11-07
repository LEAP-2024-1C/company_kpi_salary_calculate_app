"use client";

import TaskTracker from "@/components/task-card";

const Dashboard = () => {
  return (
    <div className="w-full  grid grid-cols-3 gap-5 justify-center p-5 text-green-900">
      <TaskTracker />
    </div>
  );
};

export default Dashboard;
