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
import { Quantico } from 'next/font/google';
import { count } from 'console';

interface ProductFormProps {
  initialData: any | null;
}
interface Product {
  productName: string;
  description: string;
  quantity: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<[number]>([0]);
  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product.' : 'Add a new product';
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImage] = useState('');
  const [catForm, setCatForm] = useState<Category[]>(
    categories.map((category) => ({
      categoryName: category.categoryName,
      procedures: category.procedures.map((proc) => ({
        taskName: proc.taskName,
        quantity: proc.quantity,
        unitPrice: proc.unitPrice,
        proCheck: false
      }))
    }))
  );
  console.log('catform', catForm);
  const [isCheck, setIsCheck] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );
  const [productForm, setProductForm] = useState<Product>({
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
        updatedProcedures[procIndex].quantity = Number(value);
      } else {
        updatedProcedures[procIndex].unitPrice = Number(value);
      }

      newCatForm[catIndex].procedures = updatedProcedures;
      return newCatForm;
    });
  };
  const handleProCheckChange = (catIndex: number, procIndex: number) => {
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
            procedures: category.procedures.filter(
              (item) => item.proCheck === true
            )
          };
        }
        return null;
      })
      .filter(Boolean);
    const value = checkedValues.filter((item) => item?.procedures.length !== 0);
    console.log('value', value);
    // createProject(value);
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
  // const handleAdd = (catIndex: number, procIndex: number) => {
  //   setCatForm((prev) => {
  //     return prev.map((category, index) => {
  //       if (index === catIndex) {
  //         return {
  //           ...category,
  //           procedures: category.procedures.map((proc, procIdx) => {
  //             if (procIdx === procIndex) {
  //               return { ...proc, quantity: proc.quantity + 1 };
  //             }
  //             return proc;
  //           })
  //         };
  //       }
  //       return category;
  //     });
  //   });

  //   // test
  //   setCatForm((prev) => [...prev]);
  //   // test
  // };

  const handleSub = (catIndex: number, procIndex: number) => {
    setCatForm((prev) => {
      const newArr = [...prev];
      if (newArr[catIndex].procedures[procIndex].quantity > 0) {
        newArr[catIndex].procedures[procIndex].quantity =
          Number(newArr[catIndex].procedures[procIndex].quantity) - 1;
      }
      return newArr;
    });
  };
  const handleAdd = (catIndex: number, procIndex: number) => {
    setCatForm((prev) => {
      const newArr = [...prev];
      newArr[catIndex].procedures[procIndex].quantity =
        Number(newArr[catIndex].procedures[procIndex].quantity) + 1;
      return newArr;
    });
  };

  return (
    <div className="">
      <div className="mb-5 flex items-center justify-between">
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

              {procedures.map(
                ({ taskName, quantity, unitPrice }, procIndex) => (
                  <div className="ml-20" key={procIndex}>
                    <input
                      checked={
                        catForm[catIndex]?.procedures[procIndex].proCheck
                      }
                      value={taskName}
                      type="checkbox"
                      className="mr-2 "
                      disabled={!isCheck[catIndex]}
                      onChange={(e) =>
                        handleProCheckChange(catIndex, procIndex)
                      }
                    />

                    <label>{taskName}</label>
                    <div>
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() => handleSub(catIndex, procIndex)}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        className="w-20  p-2 "
                        value={
                          catForm[catIndex]?.procedures[procIndex].quantity
                        }
                        disabled={!isCheck[catIndex]}
                        onChange={(e) =>
                          handleInputChange(catIndex, procIndex, 'quantity', e)
                        }
                      />
                      <Button
                        className="h-8 w-8 rounded-full border border-black bg-transparent text-black dark:border-white dark:text-white"
                        onClick={() => handleAdd(catIndex, procIndex)}
                      >
                        +
                      </Button>
                    </div>
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
        <button onClick={getCheckedValues}>sumbit</button>
      </section>
    </div>
  );
};
