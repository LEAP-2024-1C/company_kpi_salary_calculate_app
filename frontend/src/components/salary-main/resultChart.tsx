// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { useCart } from "@/context/cart-provider";

// export function ResultChart() {
//   const { cartData, calculateProductTotal } = useCart();

//   const colorList = [
//     "hsl(var(--chart-1))",
//     "hsl(var(--chart-2))",
//     "hsl(var(--chart-3))",
//     "hsl(var(--chart-4))",
//     "hsl(var(--chart-5))",
//   ];

//   const salaryData = React.useMemo(() => {
//     return (
//       cartData?.products.map((product, index) => ({
//         name: product.productName,
//         total: calculateProductTotal(product),
//         fill: colorList[index % colorList.length],
//       })) || []
//     );
//   }, [cartData, calculateProductTotal]);

//   const totalSalary = salaryData.reduce((acc, curr) => acc + curr.total, 0);

//   const chartConfig: ChartConfig = {
//     salary: {
//       label: "Salary",
//     },
//   };

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Энэ сарын гүйцэтгэл</CardTitle>
//         <CardDescription>{}</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={salaryData}
//               dataKey="total"
//               nameKey="name"
//               innerRadius={60}
//               strokeWidth={5}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalSalary.toLocaleString()} ₮
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Ажлын тоо
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         {/* <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div> */}
//         <div className="leading-none text-muted-foreground">
//           Хийсэн ажлын гүйцэтгэл
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import React from "react";
import { Pie, PieChart, Tooltip, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/cart-provider";

// Define a color palette
const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ResultChart() {
  const { cartData, calculateProductTotal } = useCart();

  const assignedData = React.useMemo(() => {
    return (
      cartData?.products.flatMap((product) =>
        product.components.flatMap((component) =>
          component.procedures.map((task) => ({
            name: task.taskName,
            assignAmount: task.status.assign,
          }))
        )
      ) || []
    );
  }, [cartData]);

  const totalAssigned = assignedData.reduce(
    (acc, task) => acc + task.assignAmount,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Энэ сарын гүйцэтгэл</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChart width={400} height={400}>
          <Pie
            data={assignedData}
            dataKey="assignAmount"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
          >
            {assignedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorPalette[index % colorPalette.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
    </Card>
  );
}
