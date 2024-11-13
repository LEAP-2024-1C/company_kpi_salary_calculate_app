"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/lib/utils";
import { ISavedTasks, ISavedProduct, IProcedures } from "@/utils/interfaces";
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
import StatusIndicator from "@/components/status";

// type SentData = {
//   component_id: string;
//   task_id: string;
//   product_id: string;
// };

const MyTasks = () => {
  const [cartData, setCartData] = useState<ISavedTasks | null>(null);
  const [open, setOpen] = useState<boolean[]>([]);
  // const [data, setData] = useState<SentData | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCartData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}savedTask`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        const data = response.data.cart;
        setCartData(data);
        console.log("data", data);
        setOpen(new Array(data.products.length).fill(false));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch saved tasks");
    }
  };
  const updateComponentStatus = async (
    component_id: string,
    task_id: string,
    assign: number,
    product_id: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const res = await axios.put(
        `${apiUrl}comp/update/status/employee`,
        {
          compStatus: {
            product_id,
            component_id,
            task_id,
            assign,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setRefresh((prev) => !prev);
        setIsLoading(true);
        toast.success("succes");
        console.log("succes");
      }
    } catch (error) {
      // setIsLoading(false);
      console.error(error);
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("object", isLoading);
  // const updateEmployeeStatus = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     setIsLoading(true);
  //     const res = await axios.put(
  //       `${apiUrl}picked/employee`,
  //       {
  //         data,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     if (res.status === 200) {
  //       setIsLoading(false);
  //       setData(null);
  //       setRefresh((prev) => !prev);
  //       console.log("succes");
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error);
  //   }
  // };

  const handleOpen = (proId: number) => {
    setOpen((prev) =>
      prev.map((isOpen, index) => (index === proId ? !isOpen : isOpen))
    );
  };
  const handleStatus = (
    comp_id: string,
    task_id: string,
    assign: number,
    pro_id: string
  ) => {
    updateComponentStatus(comp_id, task_id, assign, pro_id);
    console.log("pro_id", pro_id);
    console.log("comp_id", comp_id);
    console.log("task_id", task_id);
    console.log("assign", assign);
  };
  const calculateProductTotal = (product: ISavedProduct): number => {
    return product.components.reduce((productTotal, component) => {
      const componentTotal = component.procedures.reduce((sum, procedure) => {
        return (
          sum +
          procedure.unitPrice * procedure.status.assign * procedure.quantity
        );
      }, 0);
      return productTotal + componentTotal;
    }, 0);
  };
  useEffect(() => {
    getCartData();
  }, [refresh]);
  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   updateEmployeeStatus();
  // }, [refresh]);

  return (
    <div className="bg-gray-50 min-h-screen w-full p-10">
      <h1 className="text-green-900 font-bold text-4xl mb-8 text-center">
        Миний авсан ажилууд
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {cartData?.products.map((product, productIdx) => {
          const productTotal = calculateProductTotal(product);
          return (
            <div
              key={productIdx}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col border border-green-200 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold text-green-700">
                  {product.productName}
                </h1>
              </div>

              <Table className="mt-6">
                <TableHeader>
                  <TableRow className="bg-teal-100">
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
                      {component.procedures.map(
                        (task: IProcedures, taskIdx) => (
                          <TableRow
                            key={`${compIdx}-${taskIdx}`}
                            className="hover:bg-gray-50"
                          >
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>{task.unitPrice}₮</TableCell>
                            <TableCell>{task.quantity}</TableCell>
                            <TableCell>{task.status.assign}</TableCell>
                            <TableCell>
                              <div className="p-1 text-center rounded-full">
                                <StatusIndicator status={task.taskStatus} />
                              </div>
                            </TableCell>
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
                                {/* {task.taskStatus === "review"
                                      ? "In review"
                                      : task.taskStatus === "done"
                                      ? "Task complete"
                                      : "Send to review"} */}
                                {isLoading ? (
                                  <span className="loader loader-spinner loading-md"></span>
                                ) : task.taskStatus === "review" ? (
                                  "In review"
                                ) : task.taskStatus === "done" ? (
                                  "Task complete"
                                ) : (
                                  "Send to review"
                                )}
                              </Button>{" "}
                              <span className="loader loader-spinner loading-md "></span>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7} className="font-bold text-right">
                      Авсан ажлын үнэлгээ:
                    </TableCell>
                    <TableCell className="font-bold text-green-700">
                      {productTotal} ₮
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTasks;
