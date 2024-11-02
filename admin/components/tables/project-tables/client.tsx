'use client';
import { Button } from '@/components/ui/button';
import { DataTable2 } from '@/components/ui/data-table2';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { IProductStat, IUser } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { da } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductsClientProps {
  data: IUser[];
}

export const ProjectClient: React.FC<ProductsClientProps> = ({ data }) => {
  const [productData, setProductData] = useState<IProductStat[]>([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}product/stat`);
      if (res.status === 200) {
        const { productStat } = res.data;
        setProductData(productStat);

        console.log('product stat', productStat);
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

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Projects (${productData?.length ?? 0})`}
          description="Manage projects (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable2 data={productData} searchKey="project" />
    </>
  );
};
