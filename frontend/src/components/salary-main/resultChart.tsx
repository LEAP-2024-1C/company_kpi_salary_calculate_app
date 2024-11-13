"use client";

import React from "react";
import { Pie, PieChart, Tooltip, Cell, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useCart } from "@/context/cart-provider";

const colorPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ResultChart() {
  const { cartData } = useCart();

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
    <Card className="flex flex-col w-[500px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Энэ сарын гүйцэтгэл</CardTitle>
        <CardDescription>{}</CardDescription>
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
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalAssigned.toLocaleString()} ш
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Ажлын тоо
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Нийт сонгон хийсэн ажлуудын хэмжээ
        </div>
      </CardFooter>
    </Card>
  );
}
