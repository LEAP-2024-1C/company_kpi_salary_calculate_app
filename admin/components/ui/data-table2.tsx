'use client';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import { Input } from './input';
import {
  Category,
  IProduct,
  IProductStat,
  IUser,
  products
} from '@/constants/data';

import Link from 'next/link';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';
import { toast } from './use-toast';
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DataTableProps {
  searchKey: string;
  data: IUser[];
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
  const [progress, setProgress] = useState(13);

  const [productData, setProductData] = useState<IProductStat[]>([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/stat`);
      if (res.status === 200) {
        const { productStat } = res.data;
        setProductData(productStat);

        console.log('product stat', productStat);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // console.log('product data', productData.components);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      {productData.map(({ productName, components, createdAt, total }) => (
        <div className="">
          <Card className="w-2/5">
            <div className="flex flex-col gap-2 pl-4 pt-3">
              <div className="flex items-center justify-between gap-10">
                <p className="text-2xl font-semibold">
                  project name: {productName}
                </p>
                <p className="pr-4 text-gray-500">{createdAt}</p>
              </div>
              <div className="flex">
                <div className="flex flex-col justify-center gap-2">
                  {/* <div className="text-xl font-semibold">performence: 15%</div> */}
                  <div>
                    pending: ({components.pending}/{total})
                  </div>
                  <div>
                    inprogress: ({components.progress}/{total})
                  </div>
                  <div>
                    done: ({components.done}/{total})
                  </div>
                  <div>
                    review: ({components.review}/{total})
                  </div>
                  <Link href={'/dashboard/employee-task'}>employees</Link>
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
        </div>
      ))}
    </>
  );
}
