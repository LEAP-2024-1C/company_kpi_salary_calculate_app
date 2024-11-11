'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import * as z from 'zod';
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
import { Dispatch, SetStateAction, useState } from 'react';

interface CellActionProps {
  t_id: string;
  c_id: string;
  setCellconfirm: Dispatch<SetStateAction<boolean>>;
  handleInput: () => void;
  data: any[]; // Assuming this prop contains the product's procedure data
}

const formSchema = z.object({
  procedures: z.array(
    z.object({
      taskName: z
        .string()
        .min(3, { message: 'Task Name must be at least 3 characters' }),
      quantity: z.coerce.number(),
      unitPrice: z.coerce.number()
    })
  )
});

type ProductFormValues = z.infer<typeof formSchema>;

export const CellAction: React.FC<CellActionProps> = ({
  c_id,
  t_id,
  setCellconfirm,
  handleInput,
  data
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setRefresh, refresh } = useProducts();
  const [editedData, setEditedData] = useState(data);

  const handleEdit = (rowIndex: number, field: string, value: any) => {
    const updatedData = [...editedData];
    updatedData[rowIndex][field] = value;
    setEditedData(updatedData);
  };

  const updateProcedure = async (updatedData: ProductFormValues) => {
    try {
      setLoading(true);
      const response = await axios.put(`${apiUrl}cat/category`, {
        c_id: c_id,
        t_id: t_id,
        ...updatedData // Spread the updated data into the request body
      });

      if (response.status === 200) {
        router.refresh();
        console.log('Success: Category updated');
        toast({ title: 'Updated successfully' });
        router.push(`/dashboard/category`);
      }
    } catch (error) {
      console.error('Error updating category:', error); // Log the error for debugging
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProcedure = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${apiUrl}cat/procedure`, {
        data: { c_id, t_id } // Assuming c_id and t_id are in scope
      });

      if (response.status === 200) {
        router.refresh();
        console.log('Success: Category deleted');
        toast({ title: 'Deleted successfully' });
        router.push(`/dashboard/category`);
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error('Error deleting category:', error); // Log the error for debugging
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = () => {
    // Call the updateProcedure with edited data
    updateProcedure({ procedures: editedData });
    setCellconfirm(false); // Close the confirmation state
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onConfirm}
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
          <DropdownMenuItem onClick={handleInput}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteProcedure}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
