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
import { IUser } from '@/constants/data';
import * as React from 'react';
import Link from 'next/link';

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
  const [chartNUmber, setChartNumber] = React.useState(1);
  const [chartDatas, setChartData] = React.useState<number[]>([20, 10, 30, 40]);
  const chartData = [
    { browser: 'pending', visitors: chartNUmber, fill: 'var(--color-chrome)' },
    { browser: 'inprogress', visitors: 50, fill: 'var(--color-safari)' },
    { browser: 'done', visitors: 15, fill: 'var(--color-firefox)' },
    { browser: 'review', visitors: 10, fill: 'var(--color-edge)' }
  ];
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <Card className="w-2/5">
        <div className="flex flex-col gap-2 pl-4 pt-3">
          <div className="flex items-center justify-between gap-10">
            <p className="text-2xl font-semibold">project name: SHIRT</p>
            <p className="pr-4 text-gray-500">2020:09:23</p>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center gap-2">
              <div className="text-xl font-semibold">performence: 15%</div>
              <div>pending: (6/80)</div>
              <div>inprogress: (50/80)</div>
              <div>done: (15/80)</div>
              <div>review: (10/80)</div>
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
                  <Pie data={chartData} dataKey="visitors" nameKey="browser" />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
}
