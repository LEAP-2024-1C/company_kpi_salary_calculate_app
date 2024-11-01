import React, { Dispatch, SetStateAction } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn
} from 'react-hook-form';

interface ProductFormProps {
  pro: FieldArrayWithId<
    {
      categoryName: string;
      procedures: {
        quantity: number;
        unitPrice: number;
        taskName: string;
      }[];
    },
    'procedures',
    'id'
  >;
  form: UseFormReturn<
    {
      procedures: {
        quantity: number;
        unitPrice: number;
        taskName: string;
      }[];
      categoryName: string;
    },
    any,
    undefined
  >;
  index: number;
  loading: boolean;
  taskName: string;
  setTaskName: Dispatch<SetStateAction<string>>;
  addUnit: (id: string) => void;
  addUnitPrice: (id: string) => void;
  subtractUnit: (id: string) => void;
  subtractUnitPrice: (id: string) => void;
  remove: UseFieldArrayRemove;
}

const CategoryInput: React.FC<ProductFormProps> = ({
  pro,
  form,
  index,
  loading,
  taskName,
  setTaskName,
  addUnit,
  addUnitPrice,
  subtractUnit,
  subtractUnitPrice,
  remove
}) => {
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
                    value={taskName}
                    onChange={(e) => {
                      setTaskName(e.target.value);
                    }}
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
                    onClick={() => subtractUnit(pro.id)}
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
                    onClick={() => addUnit(pro.id)}
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
                    onClick={() => subtractUnitPrice(pro.id)}
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
                    onClick={() => addUnitPrice(pro.id)}
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
};

export default CategoryInput;
