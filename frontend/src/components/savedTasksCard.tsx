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
import { ISavedTasks } from "@/utils/interfaces";
import { apiUrl } from "@/lib/utils";
import axios from "axios";

const SavedTasksCard = ({ task, selectedQuantity }) => {
  // const [selectedQuantities, setSelectedQuantities] = useState<number[]>(
  //   savedTasks.map(() => 0)
  // );
  // const sendSavedTasks = async () => {
  //   try {
  //     const sendSavedTasks = savedTasks.map((task, i) => ({
  //       taskId: task._id,
  //       quantity: selectedQuantities[i],
  //     }));
  //     console.log("savedTasks", savedTasks);
  //     await axios.post(`${apiUrl}`, { savedTasks: sendSavedTasks });
  //     setSelectedQuantities(savedTasks.map(() => 0));
  //   } catch (error) {
  //     console.error("Error saving tasks", error);
  //   }
  // };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
          <TableHead> Нэгж Үнэ</TableHead>
          <TableHead className="text-right"> Миний авсан ажилууд</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={task._id}>
          <TableCell className="font-medium">{task.taskName}</TableCell>
          <TableCell>{task.unitPrice}</TableCell>
          <TableCell className="text-right">{selectedQuantity}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
          <TableCell className="text-right">{}₮</TableCell>
          <TableCell className="text-right">
            <Button
              variant="outline"
              // onClick={sendSavedTasks}
              className="rounded-full border-green-700"
            >
              Хадгалах
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default SavedTasksCard;
