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

interface DataTableProps {
  searchKey: string;
  data: IUser[];
}

const chartData = [
  { browser: 'pending', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'inprogress', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'done', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'review', visitors: 173, fill: 'var(--color-edge)' }
];
const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
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
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function DataTable2({ searchKey, data }: DataTableProps) {
  const [progress, setProgress] = React.useState(13);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <Card className="w-auto">
        <div className="flex flex-col gap-2 pl-4 pt-3">
          <div className="flex items-center gap-10">
            <p className="text-2xl font-semibold">project name: SHIRT</p>
            {/* <p className="flex items-end">2020:09:23</p> */}
          </div>
          <div className="flex">
            <div className="flex flex-col gap-2">
              <div>performence: 15%</div>
              <div>inprogress:15%</div>
              <div>done: 15%</div>
              <div>review: 15%</div>
              <div>employee: 15%</div>
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
