import { IProduct } from "@/utils/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import ProductDetailModal from "./productDetailModal";

interface TaskTrackerProps {
  totalTasks: number;
}

const TaskTracker: React.FC<TaskTrackerProps> = (
  { totalTasks },
  { product }: { product: IProduct }
) => {
  const [completedTasks, setCompletedTasks] = useState(0);

  const completeTask = () => {
    if (completedTasks < totalTasks) {
      setCompletedTasks(completedTasks + 1);
    }
  };

  const getDotColor = () => {
    const percentageCompleted = completedTasks / totalTasks;

    if (percentageCompleted === 1) return "green";
    if (percentageCompleted >= 0.5) return "orange";
    return "red";
  };

  return (
    <Link
      href={"/product-detail"}
      // {"/" + product.id}
    >
      <div
        className="bg-gray-200 rounded-xl p-5 flex flex-col border text-green-900 "
        style={{ borderColor: getDotColor() }}
      >
        <h1 className="text-3xl font-bold ">Tsamts</h1>
        <ul>
          <li className="flex items-center gap-3">
            <div>{/* <ProductDetailModal /> */}</div>
            <p>
              ({completedTasks} / {totalTasks})
            </p>
          </li>
        </ul>
        <div className="w-full flex ">
          <p className="text-blue-500 justify-self-end">Status</p>
          <button onClick={completeTask}>Task</button>
        </div>
      </div>
    </Link>
  );
};

export default TaskTracker;
