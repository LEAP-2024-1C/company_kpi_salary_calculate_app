"use client";

import TaskTracker from "@/components/task-card";
import Link from "next/link";
import React, { useState } from "react";

const Dashboard = () =>
  // { task }: { task: ITask }
  {
    return (
      <div className="w-full h-full grid grid-cols-3 gap-5 justify-center p-5">
        {/* <Link href={"/" + task.id}> */}
        <TaskTracker totalTasks={9} />
        {/* </Link> */}

        {/* {tasks.map((task, index) => (
        <TaskTracker key={index} taskName={task.name} totalTasks={task.total} />
      ))} */}
      </div>
    );
  };

export default Dashboard;
