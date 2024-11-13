'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';
import { Input } from '../ui/input';

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

interface ProductFormProps {
  initialData: any | null;
}

export const CategoryUpdateForm: React.FC<ProductFormProps> = ({
  initialData
}) => {
  const query = useSearchParams();
  const params = useParams<{ categoryId: string }>();
  const t_id = query.get('t_id');
  const c_id = params.categoryId;
  console.log('dada', c_id);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit product' : 'Create category';
  const description = initialData ? 'Edit a product.' : 'Add a new category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = {
    procedures: [{ taskName: '', quantity: 1, unitPrice: 100 }]
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'procedures'
  });

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

  const onSubmit = (updatedData: ProductFormValues) => {
    console.log(updatedData);
    updateProcedure(updatedData);
  };

  const handleSub = (index: number, type: 'quantity' | 'unitPrice') => {
    if (type === 'quantity') {
      const value = Number(form.getValues(`procedures.${index}.${type}`));
      if (value > 1) {
        form.setValue(`procedures.${index}.quantity`, Number(value) - 1);
      }
    } else {
      const value = Number(form.getValues(`procedures.${index}.${type}`));
      if (value > 50) {
        form.setValue(`procedures.${index}.unitPrice`, Number(value) - 50);
      }
    }
  };
  const handleAdd = (index: number, type: 'quantity' | 'unitPrice') => {
    if (type === 'unitPrice') {
      const value = Number(form.getValues(`procedures.${index}.${type}`));
      if (value >= 50) {
        form.setValue(`procedures.${index}.unitPrice`, Number(value) + 50);
      }
    } else {
      const value = Number(form.getValues(`procedures.${index}.${type}`));
      if (value >= 0) {
        form.setValue(`procedures.${index}.quantity`, Number(value) + 1);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {fields.map((pro, index) => {
            return (
              <div key={pro.id} className="flex items-end gap-3">
                {/* start */}
                <>
                  <FormField
                    control={form.control}
                    name={`procedures.${index}.taskName`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Task Name</FormLabel>
                          <FormControl className="w-[400px]">
                            <Input
                              disabled={loading}
                              placeholder="Task Name"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`procedures.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <div className="flex gap-2">
                          <div>
                            <Button
                              className="rounded-full"
                              onClick={() => handleSub(index, 'quantity')}
                              type="button"
                            >
                              -
                            </Button>
                          </div>
                          <FormControl className="w-10 rounded-full text-center">
                            <Input
                              type="number"
                              disabled={loading}
                              placeholder="Unit"
                              {...field}
                              min={0}
                              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </FormControl>
                          <div>
                            <Button
                              className="rounded-full"
                              onClick={() => handleAdd(index, 'quantity')}
                              type="button"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`procedures.${index}.unitPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Price</FormLabel>
                        <div className="flex gap-2">
                          <div>
                            <Button
                              className="rounded-full"
                              onClick={() => handleSub(index, 'unitPrice')}
                              type="button"
                            >
                              -
                            </Button>
                          </div>
                          <FormControl className="w-20 rounded-full text-center">
                            <Input
                              type="number"
                              disabled={loading}
                              placeholder="Unit Price"
                              {...field}
                              min={0}
                              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </FormControl>
                          <div>
                            <Button
                              className="rounded-full"
                              onClick={() => handleAdd(index, 'unitPrice')}
                              type="button"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
                {/* end */}

                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            );
          })}
          <Button
            type="button"
            onClick={() => append({ taskName: '', quantity: 1, unitPrice: 50 })}
          >
            +
          </Button>

          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
