'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { IUser } from '@/constants/data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductsClientProps {
  data: IUser[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Хэрэглэгчид (${data?.length ?? 0})`}
          description="Хэрэглэгчидийг хянах, шийдвэрлэх. (Хэрэглэгч талын функцын өөрчлөлт оруулах.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Шинэ хэрэглэгч үүсгэх
        </Button>
      </div>
      <Separator />
      <DataTable data={data} searchKey="name" />
    </>
  );
};
