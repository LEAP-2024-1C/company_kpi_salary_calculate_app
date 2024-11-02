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
import { ISavedTasks } from "@/utils/interfaces";
import { apiUrl } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

const SavedTasksCard = ({ task, selectedQuantity }) => {
  const [cartData, setCartData] = useState<ISavedTasks[] | null>(null);
  const getSavedTasks = async () => {
    try {
      const userToken = localStorage.getItem("token");
      console.log("User Token:", userToken);
      const response = await axios.get(`${apiUrl}tasks/get-savedTasks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log("response:", response);
      if (response.status === 200) {
        console.log("Cart Data:", response.data.cart.products);
        setCartData(response.data.cart.products);
      }
    } catch (error) {
      console.error("Error fetching data:");
      toast.error("Failed to fetch cart data");
    }
  };

  const updateQuanity = async (productId: string, newQuantity: number) => {
    setCartData((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${apiUrl}cart/update-cart`,
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
    getSavedTasks();
  }, []);

  console.log("cartData", cartData);
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
        <TableRow key={task._id}>
          <TableCell className="font-medium">{task.taskName}</TableCell>
          <TableCell>{task.unitPrice}</TableCell>
          <TableCell>{task.quantity}</TableCell>
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
