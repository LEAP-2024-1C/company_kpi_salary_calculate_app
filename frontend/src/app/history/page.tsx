"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-provider";

const SalaryCalculator = () => {
  const { cartData, isLoading, updateComponentStatus, calculateProductTotal } =
    useCart();

  const handleStatus = (
    comp_id: string,
    task_id: string,
    assign: number,
    pro_id: string
  ) => {
    updateComponentStatus(comp_id, task_id, assign, pro_id);
  };

  return (
    <div
      className="bg-gray-50 min-h-screen w-full text-center p-10"
      // style={{
      //   backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.5), rgba(250, 250, 250, 0.5)),url('https://i.pinimg.com/474x/55/3f/e1/553fe1cc62f86ea61c26ef0ff0b7c0ac.jpg')`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      <div className="w-full flex justify-center flex-col">
        <h1 className="text-green-900 font-bold text-4xl mb-8 text-center p-2 bg-gray-50 rounded-full">
          Миний гүйцэтгэсэн ажлуудын түүх
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {cartData?.products.map((product, productIdx) => {
            const productTotal = calculateProductTotal(product);
            return (
              <div
                key={productIdx}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col border-2 border-cyan-700 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold text-green-700 ">
                    {product.productName}
                  </h1>
                </div>

                <Table className="mt-6">
                  <TableHeader className="bg-teal-100">
                    <TableRow>
                      <TableHead>Хэсгүүд</TableHead>
                      <TableHead>Ажилбарууд</TableHead>
                      <TableHead>Нэгжийн үнэ</TableHead>
                      <TableHead>Тоо ширхэг</TableHead>
                      <TableHead>Миний авсан</TableHead>
                      <TableHead>Ажлын төлөв</TableHead>
                      <TableHead>Нийт үнэлгээ</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.components.map((component, compIdx) => (
                      <React.Fragment key={compIdx}>
                        <TableRow>
                          <TableCell
                            rowSpan={component.procedures.length + 1}
                            className="font-medium text-green-600"
                          >
                            {component.categoryName}
                          </TableCell>
                        </TableRow>
                        {component.procedures.map((task, taskIdx) => (
                          <TableRow
                            key={`${compIdx}-${taskIdx}`}
                            className="hover:bg-gray-50"
                          >
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>{task.unitPrice}₮</TableCell>
                            <TableCell>{task.quantity}</TableCell>
                            <TableCell>{task.status.assign}</TableCell>
                            <TableCell>{task.taskStatus}</TableCell>
                            <TableCell>
                              {task.unitPrice *
                                task.status.assign *
                                task.quantity}
                              ₮
                            </TableCell>
                            <TableCell>
                              <Button
                                className={`px-4 py-2 text-white w-[120px] ${
                                  task.taskStatus === "done"
                                    ? "cursor-not-allowed bg-gray-500"
                                    : task.taskStatus === "review"
                                    ? "cursor-not-allowed bg-blue-500"
                                    : " bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                                disabled={
                                  task.taskStatus === "done" ||
                                  task.taskStatus === "review" ||
                                  isLoading
                                }
                                onClick={() =>
                                  handleStatus(
                                    component._id,
                                    task._id,
                                    task.status.assign,
                                    product.product_id
                                  )
                                }
                              >
                                {isLoading ? (
                                  <span className="loader loader-spinner loading-md"></span>
                                ) : task.taskStatus === "review" ? (
                                  "In review"
                                ) : task.taskStatus === "done" ? (
                                  "Task complete"
                                ) : (
                                  "Send to review"
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={7} className="text-right font-bold">
                        Авсан ажлын үнэлгээ:
                      </TableCell>
                      <TableCell className="font-bold">
                        {productTotal}₮
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
