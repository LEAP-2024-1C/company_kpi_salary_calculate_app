'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ProjectClient } from '@/components/tables/project-tables/client';

const breadcrumbItems = [
  { title: 'Хяналтын', link: '/dashboard' },
  { title: 'Захиалгат ажил', link: '/dashboard/project' }
];

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-8">
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ProjectClient />
        </div>
      </div>
    </PageContainer>
  );
}
