"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useUser } from "@/context/user-provider";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/product-provider";
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import { IProduct } from "@/utils/interfaces";
import ProductDetailModal from "@/components/productDetailModal";
import { toast } from "react-toastify";
// import { useTasks } from "@/context/task-provider";

const TaskDetail = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [oneProduct, setOneProduct] = useState<IProduct>();

  const getCurrentProduct = async () => {
    try {
      console.log("id", id);
      const res = await axios.get(`${apiUrl}product/${id}`);
      if (res.status === 200) {
        const { oneProductDatas } = res.data;
        console.log("data", oneProductDatas);
        setOneProduct(oneProductDatas);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("id", id);

  useEffect(() => {
    getCurrentProduct();
  }, []);

  // const createSavedTasks = async () => {
  //   try {
  //     const response = await axios.post(`${apiUrl}save/employee/task`, {
  //       user_id: user?._id,
  //       product_id: id,
  //     });

  //     if (response.status === 200) {
  //       console.log("success");
  //       toast.success("Successfully added to cart");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     toast.error("Failed to add to cart");
  //   }
  // };

  // useEffect(() => {
  //   if (id) {
  //     getCurrentProduct();
  //   }
  // }, [id, getCurrentProduct]);

  return (
    <>
      <div className="w-full h-full bg-gray-100 flex flex-col items-center ">
        <div className="p-16 flex flex-col items-center gap-5 ">
          <div className="flex gap-[50px]">
            <div
              className="w-[300px] h-[300px] rounded-xl border border-green-900 bg-gray-300"
              style={{
                backgroundImage: `url('${oneProduct?.images}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>

            <div className="border border-green-900 rounded-xl p-5 bg-white">
              <h1 className="text-green-900 text-2xl font-bold">Тайлбар:</h1>

              <p className="text-green-800 w-[700px]">
                Төрөл: {oneProduct?.description}
              </p>
              <p className="text-green-800 w-[700px]">
                Бүтээгдэхүүний нэр: {oneProduct?.productName}
              </p>
              <p className="text-green-800 w-[700px]">
                Хийгдэх тоо ширхэг: {oneProduct?.quantity}
              </p>
              <p className="text-green-800 w-[700px]">
                {/* Хугацаа:{createdAt} */}
              </p>
              <p className="text-green-800 w-[700px]">Төлөв: </p>
            </div>
          </div>
          {oneProduct?.components.map(({ categoryName, procedures }) => (
            <div className="bg-white p-5 rounded-lg border border-green-900">
              <Accordion type="single" collapsible className=" w-[900px]">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-green-900">
                    <p>{categoryName}</p>
                    <p></p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ProductDetailModal totalTasks={procedures} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
