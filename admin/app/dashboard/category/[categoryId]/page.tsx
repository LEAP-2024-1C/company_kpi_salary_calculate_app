import { Breadcrumbs } from '@/components/breadcrumbs';
import { CategoryForm } from '@/components/forms/category-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Category', link: '/dashboard/category' },
  { title: 'Create', link: '/dashboard/category/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <CategoryForm
          categories={[
            { _id: 'pocket', name: 'pocket' },
            { _id: 'front thigh', name: 'front thigh' },
            { _id: 'connector', name: 'connector' },
            { _id: 'back and front', name: 'back and front' },
            { _id: 'front', name: 'front' },
            { _id: 'back', name: 'back' },
            { _id: 'sleeves', name: 'sleeves' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
