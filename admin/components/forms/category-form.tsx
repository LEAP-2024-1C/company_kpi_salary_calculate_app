'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';
import CategoryInput from '../inputs/category-inputs';

const formSchema = z.object({
  categoryName: z
    .string()
    .min(3, { message: 'Category Name must be at least 3 characters' }),
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
  categories: any;
}

export const CategoryForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState<string>('');
  const title = initialData ? 'Edit product' : 'Create category';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = {
    categoryName: '',
    procedures: [{ taskName: '', quantity: 1, unitPrice: 100 }]
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'procedures'
  });

  const createCategory = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}cat/create/category`, { data });
      if (res.status === 200) {
        router.refresh();
        console.log('success');
        // router.push(`/dashboard/products`);
        toast({ title: toastMessage });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const addUnit = (id: string) => {
    console.log('IN', id);
    const findIndex = fields.findIndex((f) => f.id === id);
    const findPro = fields.find((f) => f.id === id);
    update(findIndex, { ...findPro!, quantity: findPro?.quantity! + 1 });
  };
  const subtractUnit = (id: string) => {
    const findIndex = fields.findIndex((f) => f.id === id);
    const findPro = fields.find((f) => f.id === id);
    update(findIndex, { ...findPro!, quantity: findPro?.quantity! - 1 });
  };
  const addUnitPrice = (id: string) => {
    const findIndex = fields.findIndex((f) => f.id === id);
    const findPro = fields.find((f) => f.id === id);
    update(findIndex, { ...findPro!, unitPrice: findPro?.unitPrice! + 50 });
  };
  const subtractUnitPrice = (id: string) => {
    const findIndex = fields.findIndex((f) => f.id === id);
    const findPro = fields.find((f) => f.id === id);
    console.log('FP', findPro);
    update(findIndex, {
      ...findPro!,
      taskName: taskName,
      unitPrice: findPro?.unitPrice! - 50
    });
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
    createCategory(data);
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
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            {fields.map((pro, index) => {
              // console.log(pro);
              return (
                <CategoryInput
                  key={pro.id}
                  pro={pro}
                  form={form}
                  index={index}
                  loading={loading}
                  taskName={taskName}
                  setTaskName={setTaskName}
                  addUnit={addUnit}
                  addUnitPrice={addUnitPrice}
                  subtractUnit={subtractUnit}
                  subtractUnitPrice={subtractUnitPrice}
                  remove={remove}
                />
              );
            })}
            <div>
              <Button
                type="button"
                onClick={() =>
                  append({ taskName: '', quantity: 1, unitPrice: 100 })
                }
              >
                Add
              </Button>
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
