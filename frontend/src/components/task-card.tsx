import React, { useState } from "react";

interface TaskTrackerProps {
  totalTasks: number;
}

const TaskTracker: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
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
    <div className="bg-gray-200 rounded-xl p-5 flex flex-col">
      <h1 className="text-3xl font-bold ">Tsamts</h1>
      <ul>
        <li className="flex items-center gap-3">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: getDotColor(),
            }}
          />
          <p>Pocket</p>
          <p>
            {completedTasks} / {totalTasks}
          </p>
        </li>
      </ul>
      <div className="w-full flex ">
        <p className="text-blue-500 justify-self-end">Status</p>
        <button onClick={completeTask}>Task</button>
      </div>
    </div>
  );
};

export default TaskTracker;
