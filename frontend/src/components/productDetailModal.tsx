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
import {
  IComponents,
  IProcedures,
  IProduct,
  ISavedTasks,
  ISaveTasks,
} from "@/utils/interfaces";
import { useParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import SavedTasksCard from "./savedTasksCard";
import { toast } from "react-toastify";
import UserProvider, { useUser } from "@/context/user-provider";
interface TaskTrackerProps {
  totalTasks: IProcedures[];
  categoryName: string;
  _id: string;
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({
  totalTasks,
  categoryName,
  _id,
}) => {
  const { id } = useParams();
  const { user } = useUser();
  const [oneProductDatas, setOneProduct] = useState<IProduct>();
  const getCurrentProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/${id}`);
      if (res.status === 200) {
        const { oneProductDatas } = res.data;
        setOneProduct(oneProductDatas);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, []);

  const [selectedQuantities, setSelectedQuantities] = useState<number[]>(
    totalTasks.map(() => 0)
  );
  const [savedTasks, setSavedTasks] = useState<
    { taskId: string; quantity: number }[]
  >([]);

  useEffect(() => {
    setSelectedQuantities(totalTasks.map(() => 0));
  }, [totalTasks]);

  const productQuantity = oneProductDatas?.quantity || 0;
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
      const componentsToSave = totalTasks
        .map((task, i) => ({
          _id: _id,
          categoryName: categoryName,
          procedures: [
            {
              _id: task._id,
              taskName: task.taskName,
              quantity: selectedQuantities[i],
              unitPrice: task.unitPrice,
              status: {
                pending: task.status.pending - selectedQuantities[i],
                progress: selectedQuantities[i],
                done: 0,
                review: 0,
              },
            },
          ],
        }))
        .filter((component) => component.procedures[0].quantity > 0);

      if (componentsToSave.length === 0) {
        console.log("No tasks to save.");
        return;
      }
      const tasksToSave = {
        user_id: user?._id,
        products: [
          {
            product_id: id,
            productName: oneProductDatas?.productName,
            components: componentsToSave,
          },
        ],
      };
      console.log("Tasks to user:", user);
      console.log("Tasks to save:", tasksToSave);
      await axios.post(`${apiUrl}save/employee/task`, tasksToSave);

      setSelectedQuantities(totalTasks.map(() => 0));
      console.log("Tasks saved successfully.");
    } catch (error) {
      console.error("Error sending saved tasks", error);
    }
  };

  // useEffect(() => {
  //   if (id && typeof id === "string") {
  //     getCurrentProduct(id);
  //   }
  // }, [id, getCurrentProduct]);

  const taskTotals = totalTasks.map(
    (task, i) => selectedQuantities[i] * task.unitPrice * task.quantity
  );
  const totalPrice = taskTotals.reduce((sum, taskTotal) => sum + taskTotal, 0);

  // const [savedTasksData, setSavedTasksData] = useState<ISavedTasks>({
  //   user: "",
  //   products: [],
  // });
  // const getSavedTasksData = async () => {
  //   try {
  //     const userToken = localStorage.getItem("token");
  //     console.log("User Token:", userToken);
  //     const response = await axios.get(`${apiUrl}get-savedTaks`, {
  //       headers: { Authorization: `Bearer ${userToken}` },
  //     });
  //     console.log("response:", response);
  //     if (response.status === 200) {
  //       console.log("Cart Data:", response.data.cart.products);
  //       setSavedTasksData(response.data.cart.products);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:");
  //     toast.error("Failed to fetch cart data");
  //   }
  // };

  // const updateQuanity = async (productId: string, newQuantity: number) => {
  //   setSavedTasksData((prevSavedTasks) =>
  //     prevSavedTasks.map((item) =>
  //       item.product._id === productId
  //         ? { ...item, quantity: newQuantity }
  //         : item
  //     )
  //   );
  //   const userToken = localStorage.getItem("token");
  //   try {
  //     const response = await axios.put(
  //       `${apiUrl}update-cart`,
  //       {
  //         productId,
  //         newQuantity,
  //       },
  //       { headers: { Authorization: `Bearer ${userToken}` } }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Successfully updated");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     toast.error("Failed to add to cart");
  //   }
  // };
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
            <TableHead className="text-right"></TableHead>
            <TableHead className="text-right"> Миний авсан ажилууд</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalTasks.map((task, i) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.taskName}</TableCell>
              <TableCell>{task.unitPrice}</TableCell>
              <TableCell className="text-right">{task.quantity}</TableCell>
              <TableCell>{productQuantity}</TableCell>
              <TableCell>
                {task?.status.pending - selectedQuantities[i]}
              </TableCell>
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

      {/* {cartData && cartData.length > 0 ? (
        <SavedTasksCard cartData={cartData} />
      ) : (
        <p>No saved tasks available.</p>
      )} */}
    </div>
  );
};
export default ProductDetailModal;
