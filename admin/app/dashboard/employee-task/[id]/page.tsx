'use client';

import { apiUrl } from '@/lib/utils';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { IStatus, IUser } from '@/constants/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

type product = {
  product_id: string;
  components: component[];
};
type component = {
  _id: string;
  categoryName: string;
  procedures: procedure[];
};
type procedure = {
  _id: string;
  status: IStatus;
  taskName: string;
  quantity: number;
  unitPrice: number;
  taskStatus: string;
};
type SelectedProduct = {
  user: IUser;
  products: product[];
};
type SentData = {
  component_id: string;
  task_id: string;
  user_id: string;
};
const ProductTaskDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<SentData | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [proTasks, setProTasks] = useState<SelectedProduct[]>();
  const getTaskDetail = async () => {
    try {
      const res = await axios.get(`${apiUrl}picked/tasks/${id}`);
      if (res.status === 200) {
        const { matchingTasks } = res.data;
        setProTasks(matchingTasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateComponentStatus = async (
    component_id: string,
    task_id: string,
    assign: number
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.put(`${apiUrl}comp/update/status/admin`, {
        compStatus: {
          component_id,
          task_id,
          assign
        }
      });
      if (res.status === 200) {
        setIsLoading(true);
        setRefresh((prev) => !prev);
        toast({
          title: 'амжилттай шинэчлэгдлээ.',
          description: 'There was a problem with your request.'
        });
        console.log('succes');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const updateEmployeeStatus = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(`${apiUrl}picked/employee/${id}`, {
        data
      });
      if (res.status === 200) {
        setIsLoading(false);
        setData(null);
        setRefresh((prev) => !prev);
        toast({
          title: 'амжилттай шинэчлэгдлээ.',
          description: 'There was a problem with your request.'
        });
        console.log('succes');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  const handleStatus = (
    comp_id: string,
    task_id: string,
    assign: number,
    user_id: string
  ) => {
    updateComponentStatus(comp_id, task_id, assign);
    setData({
      component_id: comp_id,
      task_id: task_id,
      user_id: user_id
    });
    // console.log('comp_id', comp_id);
    // console.log('task', task_id);
    // console.log('assign', assign);
  };
  useEffect(() => {
    getTaskDetail();
  }, [refresh]);
  useEffect(() => {
    if (!data) {
      return;
    }
    updateEmployeeStatus();
  }, [refresh]);
  return (
    <ScrollArea className="h-[calc(100vh-60px)]">
      <div className="ml-10">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Зураг</TableHead>
              <TableHead className="w-[100px]">Овог нэр</TableHead>
              <TableHead className="w-[100px]">Өөрийн нэр</TableHead>
              <TableHead>Утасны дугаар</TableHead>
              <TableHead>Эд ангийн нэр</TableHead>
              <TableHead>Ажилбарууд</TableHead>
              <TableHead>Нэгж үнэ</TableHead>
              <TableHead>Нэгж</TableHead>
              <TableHead>Ажилбарын тоо</TableHead>
              <TableHead>Төлөв</TableHead>
              <TableHead>Үнэ</TableHead>
              <TableHead className="text-right">Төлөв өөрчлөх</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proTasks?.length && !isLoading ? (
              proTasks?.map(({ user, products }, idx) => (
                <React.Fragment key={idx}>
                  {products.map((product) =>
                    product.components.map((component) =>
                      component.procedures.map((procedure, procIdx) => (
                        <TableRow key={`${component._id}-${procIdx}`}>
                          <TableCell>
                            <img
                              src={user.profile_img}
                              alt=""
                              className="h-12 w-12 rounded-full"
                            />
                          </TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.phoneNumber}</TableCell>
                          <TableCell>{component.categoryName}</TableCell>
                          <TableCell>{procedure.taskName}</TableCell>
                          <TableCell>{procedure.unitPrice}</TableCell>
                          <TableCell>{procedure.quantity}</TableCell>
                          <TableCell>{procedure.status.assign}</TableCell>
                          <TableCell>{procedure.taskStatus}</TableCell>
                          <TableCell className="text-right">
                            {(
                              procedure.unitPrice *
                              procedure.quantity *
                              procedure.status.assign
                            ).toFixed(1)}
                            ₮
                          </TableCell>
                          <TableCell>
                            <Button
                              className={`px-4 py-2 text-white ${
                                procedure.taskStatus === 'done'
                                  ? 'cursor-not-allowed bg-gray-500'
                                  : 'bg-blue-500 hover:bg-blue-700'
                              }`}
                              disabled={procedure.taskStatus === 'done'}
                              onClick={() =>
                                handleStatus(
                                  component._id,
                                  procedure._id,
                                  procedure.status.assign,
                                  user._id
                                )
                              }
                            >
                              Change Status
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center">
                  Loading tasks...
                </TableCell>{' '}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default ProductTaskDetail;
