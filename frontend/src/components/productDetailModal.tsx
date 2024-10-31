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
import { useProducts } from "@/context/product-provider";

interface TaskTrackerProps {
  totalTasks: IProcedures[];
}

const ProductDetailModal: React.FC<TaskTrackerProps> = ({ totalTasks }) => {
  const { id } = useParams();
  const [number, setNumber] = useState<number>();
  const [updateQuantity, setUpdateQuantity] = useState();
  const [cartData, setCartData] = useState<ISavedTasks>();

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
          {totalTasks.map(({ taskName, quantity, unitPrice, _id, status }) => (
            <TableRow key={_id}>
              <TableCell className="font-medium">{taskName}</TableCell>
              <TableCell>{unitPrice}</TableCell>
              <TableCell className="text-right">{quantity}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell className="text-right">
                {<input type="number" value={quantity} />}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 ">
                  <Button
                    // onClick={() => {
                    //   number - 1;
                    // }}
                    // style={{ borderColor: getDotColor() }}
                    className="rounded-full border bg-white text-green-900"
                  >
                    -
                  </Button>
                  <Button
                    // onClick={() => {
                    //   number + 1;
                    // }}
                    // style={{ borderColor: getDotColor() }}
                    className="rounded-full border bg-white text-green-900"
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
            <TableCell className="text-right">₮</TableCell>
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
