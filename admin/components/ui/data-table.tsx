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

interface DataTableProps {
  searchKey: string;
}
export type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: number;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    lastName: 'Candice',
    firstName: 'Schiner',
    email: 'Schiner@gmail.com',
    phoneNumber: 88615033,
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    lastName: 'John',
    firstName: 'Doe',
    email: 'Doe@gmail.com',
    phoneNumber: 88015033,
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  }
];

const getEmployee = async () => {
  const [employeeData, setEmployeeData] = useState<User | null>(null);

  try {
    const res = await axios.get(`${apiUrl}auth/get/employee`);

    if (res.status === 200) {
      const { employee } = res.data;
      setEmployeeData(employee);
      toast({ title: 'successfully get employee' });
    }
  } catch (error) {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.'
    });
  }
  useEffect(() => {
    // getEmployee();
  }, []);
};

export function DataTable({ searchKey }: DataTableProps) {
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>Last Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((employeeData) => (
              <TableRow key={employeeData.id}>
                <TableCell>{employeeData.lastName}</TableCell>
                <TableCell>{employeeData.firstName}</TableCell>
                <TableCell>{employeeData.email}</TableCell>
                <TableCell>{employeeData.phoneNumber}</TableCell>
                <TableCell>{employeeData.role}</TableCell>
                <TableCell>{employeeData.status}</TableCell>
                <TableCell>
                  <CellAction id={employeeData.id} />
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
