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
import { IProcedures, IProduct, ISaveTasks, IStatus } from "@/utils/interfaces";
import { useParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import SavedTasksCard from "./savedTasksCard";
import { useForm, SubmitHandler } from "react-hook-form";

interface TaskTrackerProps {
  totalTasks: IProcedures[];
  productName: string;
  product_id: string;
  quantity: number;
  cat_id: number;
  setPro: Function;
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({
  totalTasks,
  productName,
  product_id,
  quantity,
  cat_id,
  setPro,
}) => {
  const [count, setCount] = useState<number[]>(
    new Array(totalTasks.length).fill(0)
  );
  const [tasks, setTasks] = useState<IProcedures[]>([]);

  const handleAdd = (i: number) => {
    console.log("idx", i);
    setCount((prev) => {
      const newCount = [...prev];
      if (totalTasks[i].status.pending === 0) {
        return newCount;
      }
      newCount[i]++;
      console.log("D", cat_id, i, newCount[i]);
      setPro(cat_id, i, newCount[i], "add");
      return newCount;
    });

    setTasks((prev) => {
      if (!prev) return prev;
      const newTask = [...prev];
      const findDuplicate = newTask.some(
        (item) => item._id === totalTasks[i]._id
      );
      if (!findDuplicate) {
        newTask.push(totalTasks[i]);
      }
      // newTask[i].status.progress = totalTasks[i].status.progress;
      console.log("newTask", newTask);
      return newTask;
    });
  };
  const handleSub = (i: number) => {
    console.log("I", i);
    setCount((prev) => {
      const newA = [...prev];
      if (newA[i] === 0) {
        return newA;
      }
      newA[i]--;
      console.log("D", cat_id, i, newA[i]);
      setPro(cat_id, i, newA[i], "sub");
      return newA;
    });

    setTasks((prev) => {
      const newTask = [...prev];
      const findDuplicate = newTask.some(
        (item) => item._id === totalTasks[i]._id
      );
      console.log(findDuplicate);
      if (findDuplicate) {
        newTask.splice(i, 1);
      }

      // newTask[i].status.progress = totalTasks[i].status.progress + 1;
      console.log("newTask", newTask);
      return newTask;
    });
  };
  return (
    <div className="flex ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[600px]">Хийгдэх ажилууд</TableHead>
            <TableHead className="text-center"> Нэгж Үнэ ₮</TableHead>
            <TableHead className="text-center"> Нэгжийн тоо</TableHead>
            <TableHead>Нийт ажилбарын тоо</TableHead>
            <TableHead className="text-center">Үлдсэн ажилууд Pendig</TableHead>
            <TableHead className="text-center">
              Миний авсан ажилууд Progress
            </TableHead>
            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalTasks.map((task, idx) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium ">
                <label htmlFor="">{task.taskName}</label>
              </TableCell>
              <TableCell>
                <label htmlFor="">{task.unitPrice}</label>
              </TableCell>
              <TableCell>
                <label htmlFor="">{task.quantity}</label>
              </TableCell>
              <TableCell>
                <label htmlFor="">{quantity}</label>
              </TableCell>
              <TableCell>
                <label htmlFor="">{task.status.pending}</label>
              </TableCell>
              <TableCell>
                <label htmlFor="">{count[idx]}</label>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 ">
                  <Button
                    type="button"
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => handleSub(idx)}
                  >
                    -
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full border bg-white text-green-900"
                    onClick={() => {
                      handleAdd(idx);
                    }}
                  >
                    +
                  </Button>
                </div>
                <button type="button" onClick={() => console.log("hi", idx)}>
                  add
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
            <TableCell className="text-right">{count}₮</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
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
