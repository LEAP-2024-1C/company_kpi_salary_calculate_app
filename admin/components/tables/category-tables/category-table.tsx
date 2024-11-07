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
import { EventHandler, useState } from 'react';

interface DataTableProps {
  data: Category[];
  searchKey: string;
}
type UpdateForm = {
  taskName: string;
  unit: number;
  unitPrice: number;
};

export function CategoryTable({ data, searchKey }: DataTableProps) {
  const [loading, setLoading] = useState(true);
  const [taskName, setTaskName] = useState();
  const [form, setForm] = useState<UpdateForm>();
  const [cellconfirm, setCellconfirm] = useState(true);

  const handleInput = () => {
    setCellconfirm(false);
    setLoading(false);
  };

  const handleSaveChanges = () => {
    setCellconfirm(true);
    setLoading(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) {
      return form;
    }
    console.log('form', form);

    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log('form', form);
  };
  console.log('form', form);

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(85vh-220px)] rounded-md border">
        <div className="flex flex-col gap-4">
          {data.map((product) => (
            <div key={product._id} className="flex flex-col gap-4">
              <div className="flex justify-between pr-7">
                <h1 className="pl-2 text-left text-xl font-semibold">
                  {product.categoryName}
                </h1>
                <Button className="">+</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 font-semibold">
                      Дамжлага
                    </TableHead>
                    <TableHead className="font-semibold">Нэгж</TableHead>
                    <TableHead className="font-semibold">Нэгжийн Үнэ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.procedures.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell className="w-[800px]">
                        <Input
                          name="taskName"
                          onChange={handleChange}
                          type="text"
                          defaultValue={task.taskName}
                          disabled={loading}
                        />
                      </TableCell>
                      <TableCell className="w-10">
                        <Input
                          name="quantity"
                          onChange={handleChange}
                          type="number"
                          defaultValue={task.quantity}
                          disabled={loading}
                          className="text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </TableCell>
                      <TableCell className="w-10">
                        <div className="flex">
                          <Input
                            name="unitPrice"
                            onChange={handleChange}
                            type="number"
                            defaultValue={task.unitPrice}
                            disabled={loading}
                            className="text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          ₮
                        </div>
                      </TableCell>
                      <TableCell className="w-10">
                        {cellconfirm ? (
                          <CellAction
                            t_id={task._id}
                            c_id={product._id}
                            setCellconfirm={setCellconfirm}
                            handleInput={handleInput}
                          />
                        ) : (
                          <Button onClick={handleSaveChanges}>Save</Button>
                        )}
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
