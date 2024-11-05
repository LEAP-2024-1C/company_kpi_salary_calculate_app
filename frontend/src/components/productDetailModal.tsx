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

type Inputs = {
  taskName: string;
  unitPrice: number;
  quantity: string;
  status: IStatus;
};

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs[]>();
  const onSubmit: SubmitHandler<Inputs[]> = (data) => {
    // console.log("FORM", data);
    console.log("P", totalTasks);
  };

  const handleAdd = (i: number) => {
    console.log("idx", i);
    setCount((prev) => {
      const newA = [...prev];
      newA[i]++;
      console.log("D", cat_id, i, newA[i]);
      setPro(cat_id, i, newA[i]);
      return newA;
    });
  };
  const handleSub = (i: number) => {
    console.log("I", i);
    setCount((prev) => {
      const newA = [...prev];
      newA[i]--;
      console.log("D", cat_id, i, newA[i]);
      setPro(cat_id, i, newA[i]);
      return newA;
    });
  };

  console.log(count);
  return (
    <div className="flex ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[600px]">Хийгдэх ажилууд</TableHead>
              <TableHead className="text-center"> Нэгж Үнэ ₮</TableHead>
              <TableHead className="text-center"> Нэгжийн тоо</TableHead>
              <TableHead>Нийт ажилбарын тоо</TableHead>
              <TableHead className="text-center">
                Үлдсэн ажилууд Pendig
              </TableHead>
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
                  <input
                    defaultValue={task.taskName}
                    type="text"
                    readOnly
                    className="bg-inherit w-[300px]"
                    // {...register(`${idx}.taskName`)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    readOnly
                    defaultValue={task.unitPrice}
                    className="bg-inherit text-center w-20"
                    // {...register(`${idx}.unitPrice`)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    readOnly
                    defaultValue={task.quantity}
                    value={task.quantity}
                    className="bg-inherit text-center w-20"
                    // {...register(`${idx}.quantity`)}
                  />
                </TableCell>
                <TableCell>
                  {/* <input
                    type="text"
                    className="bg-inherit text-center w-20"
                    disabled
                    value={quantity}
                  /> */}
                  <label htmlFor="">{quantity}</label>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    className="bg-inherit text-center w-20"
                    readOnly
                    defaultValue={task?.status.pending}
                    value={task?.status.pending}
                    // {...register(`${idx}.status.pending`)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    className="text-center w-20"
                    value={count[idx]}
                    // {...register(`${idx}.status.progress`)} //
                  />
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
                  // onClick={handleSaveTasks}
                  className="rounded-full border-green-700"
                >
                  Хадгалах
                </Button>
                <input type="submit" />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </form>
    </div>
  );
};
export default ProductDetailModal;
