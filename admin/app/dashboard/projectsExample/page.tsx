'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ProjectClient } from '@/components/tables/project-tables/client';
import { UserClient } from '@/components/tables/user-tables/client';
import { toast } from '@/components/ui/use-toast';
import { IUser, users } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'project', link: '/dashboard/project' }
];
export type User = {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: number;
  job_title: string;
  verified: boolean;
  status: string;
};
export default function page() {
  const [projectData, setProjectData] = useState<IUser[]>([]);
  const getProject = async () => {
    try {
      const res = await axios.get(`${apiUrl}auth/get/project`);

      if (res.status === 200) {
        const { project } = res.data;
        console.log('employee', project);
        setProjectData(project);
        toast({ title: 'successfully get employee' });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <ProjectClient data={projectData} />
      </div>
    </PageContainer>
  );
}
