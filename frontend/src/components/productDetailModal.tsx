"use client";

import React, { useEffect, useState } from "react";
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
import { IProcedures, IProduct, ISavedTasks } from "@/utils/interfaces";
import { useUser } from "@/context/user-provider";
import { useParams } from "next/navigation";
import axios from "axios";

interface TaskTrackerProps {
  totalTasks: IProcedures[];
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const { id } = useParams();
  const [selectedQuantities, setSelectedQuantities] = useState<number[]>(
    totalTasks.map(() => 0)
  );

  useEffect(() => {
    // Initialize selected quantities array
    setSelectedQuantities(totalTasks.map(() => 0));
  }, [totalTasks]);

  const handleIncrement = (index: number) => {
    setSelectedQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity < totalTasks[index].quantity
          ? quantity + 1
          : quantity
      )
    );
  };

  const handleDecrement = (index: number) => {
    setSelectedQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity > 0 ? quantity - 1 : quantity
      )
    );
  };

  const handleSaveTasks = async () => {
    try {
      const savedTasks = totalTasks.map((task, index) => ({
        taskId: task._id,
        quantity: selectedQuantities[index],
      }));

      await axios.post(`/api/tasks/save`, { tasks: savedTasks });
      setSelectedQuantities(totalTasks.map(() => 0)); // Reset selections after saving
    } catch (error) {
      console.error("Error saving tasks", error);
    }
  };

  const taskTotals = totalTasks.map(
    (task, index) => selectedQuantities[index] * task.unitPrice
  );
  const totalPrice = taskTotals.reduce((sum, taskTotal) => sum + taskTotal, 0);

  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
            <TableHead> Нэгж Үнэ</TableHead>
            <TableHead className="text-right"> Шаардлагатай тоо</TableHead>
            <TableHead> Үлдсэн ажилууд</TableHead>
            <TableHead className="text-right"> Миний авсан ажилууд</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalTasks.map((task, index) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.taskName}</TableCell>
              <TableCell>{task.unitPrice}</TableCell>
              <TableCell className="text-right">{task.quantity}</TableCell>
              <TableCell>{task.quantity - selectedQuantities[index]}</TableCell>
              <TableCell className="text-right">
                <input
                  type="number"
                  value={selectedQuantities[index]}
                  readOnly
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 ">
                  <Button
                    // onClick={() => {
                    //   number - 1;
                    // }}
                    // style={{ borderColor: getDotColor() }}
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => handleDecrement(index)}
                  >
                    -
                  </Button>
                  <Button
                    // onClick={() => {
                    //   number + 1;
                    // }}
                    // style={{ borderColor: getDotColor() }}
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => handleIncrement(index)}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
            <TableCell className="text-right">{totalPrice}₮</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                onClick={handleSaveTasks}
                className="rounded-full border-green-700"
              >
                Хадгалах
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductDetailModal;
