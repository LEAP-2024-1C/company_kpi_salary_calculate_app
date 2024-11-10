'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import PageContainer from '@/components/layout/page-container';
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
  return (
    <ScrollArea className="h-[calc(100vh-60px)]">
      <div className="ml-7 mt-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
