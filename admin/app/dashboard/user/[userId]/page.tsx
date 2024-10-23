import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import { ProductForm } from '@/components/forms/product-form';
import PageContainer from '@/components/layout/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeForm
          categories={[
            { _id: '1', name: 'esguurchin' },
            { _id: '2', name: 'oydolchin' },
            { _id: '3', name: 'gar ajilgaanii ajiltan' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
