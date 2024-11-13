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
import { useUser } from "@/context/user-provider";

interface IPage {
  email: string;
  password: string;
}

const Login = () => {
  const { setIsLoggedIn } = useUser();
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
        setIsLoggedIn((prev) => !prev);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("имэил эсвэл нууц үг буруу байна", { autoClose: 1000 });
    }
  };

  const onSubmit = (values: z.infer<typeof formPage>) => {
    logIn(values);
  };

  return (
    <div className=" h-screen w-full bg-teal-700 p-20">
      <div className="bg-white flex rounded-3xl h-full w-full">
        <div className="flex-1 p-28 flex flex-col gap-16">
          <div className="flex justify-between items-center">
            <img
              src="./images/clothing.logo.jpg"
              alt="company logo"
              className="h-[100px] w-[100px] rounded-xl"
            />
            <h1 className="text-teal-700 text-5xl font-bold text-center ">
              ...
            </h1>
          </div>
          <p className="text-lg text-teal-800 text-center border-2 border-cyan-700 rounded-xl p-5 bg-gray-50">
            Зөвхөн эрхтэй ажилчид нэвтрэн ажлын гүйцэтгэл ба цалингийн үнэлгээг
            гаргах боломжтой
          </p>
        </div>
        <div className="w-full h-full p-5 flex-1">
          <div
            className="flex flex-col items-center justify-center  gap-10  rounded-3xl h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.pinimg.com/564x/28/9b/bf/289bbfd0ee56b705bf697ddfa05065e7.jpg')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col gap-5 text-center p-16 m-16">
              <h1 className="text-3xl font-bold text-white">Нэвтрэх</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" space-y-6"
                >
                  <div className="flex flex-col gap-7 items-center">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border border-cyan-900"
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
                              placeholder="Password"
                              {...field}
                              className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border  border-cyan-900"
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
                      className="btn bg-teal-700 text-white rounded-[20px] w-[334px] h-[36px] "
                      type="submit"
                    >
                      Нэвтрэх
                    </Button>
                    <div className="flex gap-3">
                      <p className="border-b text-gray-200">
                        <Link href={"/forgetpass/email"}>
                          Нууц үг мартсан / Анх удаа нэвтрэх
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
