import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import PageContainer from '@/components/layout/page-container';
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
            { _id: '1', name: 'Fabric preparation' },
            { _id: '2', name: 'Cutting' },
            { _id: '3', name: 'Quality control' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
