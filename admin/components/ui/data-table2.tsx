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
import { Category, IUser, Products, products } from '@/constants/data';
import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';
import { toast } from './use-toast';

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
  const [progress, setProgress] = React.useState(13);
  const [chartDatas, setChartData] = React.useState<number[]>([20, 10, 30, 40]);
  const [value, setValue] = React.useState('');
  const [productData, setProductData] = React.useState<Products[]>([]);

  const chartData = [
    { browser: 'pending', visitors: 5, fill: 'var(--color-chrome)' },
    { browser: 'inprogress', visitors: 50, fill: 'var(--color-safari)' },
    { browser: 'done', visitors: 15, fill: 'var(--color-firefox)' },
    { browser: 'review', visitors: 10, fill: 'var(--color-edge)' }
  ];
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}pro/product`);
      if (res.status === 200) {
        const { products } = res.data;
        setProductData(products);
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

  const getValue = () => {
    const status = productData.map(({ procedures }) =>
      procedures.map((data) => data.status)
    );
    console.log('status', status);
    return status;
  };

  React.useEffect(() => {
    getAllProduct();
  }, []);

  // console.log('product data', productData.components);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      {productData.map(({ productName, components, createdAt }) => (
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
                <div className="text-xl font-semibold">performence: 15%</div>
                <div>pending: (5/{value})</div>
                <div>inprogress: (50/{value})</div>
                <div>done: (15/{value})</div>
                <div>review: (10/{value})</div>
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
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
