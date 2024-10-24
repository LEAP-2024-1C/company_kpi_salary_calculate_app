"use client";

import TaskTracker from "@/components/task-card";
import TaskDetailModal from "@/components/taskDetailModal";
import React from "react";

const TaskDetail = () => {
  return (
    <div className="">
      <div className="p-16 flex flex-col items-start">
        <h1 className="font-bold text-3xl">Task Name</h1>
        <div>
          <div
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            <TaskTracker />
          </div>
          <ul>
            <li>
              {/* {" "}
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              open modal
            </button> */}
            </li>
            <TaskDetailModal />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
