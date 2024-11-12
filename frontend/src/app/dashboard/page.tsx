"use client";

import TaskTracker from "@/components/task-card";
import { url } from "inspector";

const Dashboard = () => {
  return (
    <div
      className="w-screen grid grid-cols-3 gap-5 justify-center p-5 text-green-900 "
      // style={{
      //   backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnG0W8TURiE4CmxmK1uZFjPELPkDzTjasrA&s')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      <TaskTracker />
    </div>
  );
};

export default Dashboard;
