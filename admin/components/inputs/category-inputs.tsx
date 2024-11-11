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
    },
    any,
    undefined
  >;
  index: number;
  loading: boolean;
  handleAdd: (index: number, type: 'quantity' | 'unitPrice') => void;
  handleSub: (index: number, type: 'quantity' | 'unitPrice') => void;
  remove: UseFieldArrayRemove;
}

const CategoryInput: React.FC<ProductFormProps> = ({
  pro,
  form,
  index,
  loading,
  handleAdd,
  handleSub,
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
                    placeholder="Unit"
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
              <FormLabel>Unit Price</FormLabel>
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
                    placeholder="Unit Price"
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

      <Button type="button" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};

export default CategoryInput;
