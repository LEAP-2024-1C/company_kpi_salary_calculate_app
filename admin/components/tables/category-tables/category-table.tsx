'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Category } from '@/constants/data';
import { CellAction } from './cell-action';

interface DataTableProps {
  data: Category[];
  searchKey: string;
}

export function CategoryTable({ data, searchKey }: DataTableProps) {
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <div className="flex flex-col gap-8">
          {data.map((product) => (
            <div className="flex flex-col gap-4">
              <h1 className="pl-4 text-left text-2xl font-semibold">
                {product.categoryName}
              </h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Task Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.procedures.map((task) => (
                    <TableRow key={product.id}>
                      <TableCell className="w-[200px]">
                        {task.taskName}
                      </TableCell>
                      <TableCell>{task.unit}</TableCell>
                      <TableCell>{task.unitPrice}$</TableCell>
                      <TableCell className="text-right">
                        {task.status}
                      </TableCell>

                      <TableCell>
                        <CellAction id={product.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
