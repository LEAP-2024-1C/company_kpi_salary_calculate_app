'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import { Category, IProduct, Procedures } from '@/constants/data';
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

    // Update product form fields
    setProductForm((prev) => ({
      ...prev,
      [name]: value
    }));

    // Update categories' pending status in each procedure
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        procedures: category.procedures.map((task) => ({
          ...task,
          // Ensure status object and pending property exist
          status: {
            ...task.status,
            pending: Number(value) // Set pending to the value from the input
          }
        }))
      }))
    );
  };

  const handleInputChange = (
    catIndex: number,
    procIndex: number,
    field: 'quantity' | 'unitPrice' | 'taskName',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setCategories((prev) => {
      const newCatForm = [...prev];
      const updatedProcedures = [...newCatForm[catIndex].procedures];

      if (field === 'quantity') {
        updatedProcedures[procIndex].quantity = Number(value);
      } else if (field === 'unitPrice') {
        updatedProcedures[procIndex].unitPrice = Number(value);
      } else if (field === 'taskName') {
        updatedProcedures[procIndex].taskName = value;
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

  const handleAddProcedure = (catIndex: number) => {
    setCategories((prevCategories: Category[]) =>
      prevCategories.map((category: Category, index: number) =>
        index === catIndex
          ? {
              ...category,
              procedures: [
                ...category.procedures,
                { taskName: '', quantity: 1, unitPrice: 100 } as Procedures
              ]
            }
          : category
      )
    );
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
      // Step 1: Check if the project already exists
      // const checkRes = await axios.get(`${apiUrl}pro/product/productName`, {
      //   data: productName
      // });

      // console.log('checkres', checkRes);

      // if (checkRes.status === 200 && checkRes.data.exists) {
      //   // If project exists
      //   toast({
      //     variant: 'destructive',
      //     title: 'Project with this name already exists.',
      //     description: 'Please choose a different name for the project.'
      //   });
      //   return;
      // }

      // Step 2: Proceed with creating the project if not exists
      const res = await axios.post(`${apiUrl}pro/product`, {
        components,
        productForm,
        images
      });

      if (res.status === 200) {
        console.log('success');
        toast({ title: 'Successfully created project' });
        router.push('/dashboard/product');
      }
    } catch (error: any) {
      console.error(error); // Log the error for debugging purposes
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

      <section className="flex flex-col items-center gap-5">
        <div className="mx-10 flex w-full flex-col">
          {categories.map(({ categoryName, procedures }, catIndex) => (
            <div key={catIndex}>
              {/* Category title and checkbox */}
              <div className="flex justify-between px-8">
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
                <Button
                  className="rounded-full"
                  onClick={() => handleAddProcedure(catIndex)}
                >
                  +
                </Button>
              </div>

              {procedures.map(
                ({ taskName, quantity, unitPrice, proCheck }, procIndex) => (
                  <div
                    className="ml-20 flex items-center gap-10"
                    key={procIndex}
                  >
                    {/* Procedure checkbox */}
                    <input
                      type="checkbox"
                      checked={proCheck || false}
                      onChange={() => handleProCheckChange(catIndex, procIndex)}
                      className="mr-2"
                      disabled={!isCheck[catIndex]}
                    />
                    <input
                      type="text"
                      className="w-80 bg-inherit p-2"
                      value={taskName}
                      onChange={(e) =>
                        handleInputChange(catIndex, procIndex, 'taskName', e)
                      }
                      disabled={!isCheck[catIndex]}
                    />
                    <div className="flex gap-1">
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
                        className="w-14 bg-inherit p-2 text-center"
                        value={quantity}
                        onChange={(e) =>
                          handleInputChange(catIndex, procIndex, 'quantity', e)
                        }
                        disabled={!isCheck[catIndex]}
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
                        value={unitPrice}
                        onChange={(e) =>
                          handleInputChange(catIndex, procIndex, 'unitPrice', e)
                        }
                        disabled={!isCheck[catIndex]}
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
        <Button className="w-1/4 text-center" onClick={getCheckedValues}>
          submit
        </Button>
      </section>
    </div>
  );
};
