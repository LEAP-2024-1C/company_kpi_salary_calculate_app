"use client";

import TaskTracker from "@/components/task-card";

const Dashboard = () => {
  return (
    <div
      className=" bg-teal-700 p-8 w-screen"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),url('https://i.pinimg.com/474x/55/3f/e1/553fe1cc62f86ea61c26ef0ff0b7c0ac.jpg')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      <div className="bg-white rounded-xl p-5 h-full ">
        <div className=" my-16 flex flex-col gap-5 items-center">
          <h1 className="text-teal-700 text-4xl font-bold mb-12 ">
            Сонгох боломжтой ажлуудын жагсаалт
          </h1>
          <div className=" grid grid-cols-3 gap-5 text-green-900 ">
            <TaskTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
