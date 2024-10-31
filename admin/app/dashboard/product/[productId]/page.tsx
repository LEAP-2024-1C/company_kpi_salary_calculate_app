'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Category } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];

export default function Page() {
  // const [categories, setCategories] = useState<Category[]>([]);
  // const getAllCategories = async () => {
  //   try {
  //     const res = await axios.get(`${apiUrl}cat/get/category`);
  //     if (res.status === 200) {
  //       const { categories } = res.data;
  //       console.log('categories', categories);
  //       setCategories(categories);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  return (
    <ScrollArea className="h-[calc(100vh-60px)] ">
      <div className="ml-10">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
