'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const categories = [
  {
    _id: '671afda11208d7373353b1a1',
    categoryName: 'Харма',
    procedures: [
      {
        task_id: '671afda11208d7373353b1a2',
        taskName: 'таг 1-р оёо хавчуургатай',
        quantity: 2,
        unitPrice: 350
      },
      {
        task_id: '671afda11208d7373353b1a3',
        taskName: 'таг лавчик 0.6',
        quantity: 2,
        unitPrice: 200
      }
    ]
  },
  {
    _id: '671aff3f1208d7373353b1aa',
    categoryName: 'Холбох',
    procedures: [
      {
        task_id: '671aff3f1208d7373353b1ab',
        taskName: 'Мөр залгах 1-р',
        quantity: 2,
        unitPrice: 200
      },
      {
        task_id: '671aff3f1208d7373353b1ac',
        taskName: 'Мөр лавчик ХОС ногоон',
        quantity: 4,
        unitPrice: 450
      }
    ]
  }
];

const FormSchema = z.object({
  categories: z.array(
    z.object({
      cat_id: z.string(),
      tasks: z.array(
        z.object({
          task_id: z.string(),
          taskName: z.string(),
          quantity: z.number(),
          unitPrice: z.number(),
          selected: z.boolean().default(false)
        })
      )
    })
  )
});

export default function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: categories.map((item) => ({
        cat_id: item.categoryName,
        tasks: item.procedures.map((proc) => ({
          task_id: proc.task_id,
          taskName: proc.taskName,
          quantity: proc.quantity,
          unitPrice: proc.unitPrice,
          selected: false
        }))
      }))
    }
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'categories'
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="ml-8 space-y-8">
        <div className="mb-4">
          <FormLabel className="text-base">Sidebar</FormLabel>
          <FormDescription>
            Select the items you want to display in the sidebar.
          </FormDescription>
        </div>
        {fields.map((category, idx) => (
          <div key={category.cat_id}>
            <FormField
              control={form.control}
              name={`categories.${idx}.cat_id`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value !== undefined}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {categories[idx].categoryName}
                  </FormLabel>
                </FormItem>
              )}
            />
            {category.tasks.map((task, taskIdx) => (
              <FormField
                key={task.task_id}
                control={form.control}
                name={`categories.${idx}.tasks.${taskIdx}.selected`}
                render={({ field }) => (
                  <FormItem className="ml-10 flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {task.taskName} - Qty: {task.quantity}, Price:{' '}
                      {task.unitPrice}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        ))}
        <FormMessage />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
