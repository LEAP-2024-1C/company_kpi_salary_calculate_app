'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Category } from '@/constants/data';
import { CellAction } from './cell-action';
import { useState } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { apiUrl } from '@/lib/utils';

interface DataTableProps {
  data: Category[];
  searchKey: string;
}

type NewCategoryForm = {
  categoryName: string;
  procedures: { taskName: string; quantity: number; unitPrice: number }[];
};

export function CategoryTable({ data, searchKey }: DataTableProps) {
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [rowData, setRowData] = useState<{ [key: string]: any }>({});
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false); // Toggle for the form
  const [newCategory, setNewCategory] = useState<NewCategoryForm>({
    categoryName: '',
    procedures: [{ taskName: '', quantity: 1, unitPrice: 100 }]
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleInput = (t_id: string) => {
    setEditingRow(t_id);
    setLoading(false);
  };

  const handleSaveChanges = async (
    t_id: string,
    c_id: string,
    rowData: {
      [key: string]: any;
    }
  ) => {
    try {
      const response = await axios.put(`${apiUrl}cat/procedure`, {
        t_id: t_id,
        c_id: c_id,
        updatedData: rowData
      });
      if (response.status === 200) {
        toast({ title: 'Procedure updated successfully' });
        // Optionally, refresh the category list (you might want to use your state management or a refetching strategy)
        setEditingRow(null);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error adding the category.'
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [taskId]: {
        ...prevData[taskId],
        [name]: value
      }
    }));
  };

  const handleAddCategoryToggle = () => {
    setShowAddCategoryForm((prev) => !prev);
    setAddLoading((prev) => !prev);
  };

  const handleNewCategoryChange = (field: string, value: string) => {
    setSelectedCategoryId(value);
    setNewCategory((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProcedureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const { value } = e.target;
    const updatedProcedures = [...newCategory.procedures];
    console.log('udpro', updatedProcedures);
    updatedProcedures[index] = {
      ...updatedProcedures[index],
      [field]:
        field === 'quantity' || field === 'unitPrice' ? Number(value) : value
    };
    setNewCategory((prev) => ({
      ...prev,
      procedures: updatedProcedures
    }));
    console.log('respnes', newCategory);
  };

  const handleAddProcedure = () => {
    setNewCategory((prev) => ({
      ...prev,
      procedures: [
        ...prev.procedures,
        { taskName: '', quantity: 1, unitPrice: 100 }
      ]
    }));
  };

  const handleRemoveProcedure = (index: number) => {
    const updatedProcedures = [...newCategory.procedures];
    updatedProcedures.splice(index, 1);
    setNewCategory((prev) => ({
      ...prev,
      procedures: updatedProcedures
    }));
  };

  const handleSubmitNewCategory = async () => {
    if (!selectedCategoryId) {
      toast({
        variant: 'destructive',
        title: 'No category selected',
        description: 'Please select a category before submitting.'
      });
      return;
    }

    const categoryData = {
      ...newCategory,
      c_id: selectedCategoryId // Attach the selected category ID to the submission
    };
    console.log('categorydata', categoryData);

    try {
      console.log('first');
      const response = await axios.post(`${apiUrl}cat/procedure`, categoryData);
      if (response.status === 200) {
        toast({ title: 'Category added successfully' });
        setShowAddCategoryForm(false); // Optionally close the form
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an error adding the category.'
      });
    }
  };

  return (
    <>
      <Button onClick={handleAddCategoryToggle} className="mb-4">
        {showAddCategoryForm ? 'Cancel' : 'Add to Category'}
      </Button>

      {showAddCategoryForm && (
        <div className="mb-4 rounded-md bg-gray-100 p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Add New Category</h2>

          <Select
            onValueChange={(value) =>
              handleNewCategoryChange('categoryName', value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Procedures</h3>
            {newCategory.procedures.map((procedure, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <Input
                  value={procedure.taskName}
                  onChange={(e) =>
                    handleAddProcedureChange(e, index, 'taskName')
                  }
                  placeholder="Task Name"
                  className="w-1/3"
                />
                <Input
                  type="number"
                  value={procedure.quantity}
                  onChange={(e) =>
                    handleAddProcedureChange(e, index, 'quantity')
                  }
                  placeholder="Quantity"
                  className="w-1/6"
                />
                <Input
                  type="number"
                  value={procedure.unitPrice}
                  onChange={(e) =>
                    handleAddProcedureChange(e, index, 'unitPrice')
                  }
                  placeholder="Unit Price"
                  className="w-1/6"
                />
                <Button
                  onClick={() => handleRemoveProcedure(index)}
                  className="mt-4"
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              onClick={handleAddProcedure}
              variant="outline"
              className="mb-4"
            >
              Add Procedure
            </Button>
          </div>

          <Button
            onClick={handleSubmitNewCategory}
            className="w-full"
            disabled={addLoading}
          >
            {addLoading ? 'Saving...' : 'Add Category'}
          </Button>
        </div>
      )}

      <ScrollArea className="h-[calc(85vh-220px)] rounded-md border">
        <div className="flex flex-col gap-4">
          {data.map((product) => (
            <div key={product._id} className="flex flex-col gap-4">
              <div className="flex justify-between pr-7">
                <h1 className="pl-2 text-left text-xl font-semibold">
                  {product.categoryName}
                </h1>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 font-semibold">
                      Дамжлага
                    </TableHead>
                    <TableHead className="font-semibold">Нэгж</TableHead>
                    <TableHead className="font-semibold">Нэгжийн Үнэ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.procedures.map((task) => {
                    const t_id = task._id;
                    const c_id = product._id;
                    const formData = rowData[t_id] || {
                      taskName: task.taskName,
                      unit: task.quantity,
                      unitPrice: task.unitPrice
                    };
                    return (
                      <TableRow key={t_id}>
                        <TableCell className="w-1/2">
                          <Input
                            name="taskName"
                            onChange={(e) => handleChange(e, t_id)}
                            type="text"
                            value={formData.taskName}
                            disabled={loading && editingRow !== t_id}
                          />
                        </TableCell>
                        <TableCell className="w-20">
                          <Input
                            name="quantity"
                            onChange={(e) => handleChange(e, t_id)}
                            type="number"
                            value={formData.unit}
                            disabled={loading && editingRow !== t_id}
                            className="w-20 text-center"
                          />
                        </TableCell>
                        <TableCell className="w-20">
                          <div className="flex w-20 items-center">
                            <Input
                              name="unitPrice"
                              onChange={(e) => handleChange(e, t_id)}
                              type="number"
                              value={formData.unitPrice}
                              disabled={loading && editingRow !== t_id}
                              className="w-20 text-center"
                            />
                            ₮
                          </div>
                        </TableCell>
                        <TableCell className="w-5">
                          {editingRow === t_id ? (
                            <Button
                              className="w-10"
                              onClick={() =>
                                handleSaveChanges(t_id, c_id, rowData[t_id])
                              }
                            >
                              {/* {console.log('rowdata', rowData[t_id])} */}
                              Save
                            </Button>
                          ) : (
                            <CellAction
                              t_id={t_id}
                              c_id={c_id}
                              setCellconfirm={() => {}}
                              handleInput={() => handleInput(t_id)}
                              data={product.procedures}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
