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
import axios from "axios";
import { apiUrl } from "@/lib/utils";
import { IProduct } from "@/utils/interfaces";
import ProductDetailModal from "@/components/productDetailModal";

const TaskDetail = () => {
  const { refresh } = useUser();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  const getCurrentProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/${id}`);
      if (res.status === 200) {
        const { oneProductDatas } = res.data;
        console.log("data", oneProductDatas);
        setCurrentProduct(oneProductDatas);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setPro = (pId: number, catId: number, type: "add" | "sub") => {
    setCurrentProduct((pre) => {
      if (!pre) {
        return pre;
      }
      const nP = { ...pre };
      if (type === "add") {
        if (nP.components[pId].procedures[catId].status.pending < 1) {
          return nP;
        }
        nP.components[pId].procedures[catId].status.pending -= 1;
        nP.components[pId].procedures[catId].status.progress += 1;
        nP.components[pId].procedures[catId].status.assign += 1;
        return nP;
      } else {
        if (nP.components[pId].procedures[catId].status.assign < 1) {
          return nP;
        }
        nP.components[pId].procedures[catId].status.pending += 1;
        nP.components[pId].procedures[catId].status.progress -= 1;
        nP.components[pId].procedures[catId].status.assign -= 1;
        return nP;
      }
    });
  };

  useEffect(() => {
    getCurrentProduct();
  }, [id, refresh]);

  return (
    <>
      <div className="w-full h-full bg-gray-100 flex flex-col items-center ">
        <div className="p-16 flex flex-col items-center gap-5 ">
          <div className="flex gap-[50px]">
            <div
              className="w-[300px] h-[300px] rounded-xl border border-green-900 bg-gray-300"
              style={{
                backgroundImage: `url('${currentProduct?.images}')`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>

            <div className="border border-green-900 rounded-xl p-5 bg-white">
              <h1 className="text-green-900 text-2xl font-bold">Тайлбар:</h1>

              <p className="text-green-800 w-[700px]">
                Төрөл: {currentProduct?.description}
              </p>
              <p className="text-green-800 w-[700px]">
                Бүтээгдэхүүний нэр: {currentProduct?.productName}
              </p>
              <p className="text-green-800 w-[700px]">
                Хийгдэх тоо ширхэг: {currentProduct?.quantity}
              </p>
              <p className="text-green-800 w-[700px]">
                {/* Хугацаа:{createdAt} */}
              </p>
              <p className="text-green-800 w-[700px]">Төлөв: </p>
            </div>
          </div>
          {currentProduct?.components.map(
            ({ categoryName, procedures, _id }, idx) => (
              <div
                className="bg-white p-5 rounded-lg border border-green-900"
                key={idx}
              >
                <Accordion type="single" collapsible className=" w-[1200px]">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-green-900">
                      <p>{categoryName}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ProductDetailModal
                        totalTasks={procedures}
                        productName={currentProduct.productName}
                        product_id={currentProduct._id}
                        quantity={currentProduct.quantity}
                        cat_idx={idx}
                        cat_id={_id}
                        categoryName={categoryName}
                        setPro={setPro}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
