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
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';

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
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
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
              { productName, components, createdAt, total, product_id },
              idx
            ) => (
              <Card key={idx}>
                <div className="flex flex-col gap-2 pl-4 pt-3">
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
                      <div>
                        хүлээгдэж байна : ({components.pending}/{total})
                      </div>
                      <div>
                        хийгдэж байна: ({components.progress}/{total})
                      </div>
                      <div>
                        хянах: ({components.review}/{total})
                      </div>
                      <div>
                        бүрэн дууссан: ({components.done}/{total})
                      </div>

                      <Link href={`/dashboard/employee-task/${product_id}`}>
                        employees
                      </Link>
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
