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
import { useUser } from "@/context/user-provider";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/product-provider";

interface TaskTrackerProps {
  totalTasks: number;
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const { user } = useUser();
  const { id } = useParams();
  const { oneProduct, getProduct, products } = useProducts();
  const [productQuantity, setProductQuantity] = useState(0);

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
      myWork: [products.quantity],
      select: (
        <div className="flex gap-2 ">
          <Button
            onClick={() => {
              products.quantity - 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            -
          </Button>
          <Button
            onClick={() => {
              products.quantity + 1;
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
      myWork: [products.quantity],
      select: (
        <div className="flex gap-2 ">
          <Button
            onClick={() => {
              products.quantity - 1;
            }}
            style={{ borderColor: getDotColor() }}
            className="rounded-full border bg-white text-green-900"
          >
            -
          </Button>
          <Button
            onClick={() => {
              products.quantity + 1;
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
