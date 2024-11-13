'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CategoryTable } from '@/components/tables/category-tables/category-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/constants/data';
import { useProducts } from '@/context/admin-context';
import { apiUrl, cn } from '@/lib/utils';
import axios from 'axios';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Хяналтын хуудас', link: '/dashboard' },
  { title: 'Ангилал', link: '/dashboard/category' }
];

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  const { refresh } = useProducts();

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}cat/get/category`);
      if (res.status === 200) {
        const { categories } = res.data;

        console.log('categories', categories);
        setCategories(categories);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, [refresh]);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Ангилал (${categories?.length})`}
            description="Ангилал үүсгэх (Сервер талын функц.)"
          />

          <Link
            href={'/dashboard/category/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Шинэ ангилал үүсгэх
          </Link>
        </div>
        <Separator />

        <CategoryTable searchKey="Ангилал" data={categories} />
      </div>
    </PageContainer>
  );
}
