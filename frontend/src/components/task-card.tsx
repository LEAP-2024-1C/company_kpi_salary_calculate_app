import Link from "next/link";
import React from "react";
import { useProducts } from "@/context/product-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StatusIndicator from "./status";

const TaskTracker = () => {
  const getColor = () => {
    const status = 1 / 5;

    if (status === 0) return "green";
    // if (status >= 0.5) return "blue";
    return "blue";
  };

  const { productStat } = useProducts();
  console.log("productStat", productStat);
  return (
    <>
      {productStat?.map(({ productName, components, image, _id }, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-xl p-5 flex flex-col border text-green-900 gap-3"
          style={{ borderColor: getColor() }}
        >
          <Link href={"/" + _id}>
            <h1 className="text-3xl font-bold text-center">{productName}</h1>
          </Link>
          <div className="flex gap-5 ">
            <Link href={"/" + _id}>
              <div
                className="w-[200px] h-[200px] rounded-xl border-2 border-cyan-700"
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="">
                  <p>Ажилбарын тоо: {components.length}</p>
                </AccordionTrigger>
                <AccordionContent>
                  <Link href={"/" + _id}>
                    <div className="flex flex-col bg-white rounded-xl p-2">
                      {components.map(
                        ({ categoryName, cat_id, total, other }) => (
                          <ul key={cat_id}>
                            <li className="flex items-center gap-3">
                              <div>{categoryName}</div>
                              <p>
                                ({other}/ {total})
                              </p>
                            </li>
                          </ul>
                        )
                      )}
                    </div>{" "}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full flex ">
            {/* <StatusIndicator status="pending" /> */}
            {/* <p className="text-blue-500 justify-self-end">Төлөв: {status}</p> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskTracker;
