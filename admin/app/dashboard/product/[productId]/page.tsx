import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm
          categories={[
            { _id: 'pocket', name: 'pocket' },
            { _id: 'front thigh', name: 'front thigh' },
            { _id: 'connector', name: 'connector' },
            { _id: 'back and front', name: 'back and front' },
            { _id: 'front', name: 'front' },
            { _id: 'back', name: 'back' },
            { _id: 'sleeves', name: 'sleeves' },
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
