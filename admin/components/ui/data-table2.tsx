'use client';

import { Pie, PieChart } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import { Input } from './input';
import { IProductStat } from '@/constants/data';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from './button';

interface DataTableProps {
  searchKey: string;
  data: IProductStat[];
}

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))'
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))'
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))'
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))'
  }
} satisfies ChartConfig;

export function DataTable2({ searchKey, data }: DataTableProps) {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  return (
    <>
      <Input
        placeholder={`${searchKey} хайх...`}
        className="w-full md:max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-6">
        {data
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.productName.toLowerCase().includes(search);
          })
          .map(
            (
              {
                productName,
                components,
                createdAt,
                total,
                product_id,
                description
              },
              idx
            ) => (
              <Card key={idx}>
                <div className="flex flex-col gap-2 py-3 pl-4">
                  <div className="flex items-center justify-between gap-10">
                    <p className="text-2xl font-semibold">
                      Бүтээгдэхүүний нэр: {productName}
                    </p>
                    <p className="pr-4 text-gray-500">
                      {format(new Date(createdAt), 'yyyy:MM:dd')}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col justify-center gap-2">
                      {/* <div className="text-xl font-semibold">performence: 15%</div> */}
                      <h1 className="text-xl">({description})</h1>
                      <div className="flex items-center gap-2">
                        <div>
                          хүлээгдэж байна : ({components.pending}/{total})
                        </div>
                        <div className="h-3 w-3 bg-[#E76E50]"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        хийгдэж байна: ({components.progress}/{total})
                        <div className="h-3 w-3 bg-[#2A9C90]"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        хянах: ({components.review}/{total})
                        <div className="h-3 w-3 bg-[#E9C469]"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        бүрэн дууссан: ({components.done}/{total})
                        <div className="h-3 w-3 bg-[#264853]"></div>
                      </div>

                      {/* <div className="border-b-2 border-black"> */}
                      <Button
                        className="font-semibold"
                        variant="outline"
                        onClick={() =>
                          router.push(`/dashboard/employee-task/${product_id}`)
                        }
                      >
                        Ажилчидийн гүйцэтгэлийг харах
                      </Button>
                      {/* </div> */}
                    </div>

                    <CardContent className="flex-1 pb-0">
                      <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[200px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={[
                              {
                                browser: 'pending',
                                visitors: components.pending,
                                fill: 'var(--color-chrome)'
                              },
                              {
                                browser: 'inprogress',
                                visitors: components.progress,
                                fill: 'var(--color-safari)'
                              },
                              {
                                browser: 'done',
                                visitors: components.done,
                                fill: 'var(--color-firefox)'
                              },
                              {
                                browser: 'review',
                                visitors: components.review,
                                fill: 'var(--color-edge)'
                              }
                            ]}
                            dataKey="visitors"
                            nameKey="browser"
                          />
                        </PieChart>
                      </ChartContainer>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )
          )}
      </div>
    </>
  );
}
