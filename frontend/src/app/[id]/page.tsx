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

const TaskDetail = () => {
  // const { user } = useUser();
  // const { id } = useParams();
  // const { products } = useProducts();
  // const [productQuantity, setProductQuantity] = useState(0);
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center ">
      <div className="p-16 flex flex-col items-center gap-5 ">
        <div className="flex gap-[50px]">
          <img
            src=""
            alt=""
            className="w-[300px] h-[300px] rounded-xl border border-green-900 bg-gray-300"
          />
          <div className="border border-green-900 rounded-xl p-5 bg-white">
            <h1 className="text-green-900 text-2xl font-bold">Description</h1>
            <p className="text-green-800 w-[700px]">Бүтээгдэхүүний нэр: Цамц</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-green-900">
          <Accordion type="single" collapsible className=" w-[800px]">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-green-900">
                <p>Ханцуй </p>
                <p>3</p>
              </AccordionTrigger>
              <AccordionContent>
                <ProductDetailModal totalTasks={10} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="bg-white p-5 rounded-lg border border-green-900">
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
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
