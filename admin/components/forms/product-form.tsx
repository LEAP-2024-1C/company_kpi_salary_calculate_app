'use client';
import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

import { useToast } from '../ui/use-toast';

import { Category } from '@/constants/data';

import { Label } from '@radix-ui/react-label';
import { Trash } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState('');
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}cat/get/category`);
      if (res.status === 200) {
        const { categories } = res.data;
        console.log('categories', categories);
        setCatForm(categories);
        setCategories(categories);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const [catForm, setCatForm] = useState<Category[]>(
    categories.map((category) => ({
      categoryName: category.categoryName,
      _id: category._id,
      procedures: category.procedures.map((proc) => ({
        taskName: proc.taskName,
        quantity: proc.quantity,
        unitPrice: proc.unitPrice,
        _id: proc._id,
        proCheck: false
      }))
    }))
  );
  console.log('catform', catForm);

  const [isCheck, setIsCheck] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    catIndex: number
  ) => {
    const { checked } = e.target;
    const updated = [...isCheck];
    updated[catIndex] = checked;
    setIsCheck(updated);
  };

  const handleInputChange = (
    catIndex: number,
    procIndex: number,
    field: 'quantity' | 'unitPrice',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCatForm((prev) => {
      const newCatForm = [...prev];
      const updatedProcedures = [...newCatForm[catIndex]?.procedures];

      if (field === 'quantity') {
        updatedProcedures[procIndex].quantity = value;
      } else {
        updatedProcedures[procIndex].unitPrice = value;
      }

      newCatForm[catIndex].procedures = updatedProcedures;
      return newCatForm;
    });
  };
  const handleProCheckChange = (catIndex: number, procIndex: number) => {
    // setCatForm((prev) => {
    //   const newCatForm = [...prev];
    //   const updatedProcedures = [...newCatForm[catIndex].procedures];
    //   updatedProcedures[procIndex].proCheck = true;
    //   // updatedProcedures[procIndex].proCheck =
    //   //   !updatedProcedures[procIndex].proCheck;
    //   newCatForm[catIndex].procedures = updatedProcedures;
    //   console.log('boolean', updatedProcedures[procIndex].proCheck);
    //   return newCatForm;
    // });
    setCatForm((prev) => {
      return prev.map((category, index) => {
        if (index === catIndex) {
          return {
            ...category,
            procedures: category.procedures.map((proc, procIdx) => {
              if (procIdx === procIndex) {
                return { ...proc, proCheck: !proc.proCheck };
              }
              return proc;
            })
          };
        }
        return category;
      });
    });
  };

  const getCheckedValues = () => {
    const checkedValues = catForm
      .map((category, catIndex) => {
        if (isCheck[catIndex]) {
          return {
            categoryName: category.categoryName,
            _id: category._id,
            procedures: category.procedures.filter(
              (item) => item.proCheck === true
            )
          };
        }
        return null;
      })
      .filter(Boolean);
    const value = checkedValues.filter((item) => item?.procedures.length !== 0);
    console.log('Checked Values:', value);
  };

  const createProject = async () => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
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
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pisrslvb');

    try {
      console.log('check');
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData
      );
      setImage(response.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  return (
    <div className="">
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
      <div className="flex gap-2">
        <Input placeholder="Category name" />
        <Input placeholder="Description" />
        <Input type="number" placeholder="Qty" className="w-20" />
        <div>
          <Input
            className="w-40"
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />
          {uploading && <p>Uploading...</p>}
        </div>
      </div>

      <section className="flex flex-col">
        <div className="ml-10 flex flex-col">
          {categories.map(({ categoryName, procedures }, catIndex) => (
            <div key={catIndex}>
              <div>
                <input
                  value={categoryName}
                  type="checkbox"
                  className="mr-2"
                  checked={isCheck[catIndex]}
                  onChange={(e) => handleChange(e, catIndex)}
                />
                <label>{categoryName}</label>
              </div>

              {procedures.map(
                ({ taskName, quantity, unitPrice }, procIndex) => (
                  <div className="ml-20" key={procIndex}>
                    <input
                      checked={
                        catForm[catIndex]?.procedures[procIndex].proCheck
                      }
                      value={taskName}
                      type="checkbox"
                      className="mr-2"
                      disabled={!isCheck[catIndex]}
                      onChange={(e) =>
                        handleProCheckChange(catIndex, procIndex)
                      }
                    />
                    <label>{taskName}</label>
                    <input
                      type="number"
                      className="w-20 p-2"
                      value={catForm[catIndex]?.procedures[procIndex].quantity}
                      disabled={!isCheck[catIndex]}
                      onChange={(e) =>
                        handleInputChange(catIndex, procIndex, 'quantity', e)
                      }
                    />
                    <input
                      type="number"
                      className="w-20 p-2"
                      value={catForm[catIndex]?.procedures[procIndex].unitPrice}
                      disabled={!isCheck[catIndex]}
                      onChange={(e) =>
                        handleInputChange(catIndex, procIndex, 'unitPrice', e)
                      }
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <button onClick={getCheckedValues}>Get Checked Values</button>
      </section>
    </div>
  );
};
