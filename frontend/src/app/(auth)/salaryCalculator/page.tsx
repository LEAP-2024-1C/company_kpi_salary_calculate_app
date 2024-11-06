"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import { ISaveTasks } from "@/utils/interfaces"; // Ensure you have the correct interface
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // Import your table components

const SavedTasksPage: React.FC = () => {
  const [savedTasks, setSavedTasks] = useState<ISaveTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSavedTasks = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}get-savedTasks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setSavedTasks(response.data.cart.products);
      }
    } catch (error) {
      setError("Failed to load saved tasks. Please try again.");
      console.error("Error fetching saved tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedTasks();
  }, []);

  if (loading) return <div>Loading saved tasks...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Saved Tasks</h1>
      {savedTasks.length === 0 ? (
        <p>No saved tasks available.</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedTasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.quantity}</TableCell>
                <TableCell>{task.unitPrice}</TableCell>
                <TableCell>{task.quantity * task.unitPrice}₮</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SavedTasksPage;
