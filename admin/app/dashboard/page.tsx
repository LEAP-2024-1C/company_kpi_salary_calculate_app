'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import { ProjectClient } from '@/components/tables/project-tables/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { IUser } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'project', link: '/dashboard/project' }
];

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <ProjectClient />
        </div>
      </div>
    </PageContainer>
  );
}
