"use client";

import TaskTracker from "@/components/task-card";
import { apiUrl } from "@/lib/utils";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
interface IEmployee {
  // firstname: string;
  _id: string;
  email: string;
}
const Dashboard = () => {
  const [user, setUser] = useState<IEmployee | null>(null);
  const [loading, setLoading] = useState(true);
  const tasks = [
    { name: "Task 1", total: 9 },
    { name: "Task 2", total: 5 },
    { name: "Task 3", total: 7 },
  ];
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${apiUrl}auth/get-employee`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const { user } = response.data;
          setUser(user);
          console.log(user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      toast.error("Failed to get current user data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5 justify-center p-5">
      <TaskTracker totalTasks={9} />
      {/* {tasks.map((task, index) => (
        <TaskTracker key={index} taskName={task.name} totalTasks={task.total} />
      ))} */}
      <button onClick={getCurrentUser}>user</button>
    </div>
  );
};

export default Dashboard;
