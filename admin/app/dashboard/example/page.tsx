'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categories } from '@/constants/data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';

const items = [
  {
    id: 'recents',
    label: 'Recents',
    procedures: [
      { taskName: 'Task 1', _id: '1' },
      { taskName: 'Task 2', _id: '2' },
      { taskName: 'Task 3', _id: '3' }
    ]
  },
  {
    id: 'home',
    label: 'Home',
    procedures: [
      { taskName: 'Task 4', _id: '4' },
      { taskName: 'Task 5', _id: '5' },
      { taskName: 'Task 6', _id: '6' }
    ]
  },
  {
    id: 'applications',
    label: 'Applications',
    procedures: [
      { taskName: 'Task 7', _id: '7' },
      { taskName: 'Task 8', _id: '8' },
      { taskName: 'Task 9', _id: '9' }
    ]
  }
];

const FormSchema = z.object({
  items: z.array(
    z.object({
      catName: z.string().optional(),
      tasks: z.array(z.string())
    })
  )
});

export default function AccordionDemo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: []
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('object', data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="ml-10">
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
              </div>
              {categories.map(({ categoryName, _id, procedures }, idx) => (
                <FormField
                  key={idx}
                  control={form.control}
                  name={`items.${idx}.catName`}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {categoryName}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

{
  /* <Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1" className="ml-10">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>; */
}
