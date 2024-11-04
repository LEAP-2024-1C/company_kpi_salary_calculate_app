"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { IComponents, IProduct, ISavedTasks } from "@/utils/interfaces";
import { apiUrl } from "@/lib/utils";
import { toast } from "react-toastify";

interface IContext {
  tasks: IComponents[] | null;
}

export const TaskContext = createContext<IContext>({
  tasks: null,
  // oneProduct: null,
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<IComponents[] | null>(null);

  const getSavedTasks = async (_id: string) => {
    const userToken = localStorage.getItem("token");

    const response = await axios.post(`${apiUrl}save/employee/task`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const tasks = response.data.tasks;
    setTasks(tasks);
    console.log("task", tasks);
  };
  const updateQuanity = async (productId: string, newQuantity: number) => {
    const [cartData, setCartData] = useState<ISavedTasks>({
      user: "",
      products: [],
    });
    // setCartData((prevCart) =>
    // prevCart.map((item) =>
    //   item.product._id === productId
    //     ? { ...item, quantity: newQuantity }
    //     : item
    // )
    // );
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/cart/update-cart`,
        {
          productId,
          newQuantity,
        },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      if (response.status === 200) {
        toast.success("Successfully updated");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    // getSavedTasks();
    // getProduct();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks }}>{children}</TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
