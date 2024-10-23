import React, { useState } from "react";
import { LuDot } from "react-icons/lu";

interface TaskTrackerProps {
  totalTasks: number;
}
const TaskTracker: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const handleTaskCompletion = () => {
    if (completedTasks < totalTasks) {
      setCompletedTasks(completedTasks + 1);
    }
  };

  const TaskCard = () => {
    if (completedTasks === totalTasks) {
      return "green";
    } else if (completedTasks >= totalTasks / 2) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div className="bg-gray-200 rounded-xl p-5 flex flex-col">
      <h1 className="text-3xl font-bold ">Tsamts</h1>
      <ul>
        <li className="flex items-center gap-3">
          <LuDot />
          <p>Pocket</p> <p>(1/9)</p>
        </li>
      </ul>
      <div className="w-full flex ">
        <p className="text-blue-500 justify-self-end">Status</p>
      </div>
    </div>
  );
};

export default TaskCard;
