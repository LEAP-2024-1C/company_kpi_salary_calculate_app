'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
import { CellAction } from '../tables/user-tables/cell-action';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { IUser } from '@/constants/data';
import { useState } from 'react';

interface DataTableProps {
  searchKey: string;
  data: IUser[];
}

export function DataTable({ searchKey, data }: DataTableProps) {
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <Input
        placeholder={`${searchKey} хайх...`}
        className="w-full md:max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>Овог</TableHead>
              <TableHead>Нэр</TableHead>
              <TableHead>И-Мэйл</TableHead>
              <TableHead>Утасны дугаар</TableHead>
              <TableHead>Тушаал</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              ?.filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.firstName.toLowerCase().includes(search);
              })
              .map((employeeData) => (
                <TableRow key={employeeData._id}>
                  <TableCell>{employeeData.lastName}</TableCell>
                  <TableCell>{employeeData.firstName}</TableCell>
                  <TableCell>{employeeData.email}</TableCell>
                  <TableCell>{employeeData.phoneNumber}</TableCell>
                  <TableCell>{employeeData.job_title}</TableCell>
                  <TableCell>
                    <CellAction id={employeeData._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
