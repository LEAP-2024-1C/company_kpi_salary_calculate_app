'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/context/admin-context';
import { apiUrl, cn } from '@/lib/utils';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Хяналтын хуудас', link: '/dashboard' },
  { title: 'Бүтээгдэхүүн', link: '/dashboard/product' }
];

export default function Page() {
  const [productsData, setProductsData] = useState<[]>([]);
  const { refresh } = useProducts();

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${apiUrl}pro/product`);
      if (res.status === 200) {
        const { products } = res.data;
        setProductsData(products);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductsData();
  }, [refresh]);

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Бүтээгдэхүүн (${productsData.length})`}
            description="Бүтээгдэхүүн засварлах болон үүсгэх (Сервер талын функцууд.)"
          />

          <Link
            href={'/dashboard/product/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Шинэ бүтээгдэхүүн үүсгэх
          </Link>
        </div>
        <Separator />

        <ProductTable searchKey="Бүтээгдэхүүн" productsData={productsData} />
      </div>
    </PageContainer>
  );
}
