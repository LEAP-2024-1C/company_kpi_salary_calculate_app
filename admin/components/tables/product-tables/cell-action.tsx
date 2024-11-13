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
  id: string; // ID of the product to delete or update
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Modal state
  const { setRefresh, refresh } = useProducts(); // For refreshing the data
  const router = useRouter();

  // Delete product handler
  const deleteProduct = async (p_id: string) => {
    try {
      setLoading(true);

      // Sending the ID in the request body as a part of an object
      const response = await axios.delete(`${apiUrl}pro/product`, {
        data: { p_id } // Properly wrap `p_id` in an object
      });

      if (response.status === 200) {
        // If deletion is successful
        console.log('Success: Product deleted');
        toast({ title: 'Product deleted successfully' });
        router.refresh(); // Refresh the page (or any state as necessary)
      }
    } catch (error: any) {
      // Handling errors
      console.error('Error deleting product:', error.response || error); // Log error for debugging
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

  // Function to handle the confirmation of the delete
  const onConfirmDelete = async () => {
    await deleteProduct(id); // Pass the `id` of the product to the delete function
    setOpen(false); // Close the modal after deletion
    setRefresh((prev) => !prev); // Refresh the data if needed
  };

  return (
    <>
      {/* Alert Modal for delete confirmation */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirmDelete} // Confirm handler for the delete
        loading={loading}
      />

      {/* Dropdown Menu */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* Update action */}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/product/${id}`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          {/* Delete action: Open confirmation modal */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
