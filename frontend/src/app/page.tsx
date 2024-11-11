"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/utils";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { formPage } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
interface IPage {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formPage>>({
    resolver: zodResolver(formPage),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const logIn = async (value: IPage) => {
    const { email, password } = value;
    try {
      const response = await axios.post(`${apiUrl}auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("амжилттай нэвтэрлээ", { autoClose: 1000 });
        const { token } = response.data;
        localStorage.setItem("token", token);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("имэил эсвэл нууц үг буруу байна", { autoClose: 1000 });
    }
  };

  const onSubmit = (values: z.infer<typeof formPage>) => {
    logIn(values);
    console.log("pass", values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col gap-5 text-center p-16 m-16">
        <h1 className="text-3xl font-bold">Нэвтрэх</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="flex flex-col gap-7 items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 items-center">
              <Button
                className="btn bg-[#0166FF] text-white rounded-[20px] w-[334px] h-[36px] "
                type="submit"
              >
                Нэвтрэх
              </Button>
              <Link href={"/signup"}>
                <Button
                  className="btn bg-gray-400 text-white rounded-[20px] w-[334px] h-[36px] "
                  type="submit"
                >
                  Админ бүртгүүлэх
                </Button>
              </Link>
              <div className="flex gap-3">
                <p className="border-b text-gray-500">
                  <Link href={"/forgetpass/email"}>
                    Нууц үг мартсан / анх удаа нэвтрэх
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Login;
