'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Product } from '@/constants/data';
import { CellAction } from './cell-action';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

interface DataTableProps {
  productsData: Product[];
  searchKey: string;
}

export function ProductTable({ productsData, searchKey }: DataTableProps) {
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <Input
        placeholder={`${searchKey} хайх ...`}
        className="w-full md:max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="h-[calc(86vh-220px)] rounded-md border bg-gray-100">
        <div className="flex flex-wrap gap-4">
          {productsData
            .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.productName.toLowerCase().includes(search);
            })
            .map((product, index) => {
              return (
                <Card key={product._id} className="w-[350px]">
                  <div className="flex items-center justify-between px-4">
                    <CardHeader>
                      <CardTitle>{product.productName}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <div>
                      <CellAction id={product._id} />
                    </div>
                  </div>
                  <CardContent>
                    <form>
                      <div className="h-[400px] w-[300px]">
                        <img
                          src={product.images[0]}
                          alt="big image"
                          className="h-full w-full"
                        />
                        <div className="box-border flex">
                          {product.images.slice(1).map((image, index) => (
                            <div className="flex-1" key={index}>
                              <img
                                src={image}
                                alt={`small image ${index + 1}`}
                                className="w-[70px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="pl-10">
                    <Label>Тоо хэмжээ:{product.quantity}</Label>
                    {/* <Label>Status:{product.status}</Label> */}
                  </CardFooter>
                </Card>
              );
            })}
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
