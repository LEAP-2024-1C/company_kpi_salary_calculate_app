import { IProduct } from "@/utils/interfaces";
import Link from "next/link";
import React, { useState } from "react";
import ProductDetailModal from "./productDetailModal";
import { useProducts } from "@/context/product-provider";

const TaskTracker = () => {
  // const getDotColor = () => {
  //   const percentageCompleted = completedTasks / totalTasks;

  //   if (percentageCompleted === 1) return "green";
  //   if (percentageCompleted >= 0.5) return "orange";
  //   return "red";
  // };
  const { products } = useProducts();
  console.log("products", products);
  return (
    <>
      {products?.map(({ _id, productName, quantity, components }) => (
        <Link
          href={
            // {"/product-detail"}
            "/" + _id
          }
        >
          <div
            className="bg-gray-200 rounded-xl p-5 flex flex-col border text-green-900 "
            // style={{ borderColor: getDotColor() }}
          >
            <h1 className="text-3xl font-bold ">{productName}</h1>
            {components.map(({ _id, categoryName, procedures }) => (
              <ul>
                <li className="flex items-center gap-3">
                  <div>{categoryName}</div>
                  <p>
                    (1
                    {/* {procedures.filter((item)=>item.status==="pending")}  */}
                    / {procedures.length})
                  </p>
                </li>
              </ul>
            ))}
            <div className="w-full flex ">
              <p className="text-blue-500 justify-self-end">Status</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default TaskTracker;
