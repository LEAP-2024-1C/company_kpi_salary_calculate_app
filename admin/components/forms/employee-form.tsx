'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
// import FileUpload from '../file-upload';
import { apiUrl } from '@/lib/utils';

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  lastName: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  firstName: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),

  email: z
    .string()
    .min(3, { message: 'Product description must be at least 3 characters' }),
  phoneNumber: z.coerce.number(),
  job_title: z.string()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const EmployeeForm: React.FC<ProductFormProps> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData
    ? 'Хэрэглэгчийн мэдээлэл засах'
    : 'Хэрэглэгч шинээр үүсгэх';
  const description = initialData
    ? 'Хэрэглэгчийн мэдээлэл засварлах.'
    : 'Шинэ хэрэглэгч үүсгэх';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Хадгалах' : 'Үүсгэх';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        price: 0,
        imgUrl: [],
        category: ''
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const createEmployee = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      const res = await axios.post(`${apiUrl}auth/create/employee`, { data });

      // router.refresh();
      // router.push(`/dashboard/products`);

      if (res.status === 200) {
        toast({
          variant: 'default',
          title: 'амжилттай шинэ хэрэглэгч үүсэглээ.'
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (data: ProductFormValues) => {
    console.log('first', data);
    createEmployee(data);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // const triggerImgUrlValidation = () => form.trigger('imgUrl');

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Нэр" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Овог</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Овог" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>И-Мэйл</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="И-Мэйл" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Утасны дугаар</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Утасны дугаар"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Албан тушаал</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Албан тушаал сонгох"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
