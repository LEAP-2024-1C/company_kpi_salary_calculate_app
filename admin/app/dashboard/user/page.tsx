'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import { toast } from '@/components/ui/use-toast';
import { IUser } from '@/constants/data';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
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
export default function Page() {
  const [employeeData, setEmployeeData] = useState<IUser[]>([]);
  const getEmployee = async () => {
    try {
      const res = await axios.get(`${apiUrl}auth/get/employee`);

      if (res.status === 200) {
        const { employees } = res.data;
        console.log('employee', employees);
        setEmployeeData(employees);
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
    getEmployee();
  }, []);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={employeeData} />
      </div>
    </PageContainer>
  );
}
