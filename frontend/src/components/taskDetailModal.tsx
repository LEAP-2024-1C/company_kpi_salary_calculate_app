"use client";

import React from "react";
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

const invoices = [
  {
    work: "Hantsui davharlah",
    price: "250",
    completed: "4",
    total: "10",
  },
  {
    work: "Hantsui davharlah",
    price: "250",
    completed: "4",
    total: "10",
  },
];
const TaskDetailModal = () => {
  return (
    <div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Хийгдэх ажилууд</TableHead>
            <TableHead> Нэгж Үнэ</TableHead>
            <TableHead> Тоо</TableHead>
            <TableHead className="text-right"> Шаардлагатай тоо</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.work}>
              <TableCell className="font-medium">{invoice.work}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell>{invoice.completed}</TableCell>
              <TableCell className="text-right">{invoice.total}</TableCell>
              <TableCell className="text-right">
                <Button>Select</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TaskDetailModal;
