"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductDetailModal from "@/components/productDetailModal";
import { useUser } from "@/context/user-provider";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/product-provider";
import { useTasks } from "@/context/task-provider";

const TaskDetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const { products } = useProducts();
  const { tasks } = useTasks();
  console.log("tasks", tasks);
  return (
    <>
      {products?.map(
        ({
          _id,
          productName,
          quantity,
          components,
          images,
          description,
          status,
        }) => (
          <div className="w-full h-full bg-gray-100 flex flex-col items-center ">
            <div className="p-16 flex flex-col items-center gap-5 ">
              <div className="flex gap-[50px]">
                <div
                  className="w-[300px] h-[300px] rounded-xl border border-green-900 bg-gray-300"
                  style={{
                    backgroundImage: `url('${images}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>

                <div className="border border-green-900 rounded-xl p-5 bg-white">
                  <h1 className="text-green-900 text-2xl font-bold">
                    Тайлбар:
                  </h1>

                  <p className="text-green-800 w-[700px]">
                    Төрөл: {description}
                  </p>
                  <p className="text-green-800 w-[700px]">
                    Бүтээгдэхүүний нэр: {productName}
                  </p>
                  <p className="text-green-800 w-[700px]">
                    Хийгдэх тоо ширхэг: {quantity}
                  </p>
                  <p className="text-green-800 w-[700px]">Хугацаа:</p>
                  <p className="text-green-800 w-[700px]">Төлөв: {status}</p>
                </div>
              </div>
              {components.map(({ _id, categoryName, procedures }) => (
                <div className="bg-white p-5 rounded-lg border border-green-900">
                  <Accordion type="single" collapsible className=" w-[800px]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-green-900">
                        <p>{categoryName}</p>
                        <p>3</p>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ProductDetailModal totalTasks={10} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
              {/* <div className="bg-white p-5 rounded-lg border border-green-900">
                <Accordion type="single" collapsible className=" w-[800px]">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-green-900">
                      <p>Ханцуй</p>
                      <p>3</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ProductDetailModal totalTasks={10} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div> */}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TaskDetail;
