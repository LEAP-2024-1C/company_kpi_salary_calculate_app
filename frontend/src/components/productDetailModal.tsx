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
import { apiUrl } from "@/lib/utils";
import { toast } from "react-toastify";
import { IProduct } from "@/utils/interfaces";
import axios from "axios";

interface TaskTrackerProps {
  totalTasks: number;
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [productData, setProductData] = useState<IProduct>({
    id: "",
    productName: "",
    description: "",
    images: [""],
    quantity: 0,
    status: 0,
    category: [{}],
  });
  const getProductData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      console.log("User Token:", userToken);
      const response = await axios.get(`${apiUrl}get-product`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log("response:", response);
      if (response.status === 200) {
        console.log("Product Data:", response.data);
        setProductData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:");
      toast.error("Failed to fetch product");
    }
  };

  const updateQuanity = async (productId: string, newQuantity: number) => {
    // setProductData((prevTask) =>
    // prevTask.map((item) =>
    //   item.product._id === productId
    //     ? { ...item, quantity: newQuantity }
    //     : item
    // )
    // );
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${apiUrl}update-product`,
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
      toast.error("Failed to add to task");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // const addTask = () => {
  //   if (completedTasks < totalTasks - 3) {
  //     setCompletedTasks(completedTasks + 1);
  //   }
  // };
  // const reduceTask = () => {
  //   if (completedTasks < totalTasks - 3) {
  //     setCompletedTasks(completedTasks - 1);
  //   }
  // };

  const getDotColor = () => {
    const percentageCompleted = completedTasks / totalTasks - 3;

    if (percentageCompleted === 1) return "gray";
    if (percentageCompleted >= 0.5) return "orange";
    return "red";
  };
  const invoices = [
    {
      work: "Ханцуй давхарлах",
      price: "250",
      completed: [totalTasks - 3],
      total: [totalTasks],
      myWork: [productData.quantity],
      select: (
        <div className="flex gap-2 ">
          <Button
            onClick={() => {
              productData.quantity - 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            -
          </Button>
          <Button
            onClick={() => {
              productData.quantity + 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            +
          </Button>
        </div>
      ),
      save: (
        <Button variant="outline" className="rounded-full border-green-700">
          Хадгалах
        </Button>
      ),
    },
    {
      work: "Ханцуй оёх",
      price: "250",
      completed: [totalTasks - 3],
      total: [totalTasks],
      myWork: [productData.quantity],
      select: (
        <div className="flex gap-2 ">
          <Button
            onClick={() => {
              productData.quantity - 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            -
          </Button>
          <Button
            onClick={() => {
              productData.quantity + 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            +
          </Button>
        </div>
      ),
      save: (
        <Button variant="outline" className="rounded-full border-green-700">
          Хадгалах
        </Button>
      ),
    },
  ];

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
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.work}>
              <TableCell className="font-medium">{invoice.work}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell className="text-right">{invoice.total}</TableCell>
              <TableCell>{invoice.completed}</TableCell>
              <TableCell className="text-right">{invoice.myWork}</TableCell>
              <TableCell className="text-right">{invoice.select}</TableCell>
              <TableCell className="text-right">{invoice.save}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Авсан ажлуудын үнэлгээ</TableCell>
            <TableCell className="text-right">₮</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ProductDetailModal;
