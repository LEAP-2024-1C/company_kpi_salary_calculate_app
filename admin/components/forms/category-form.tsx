'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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

export const CategoryForm: React.FC<ProductFormProps> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Set dynamic titles and descriptions based on if it's an edit or create action
  const title = initialData ? 'Ангилал засварлах' : 'Ангилал үүсгэх';
  const description = initialData
    ? 'Хуучин ангилал засварлах.'
    : 'Шинэ ангилал үүсгэх';
  const toastMessage = initialData
    ? 'Ангилал амжилттай шинэчилсэн.'
    : 'Ангилал амжилттай үүсгэсэн.';
  const action = initialData ? 'Өөрчлөлт хадгалах' : 'Ангилал үүсгэх';

  // Default form values
  const defaultValues = initialData
    ? {
        categoryName: initialData.categoryName,
        procedures: initialData.procedures || [
          { taskName: '', quantity: 1, unitPrice: 100 }
        ]
      }
    : {
        categoryName: '',
        procedures: [{ taskName: '', quantity: 1, unitPrice: 100 }]
      };

  // Setting up react-hook-form with validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'procedures'
  });

  // Function to create or update a category
  const createCategory = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      // Determine if it's a create or update operation based on `initialData`
      const endpoint = initialData
        ? `${apiUrl}cat/category/${initialData.id}`
        : `${apiUrl}cat/category`;
      const method = initialData ? 'put' : 'post';

      const res = await axios[method](endpoint, { data });

      if (res.status === 200) {
        toast({ title: toastMessage });
        router.push(`/dashboard/category`);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = (data: ProductFormValues) => {
    createCategory(data);
  };

  // Handling quantity and unit price increments and decrements
  const handleSub = (index: number, type: 'quantity' | 'unitPrice') => {
    const value = Number(form.getValues(`procedures.${index}.${type}`));
    if (type === 'quantity' && value > 1) {
      form.setValue(`procedures.${index}.quantity`, value - 1);
    } else if (type === 'unitPrice' && value > 50) {
      form.setValue(`procedures.${index}.unitPrice`, value - 50);
    }
  };

  const handleAdd = (index: number, type: 'quantity' | 'unitPrice') => {
    const value = Number(form.getValues(`procedures.${index}.${type}`));
    if (type === 'unitPrice' && value >= 50) {
      form.setValue(`procedures.${index}.unitPrice`, value + 50);
    } else if (type === 'quantity' && value >= 0) {
      form.setValue(`procedures.${index}.quantity`, value + 1);
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
          {/* Category Name Field */}
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ангилалын нэр</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Ангилалын нэр"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Procedure Fields (Dynamically Rendered) */}
          {fields.map((pro, index) => (
            <div key={pro.id} className="flex items-end gap-3">
              {/* start */}
              <>
                <FormField
                  control={form.control}
                  name={`procedures.${index}.taskName`}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Дамжлагын нэр</FormLabel>
                        <FormControl className="w-[400px]">
                          <Input
                            disabled={loading}
                            placeholder="Дамжлагын нэр"
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
                      <FormLabel>Нэгж</FormLabel>
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
                            placeholder="Нэгж"
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
                      <FormLabel>Нэгжийн үнэ</FormLabel>
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
                            placeholder="Нэгжийн үнэ"
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

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Устгах
              </Button>
            </div>
          ))}

          {/* Add New Procedure Button */}
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              onClick={() =>
                append({ taskName: '', quantity: 1, unitPrice: 50 })
              }
              disabled={loading}
              variant="outline"
              className="w-60"
            >
              + Дамжлага нэмэх
            </Button>

            {/* Submit Button */}
            <Button disabled={loading} type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
