"use client";

import TaskTracker from "@/components/task-card";
import { useProducts } from "@/context/product-provider";
import Link from "next/link";
import React, { useState } from "react";

const Dashboard = () => {
  const { products } = useProducts();
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5 justify-center p-5">
      {products.map((p, i) => {
        <TaskTracker totalTasks={9} key={p.id} product={p} />;
      })}

      {/* {tasks.map((task, index) => (
        <TaskTracker key={index} taskName={task.name} totalTasks={task.total} />
      ))} */}
    </div>
  );
};

export default Dashboard;
