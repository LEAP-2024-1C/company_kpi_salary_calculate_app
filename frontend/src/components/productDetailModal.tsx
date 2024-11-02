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
import { useParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import SavedTasksCard from "./savedTasksCard";
interface TaskTrackerProps {
  totalTasks: IProcedures[];
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const { id } = useParams();
  const [oneProductDatas, setOneProduct] = useState<IProduct>();
  const getCurrentProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/${id}`);
      if (res.status === 200) {
        const { oneProductDatas } = res.data;
        console.log("data", oneProductDatas);
        setOneProduct(oneProductDatas);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("id", id);
  console.log("oneProduct", oneProductDatas);
  useEffect(() => {
    getCurrentProduct();
  }, []);

  const [selectedQuantities, setSelectedQuantities] = useState<number[]>(
    totalTasks.map(() => 0)
  );
  const [savedTasks, setSavedTasks] = useState<
    { taskId: string; quantity: number }[]
  >([]);
  // const [savedTasks, setSavedTasks] = useState<object>();

  useEffect(() => {
    setSelectedQuantities(totalTasks.map(() => 0));
  }, [totalTasks]);

  const productQuantity = oneProductDatas?.quantity;
  const add = (index: number) => {
    setSelectedQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity < productQuantity ? quantity + 1 : quantity
      )
    );
  };
  const reduce = (index: number) => {
    setSelectedQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index && quantity > 0 ? quantity - 1 : quantity
      )
    );
  };

  const handleSaveTasks = async () => {
    try {
      const tasksToSave = totalTasks
        .map((task, i) => ({
          taskId: task._id,
          quantity: selectedQuantities[i],
        }))
        .filter((task) => task.quantity > 0);
      if (tasksToSave.length === 0) {
        console.log("No tasks to save.");
        return;
      }
      console.log("Tasks to save:", tasksToSave);
      // await axios.post(`${apiUrl}tasks/updateTasks`, { tasks: tasksToSave });
      setSelectedQuantities(totalTasks.map(() => 0));
    } catch (error) {
      console.error("Error sending saved tasks", error);
    }
  };

  const taskTotals = totalTasks.map(
    (task, i) => selectedQuantities[i] * task.unitPrice * task.quantity
  );
  const totalPrice = taskTotals.reduce((sum, taskTotal) => sum + taskTotal, 0);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
            <TableHead> Нэгж Үнэ</TableHead>
            <TableHead className="text-right"> Нэгжийн тоо</TableHead>
            <TableHead> Бүтээгдэхүүний нийт тоо</TableHead>
            <TableHead className="text-right"> Үлдсэн ажилууд</TableHead>
            <TableHead className="text-right"> Миний авсан ажилууд</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalTasks.map((task, i) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.taskName}</TableCell>
              <TableCell>{task.unitPrice}</TableCell>
              <TableCell className="text-right">{task.quantity}</TableCell>
              <TableCell>{productQuantity}</TableCell>
              <TableCell>{productQuantity - selectedQuantities[i]}</TableCell>
              <TableCell className="text-right">
                <input type="number" value={selectedQuantities[i]} readOnly />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 ">
                  <Button
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => reduce(i)}
                  >
                    -
                  </Button>
                  <Button
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => add(i)}
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
      {totalTasks.map((task, i) => (
        <SavedTasksCard
          key={task._id}
          task={task}
          selectedQuantity={selectedQuantities[i]}
        />
      ))}
    </div>
  );
};
export default ProductDetailModal;
