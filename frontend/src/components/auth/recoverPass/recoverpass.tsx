"use client";

import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/utils/validationSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/lib/utils";
interface IPass {
  password: string;
  repassword: string;
}

const RecoverPass = () => {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resettoken");
  const router = useRouter();

  const handleNewPassword = async (value: IPass) => {
    const { password, repassword } = value;
    if (!(password === repassword)) {
      toast.error("password and repassword need to be identical");
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/auth/verify-password`, {
        password: password,
        resetToken: resetToken,
      });
      if (res.status === 200) {
        toast.success("нууц үг амжилттай өөрчлөгдлөө");
        router.push("/");
      }
    } catch (error) {}
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleNewPassword(values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="repassword"
                        {...field}
                        type="password"
                        className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ul className="list-disc pl-6">
                <li>Том үсэг орсон байх </li>
                <li>Жижиг үсэг орсон байх </li>
                <li>Тоо орсон байх</li>
                <li>Тэмдэгт орсон байх</li>
              </ul>
              <Button
                className="btn bg-[#0166FF] text-white rounded-[20px] w-[334px] h-[36px] "
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RecoverPass;
