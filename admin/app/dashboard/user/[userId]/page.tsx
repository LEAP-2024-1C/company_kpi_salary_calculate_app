import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

const breadcrumbItems = [
  { title: 'Хяналтын хуудас', link: '/dashboard' },
  { title: 'Хэрэглэгч', link: '/dashboard/user' },
  { title: 'Үүсгэх', link: '/dashboard/user/create' }
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeForm
          categories={[
            { _id: '1', name: 'оёдолчин' },
            { _id: '2', name: 'эсгүүрчин' },
            { _id: '3', name: 'гар ажилгаа' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
