'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { useProducts } from '@/context/admin-context';
import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  id: string;
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setRefresh, refresh } = useProducts();
  const router = useRouter();

  const deleteUser = async (u_id: string) => {
    try {
      setLoading(true);
      console.log('uid', u_id);
      const response = await axios.delete(`${apiUrl}auth/create/employee`, {
        data: { u_id }
      });

      if (response.status === 200) {
        console.log('Success: Product deleted');
        toast({ title: 'Product deleted successfully' });
        router.refresh();
      }
    } catch (error: any) {
      console.error('Error deleting product:', error.response || error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.response
          ? error.response.data.message
          : 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onConfirmDelete = async () => {
    await deleteUser(id);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
