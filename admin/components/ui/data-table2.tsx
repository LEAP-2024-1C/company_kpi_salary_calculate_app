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
import axios from 'axios';
import { apiUrl } from '@/lib/utils';
import { toast } from './use-toast';
import { useEffect, useState } from 'react';
import { IUser } from '@/constants/data';
import * as React from 'react';

interface DataTableProps {
  searchKey: string;
  data: IUser[];
}

export function DataTable2({ searchKey, data }: DataTableProps) {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
        <Table className="relative">
          <TableBody>
            {data?.map((projectData) => (
              <TableRow key={projectData.id}>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
