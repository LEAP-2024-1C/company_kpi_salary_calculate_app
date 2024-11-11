'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { CategoryUpdateForm } from '@/components/forms/category-update-form';

import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' },
  { title: 'Create', link: '/dashboard/category/create' }
];
// const [initialData, setInitialData] = useState(null);

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryUpdateForm initialData={null} key={null} />
      </div>
    </ScrollArea>
  );
}
