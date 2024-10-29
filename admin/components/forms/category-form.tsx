'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
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
import { Label } from '../ui/label';
import { setMinutes } from 'date-fns';

const formSchema = z.object({
  categoryName: z
    .string()
    .min(3, { message: 'Category Name must be at least 3 characters' }),
  procedures: z.array(
    z.object({
      taskName: z
        .string()
        .min(3, { message: 'Task Name must be at least 3 characters' }),
      unit: z.coerce.number(),
      unitPrice: z.coerce.number(),
      price: z.coerce.number()
    })
  )
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const CategoryForm: React.FC<ProductFormProps> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit product' : 'Create category';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';
  const [unit, setUnit] = useState<number[]>([0]);
  const [unitPrice, setUnitPrice] = useState<number[]>([0]);

  const defaultValues = {
    categoryName: '',
    procedures: [{ taskName: '', unit: 0, unitPrice: 0 }]
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
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

  const addUnit = (index: number) => {
    console.log(unit[index]);
    return (unit[index] += 1);
  };
  const subtractUnit = () => {
    // setUnit(unit[index] - 1);
  };
  const addUnitPrice = () => {
    // setUnitPrice(unitPrice + 50);
  };
  const subtrtactUnitPrice = () => {
    // setUnitPrice(unitPrice - 50);
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
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                {index === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name={`procedures.${index}.taskName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Task Name</FormLabel>
                          <FormControl className="w-[400px]">
                            <Input
                              disabled={loading}
                              placeholder="Task Name"
                              {...field}
                              min={0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`procedures.${index}.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <div className="flex gap-2">
                            <div>
                              <Button
                                className="rounded-full"
                                onClick={() => subtractUnit()}
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
                                value={unit[index]}
                                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </FormControl>
                            <div>
                              <Button
                                className="rounded-full"
                                onClick={() => addUnit(index)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <FormMessage />
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
                                onClick={() => subtrtactUnitPrice()}
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
                                value={unitPrice[index]}
                                className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                            </FormControl>
                            <div>
                              <Button
                                className="rounded-full"
                                onClick={() => addUnitPrice()}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name={`procedures.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl className="w-30">
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </>
                )}
                {index > 0 && (
                  <div className="flex items-end gap-3">
                    <FormField
                      control={form.control}
                      name={`procedures.${index}.taskName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="w-[400px]">
                            <Input
                              disabled={loading}
                              placeholder="Task Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`procedures.${index}.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <div>
                              <Button
                                className="rounded-full text-center"
                                onClick={subtractUnit}
                              >
                                -
                              </Button>
                            </div>
                            <FormControl className="w-10 rounded-full text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none">
                              <Input
                                type="number"
                                disabled={loading}
                                placeholder="Unit"
                                {...field}
                                min={0}
                                value={unit[index]}
                              />
                            </FormControl>
                            <div>
                              <Button
                                onClick={addUnit(index)}
                                className="rounded-full"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`procedures.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <div>
                              <Button
                                className="rounded-full"
                                onClick={subtrtactUnitPrice}
                              >
                                -
                              </Button>
                            </div>
                            <FormControl className="w-20 rounded-full text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none">
                              <Input
                                type="number"
                                disabled={loading}
                                placeholder="Unit Price"
                                {...field}
                                min={0}
                                value={unitPrice[index]}
                              />
                            </FormControl>
                            <Button
                              className="rounded-full"
                              onClick={addUnitPrice}
                            >
                              +
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <div>
              <Button
                type="button"
                onClick={() =>
                  append({ taskName: '', unit: 0, unitPrice: 0, price: 0 })
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
