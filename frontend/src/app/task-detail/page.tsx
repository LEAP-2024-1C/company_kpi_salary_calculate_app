import TaskDetailModal from "@/components/taskDetailModal";
import React from "react";

const TaskDetail = () => {
  return (
    <div className="p-16">
      <h1 className="font-bold text-3xl">Task Name</h1>
      <div>
        <ul>
          <TaskDetailModal />
        </ul>
      </div>
    </div>
  );
};

export default TaskDetail;
