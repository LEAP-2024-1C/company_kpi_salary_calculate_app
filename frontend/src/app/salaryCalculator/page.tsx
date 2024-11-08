"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/lib/utils";
import {
  ITask,
  ISavedTasks,
  ISavedProduct,
  ISavedComponents,
  IStatus,
} from "@/utils/interfaces";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Button } from "@/components/ui/button";
const SalaryCalculator = () => {
  const [cartData, setCartData] = useState<ISavedTasks | null>(null);
  const getCartData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}savedTask`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setCartData(response.data.cart);
      }
      console.log("data", response.data.cart);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch saved tasks");
    }
  };
  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <h1 className="text-green-900 font-bold text-3xl p-20 mb-16">
        Миний авсан ажилууд
      </h1>
      <div className=" flex flex-col gap-5 ">
        {cartData?.products.map((product: ISavedProduct) => (
          <div
            className="bg-gray-200 rounded-xl p-5 flex flex-col border text-green-900 w-[700px]"
            // style={{ borderColor: getColor() }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="">
                  <div
                    className="w-[100px] h-[100px] rounded-xl"
                    style={{
                      // backgroundImage: `url('${image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <h1 className="text-3xl font-bold bg-gray-50 p-2 rounded-xl">
                    {product.productName}
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          Хийгдэх ажилууд
                        </TableHead>
                        <TableHead> Нэгж Үнэ</TableHead>
                        <TableHead> Нэгжийн тоо</TableHead>
                        <TableHead className="text-right">
                          Миний авсан ажилууд
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.components.map((component: ISavedComponents) => (
                        <TableRow>
                          <TableCell className="font-medium">
                            {component.categoryName}
                          </TableCell>
                          {component.procedures.map((task: ITask) => (
                            <div>
                              <TableCell>{task.unitPrice}</TableCell>
                              <TableCell>{task.quantity}</TableCell>
                              <TableCell className="text-right">
                                {task.status.assign}
                              </TableCell>
                            </div>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>
                          Авсан ажлуудын үнэлгээ
                        </TableCell>
                        <TableCell className="text-right">₮</TableCell>
                        <TableCell className="text-right">
                          {/* <Button
                            variant="outline"
                            // onClick={sendSavedTasks}
                            className="rounded-full border-green-700"
                          >
                            Хадгалах
                          </Button> */}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full flex "></div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SalaryCalculator;
