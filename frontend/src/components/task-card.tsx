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
  // const getColor = () => {
  //   const status = 1 / 5;

  //   if (status === 1) return "green";
  //   if (status >= 0.5) return "orange";
  //   return "red";
  // };

  const { productStat } = useProducts();
  console.log("productStat", productStat);
  return (
    <>
      {productStat?.map(({ productName, components, image, _id }, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-xl p-5 flex flex-col border text-green-900"
          // style={{ borderColor: getColor() }}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="">
                <Link href={"/" + _id}>
                  <div
                    className="w-[100px] h-[100px] rounded-xl"
                    style={{
                      backgroundImage: `url('${image}')`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </Link>

                <Link href={"/" + _id}>
                  <h1 className="text-3xl font-bold ">
                    {productName}({components.length})
                  </h1>
                </Link>
              </AccordionTrigger>
              <AccordionContent>
                <Link href={"/" + _id}>
                  {components.map(({ categoryName, cat_id, total, other }) => (
                    <ul key={cat_id}>
                      <li className="flex items-center gap-3">
                        <div>{categoryName}</div>
                        <p>
                          ({other}/ {total})
                        </p>
                      </li>
                    </ul>
                  ))}
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="w-full flex ">
            <StatusIndicator status="pending" />
            {/* <p className="text-blue-500 justify-self-end">Төлөв: {status}</p> */}
          </div>
        </div>
      ))}
                  <Link href={"/" + _id}>
                    <h1 className="text-3xl font-bold ">
                      {productName}({components.length})
                    </h1>
                  </Link>
                </AccordionTrigger>
                <AccordionContent>
                  <Link href={"/" + _id}>
                    {components.map(
                      ({ categoryName, cat_id, total, other }) => (
                        <ul key={cat_id}>
                          <li className="flex items-center gap-3">
                            <div>{categoryName}</div>
                            <p>{/* ({other}/ {total}) */}</p>
                          </li>
                        </ul>
                      )
                    )}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full flex ">
              {/* <StatusIndicator status="pending" /> */}
              {/* <p className="text-blue-500 justify-self-end">Төлөв: {status}</p> */}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TaskTracker;
