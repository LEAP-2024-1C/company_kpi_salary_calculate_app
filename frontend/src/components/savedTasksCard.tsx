"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISaveTasks } from "@/utils/interfaces";

interface SavedTasksCardProps {
  cartData: ISaveTasks[];
}

const SavedTasksCard: React.FC<SavedTasksCardProps> = ({ cartData }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
          <TableHead> Нэгж Үнэ</TableHead>
          <TableHead> Нэгжийн тоо</TableHead>
          <TableHead className="text-right"> Миний авсан ажилууд</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartData.map((task) => (
          <TableRow key={task._id}>
            <TableCell className="font-medium">{task.taskName}</TableCell>
            <TableCell>{task.unitPrice}</TableCell>
            <TableCell>{task.quantity}</TableCell>
            <TableCell className="text-right">
              {task.selectedQuantity}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
          <TableCell className="text-right">
            {cartData.reduce(
              (total, task) => total + task.unitPrice * task.quantity,
              0
            )}
            ₮
          </TableCell>
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
