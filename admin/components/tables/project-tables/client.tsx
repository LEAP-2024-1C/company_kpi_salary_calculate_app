'use client';

import { DataTable2 } from '@/components/ui/data-table2';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { IProductStat } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';

import { useEffect, useState } from 'react';

export const ProjectClient = () => {
  const [productData, setProductData] = useState<IProductStat[]>([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/stat`);
      if (res.status === 200) {
        const { productStat } = res.data;
        setProductData(productStat);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'There was a problem with your request.'
      });
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Захиалгат ажил (${productData?.length ?? 0})`}
          description="Захиалгат ажлын хэсэг."
        />
      </div>
      <Separator />
      <DataTable2 data={productData} searchKey="Захиалгат ажил" />
    </>
  );
};
