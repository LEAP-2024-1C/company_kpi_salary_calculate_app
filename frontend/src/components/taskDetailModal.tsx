"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TaskTrackerProps {
  totalTasks: number;
}

const TaskDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [completeTasks, setCompleteTasks] = useState(1);

  const addTask = () => {
    if (completedTasks < totalTasks) {
      setCompletedTasks(completedTasks + 1);
    }
  };
  const reduceTask = () => {
    if (completeTasks < totalTasks) {
      setCompleteTasks(completeTasks - 1);
    }
  };

  const getDotColor = () => {
    const percentageCompleted = completedTasks / totalTasks;

    if (percentageCompleted === 1) return "gray";
    if (percentageCompleted >= 0.5) return "orange";
    return "red";
  };
  const invoices = [
    {
      work: "Hantsui davharlah",
      price: "250",
      completed: [completedTasks],
      total: [totalTasks],
      select: (
        <div className="flex gap-2 ">
          <Button
            onClick={reduceTask}
            style={{ backgroundColor: getDotColor() }}
          >
            -
          </Button>
          <Button onClick={addTask} style={{ backgroundColor: getDotColor() }}>
            +
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
            <TableHead> Нэгж Үнэ</TableHead>
            <TableHead> Тоо</TableHead>
            <TableHead className="text-right"> Шаардлагатай тоо</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.work}>
              <TableCell className="font-medium">{invoice.work}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell>{invoice.completed}</TableCell>
              <TableCell className="text-right">{invoice.total}</TableCell>
              <TableCell className="text-right">{invoice.select}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TaskDetailModal;
