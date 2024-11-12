'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import { Category, IProduct } from '@/constants/data';
import axios from 'axios';
import { apiUrl } from '@/lib/utils';

interface ProductFormProps {
  initialData: any | null;
}
type NewCategoryForm = {
  categoryName: string;
  procedures: { taskName: string; quantity: number; unitPrice: number }[];
};
export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<NewCategoryForm>({
    categoryName: '',
    procedures: [{ taskName: '', quantity: 1, unitPrice: 100 }]
  });
  const [uploading, setUploading] = useState(false);
  const [images, setImage] = useState('');

  const [isCheck, setIsCheck] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );
  const [productForm, setProductForm] = useState<IProduct>({
    productName: '',
    description: '',
    quantity: ''
  });
  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}cat/get/category`);
      if (res.status === 200) {
        const { categories } = res.data;
        console.log('categories', categories);
        setCategories(categories);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    catIndex: number
  ) => {
    const { checked } = e.target;
    const updated = [...isCheck];
    updated[catIndex] = checked;
    setIsCheck(updated);
  };
  const handleLogForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
    // categories.map((item) =>
    //   item.procedures.map((pro) => (pro.status.pending = Number(value)))
    // );
    setCategories((prev) => {
      const newCatForm = [...prev];
      newCatForm.map((pro) =>
        pro.procedures.map((task) => (task.status.pending = Number(value)))
      );
      return newCatForm;
    });
  };
  const handleInputChange = (
    catIndex: number,
    procIndex: number,
    field: 'quantity' | 'unitPrice',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCategories((prev) => {
      const newCatForm = [...prev];
      const updatedProcedures = [...newCatForm[catIndex]?.procedures];

      if (field === 'quantity') {
        updatedProcedures[procIndex].quantity = Number(value);
      } else {
        updatedProcedures[procIndex].unitPrice = Number(value);
      }

      newCatForm[catIndex].procedures = updatedProcedures;
      return newCatForm;
    });
  };
  const handleProCheckChange = (catIndex: number, procIndex: number) => {
    setCategories((prev) => {
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
    const checkedValues = categories
      .map((category, catIndex) => {
        if (isCheck[catIndex]) {
          return {
            categoryName: category.categoryName,
            procedures: category.procedures
              .filter((item) => item.proCheck)
              .map(({ taskName, quantity, unitPrice, status }) => ({
                taskName,
                quantity,
                unitPrice,
                status
              }))
          };
        }
        return null;
      })
      .filter(Boolean);
    const value = checkedValues.filter((item) => item?.procedures.length !== 0);
    console.log('value', value);
    createProject(value);
  };

  const handleAddProcedure = () => {
    setNewCategory((prev) => ({
      ...prev,
      procedures: [
        ...prev.procedures,
        { status: {}, taskName: '', quantity: 1, unitPrice: 100 }
      ]
    }));
  };

  const createProject = async (components: any) => {
    const { productName, description, quantity } = productForm;
    if (!productName || !description || !quantity) {
      return toast({
        variant: 'destructive',
        title: 'Хоосон утга байж болохгүй.',
        description: 'There was a problem with your request.'
      });
    }
    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}pro/product`, {
        components,
        productForm,
        images
      });

      if (res.status === 200) {
        console.log('success');
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

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
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
      console.log('img', response.data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleSub = (
    catIndex: number,
    procIndex: number,
    type: 'quantity' | 'unitPrice'
  ) => {
    setCategories((prev) => {
      const newArr = [...prev];
      if (type === 'quantity') {
        if (newArr[catIndex].procedures[procIndex].quantity > 1) {
          newArr[catIndex].procedures[procIndex].quantity =
            Number(newArr[catIndex].procedures[procIndex].quantity) - 1;
        }
      } else {
        if (newArr[catIndex].procedures[procIndex].unitPrice > 100) {
          newArr[catIndex].procedures[procIndex].unitPrice =
            Number(newArr[catIndex].procedures[procIndex].unitPrice) - 100;
        }
      }
      return newArr;
    });
  };
  const handleAdd = (
    catIndex: number,
    procIndex: number,
    type: 'quantity' | 'unitPrice'
  ) => {
    if (type !== 'unitPrice') {
      setCategories((prev) => {
        const newArr = [...prev];
        newArr[catIndex].procedures[procIndex].quantity =
          Number(newArr[catIndex].procedures[procIndex].quantity) + 1;
        return newArr;
      });
    } else {
      setCategories((prev) => {
        const newArr = [...prev];
        newArr[catIndex].procedures[procIndex].unitPrice =
          Number(newArr[catIndex].procedures[procIndex].unitPrice) + 100;
        return newArr;
      });
    }
  };

  return (
    <div className="">
      <div className="my-5 flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mb-5" />
      <div className="p-5">
        <div className="mb-5 flex gap-4">
          <Input
            placeholder="Product name"
            onChange={handleLogForm}
            name="productName"
          />
          <Input
            className=""
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleImageUpload(e.target.files[0])
            }
          />
          {uploading && <p>Uploading...</p>}
        </div>
        <div className="mb-5 flex gap-4">
          <Input
            placeholder="Description"
            onChange={handleLogForm}
            name="description"
          />
          <Input
            type="number"
            placeholder="Quantity"
            className=""
            onChange={handleLogForm}
            name="quantity"
          />
        </div>
      </div>

      <section className="flex flex-col">
        <div className="ml-10 flex flex-col">
          {categories.map(({ categoryName, procedures }, catIndex) => (
            <div key={catIndex}>
              <div className="flex justify-between px-8">
                <div>
                  <input
                    value={categoryName}
                    type="checkbox"
                    className="mr-2 "
                    checked={isCheck[catIndex]}
                    onChange={(e) => handleChange(e, catIndex)}
                  />
                  <label>{categoryName}</label>
                </div>
                <Button className="rounded-full" onClick={handleAddProcedure}>
                  +
                </Button>
              </div>

              {procedures.map(
                ({ taskName, quantity, unitPrice }, procIndex) => (
                  <div
                    className="ml-20 flex items-center gap-2"
                    key={procIndex}
                  >
                    <input
                      checked={
                        categories[catIndex]?.procedures[procIndex].proCheck
                      }
                      value={taskName}
                      type="checkbox"
                      className="mr-2 "
                      disabled={!isCheck[catIndex]}
                      onChange={(e) =>
                        handleProCheckChange(catIndex, procIndex)
                      }
                    />

                    <label className="w-80">{taskName}</label>
                    <div>
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() =>
                          handleSub(catIndex, procIndex, 'quantity')
                        }
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        className="w-20 bg-inherit p-2 text-center "
                        value={
                          categories[catIndex]?.procedures[procIndex].quantity
                        }
                        disabled={!isCheck[catIndex]}
                        onChange={(e) =>
                          handleInputChange(catIndex, procIndex, 'quantity', e)
                        }
                      />
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() =>
                          handleAdd(catIndex, procIndex, 'quantity')
                        }
                      >
                        +
                      </Button>
                    </div>
                    <div>
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() =>
                          handleSub(catIndex, procIndex, 'unitPrice')
                        }
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        className="w-20 bg-inherit p-2 text-center"
                        value={
                          categories[catIndex]?.procedures[procIndex].unitPrice
                        }
                        disabled={!isCheck[catIndex]}
                        onChange={(e) =>
                          handleInputChange(catIndex, procIndex, 'unitPrice', e)
                        }
                      />
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() =>
                          handleAdd(catIndex, procIndex, 'unitPrice')
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
        <button onClick={getCheckedValues}>sumbit</button>
      </section>
    </div>
  );
};
