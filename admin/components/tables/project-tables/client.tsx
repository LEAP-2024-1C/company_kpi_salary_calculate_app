'use client';
import { Button } from '@/components/ui/button';
import { DataTable2 } from '@/components/ui/data-table2';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { IUser, User } from '@/constants/data';
import { da } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductsClientProps {
  data: IUser[];
}

export const ProjectClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Projects (${data?.length ?? 0})`}
          description="Manage projects (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable2 data={data} searchKey="project" />
    </>
  );
};
