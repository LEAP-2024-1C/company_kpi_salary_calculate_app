"use client";

import React, { useState } from "react";
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
import { IChooseTasks, IProcedures, ISavedProduct } from "@/utils/interfaces";

import axios from "axios";
import { apiUrl } from "@/lib/utils";
import { useUser } from "@/context/user-provider";
import { toast } from "react-toastify";

interface TaskTrackerProps {
  totalTasks: IProcedures[];
  productName: string;
  product_id: string;
  quantity: number;
  cat_id: string;
  cat_idx: number;
  categoryName: string;
  setPro: Function;
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({
  totalTasks,
  productName,
  product_id,
  quantity,
  cat_id,
  cat_idx,
  setPro,
  categoryName,
}) => {
  const { setRefresh } = useUser();

  const [tasks, setTasks] = useState<IProcedures[]>([]);
  const [saveProduct, setSaveProduct] = useState<ISavedProduct>();
  const [chooseTask, setChooseTask] = useState<IChooseTasks>();

  const createSelectedTasks = async (saveProduct: ISavedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}save/employee/task`,
        {
          saveProduct,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setRefresh((prev) => !prev);
        toast.success("Таны сонгосон ажилбарууд амжилттай бүртгэгдлээ");
        console.log("created new employee task success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const updateProducts = async (updateComp: IChooseTasks) => {
    try {
      if (!chooseTask) {
        return chooseTask;
      }
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${apiUrl}comp/update`,
        {
          updateComp,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setRefresh((prev) => !prev);
        console.log("updated components success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdd = (i: number) => {
    setPro(cat_idx, i, "add");
    setTasks((prev) => {
      if (!prev) return prev;
      const newTask = [...prev];
      const findDuplicate = newTask.some(
        (item) => item._id === totalTasks[i]._id
      );
      if (!findDuplicate) {
        newTask.push(totalTasks[i]);
      }
      console.log("newTask", newTask);
      return newTask;
    });
  };
  const handleSub = (i: number) => {
    // console.log("handleSub called for index:", i);
    setPro(cat_idx, i, "sub");
    setTasks((prev) => {
      if (prev.length === 0) {
        // console.error("Index out of bounds:", i);
        return prev;
      }
      const newTask = [...prev];
      // console.log("Before removing, tasks:", prev);
      const assignStatus = newTask[i]?.status?.assign;
      const findIndex = newTask.findIndex(
        (item) => item._id === totalTasks[i]._id
      );
      if (assignStatus === 0) {
        newTask.splice(findIndex, 1);
      }
      // console.log("Updated tasks:", newTask);
      return newTask;
    });
  };

  const handleSubmit = () => {
    setSaveProduct((prev) => {
      const newSaveTask = {
        ...prev,
        product_id,
        productName,
        components: [{ _id: cat_id, categoryName, procedures: tasks }],
      };
      console.log("Saved product:", newSaveTask);
      createSelectedTasks(newSaveTask);
      return newSaveTask;
    });
    const deleteAssign = tasks.map((item) => {
      return {
        ...item,
        status: {
          ...item.status,
          assign: 0,
        },
      };
    });

    const updatedTask = {
      ...chooseTask,
      component_id: cat_id,
      procedures: deleteAssign,
    };
    updateProducts(updatedTask);
    setChooseTask(updatedTask);
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
                <label htmlFor="">{task.status.assign}</label>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
            <TableCell className="text-right">
              {tasks
                .map((el) => {
                  let total = 0;
                  total = el.quantity * el.unitPrice * el.status.assign;
                  return total;
                })
                .reduce((acc, total) => acc + total, 0)}
              ₮
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                className="rounded-full border-green-700"
                onClick={handleSubmit}
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
