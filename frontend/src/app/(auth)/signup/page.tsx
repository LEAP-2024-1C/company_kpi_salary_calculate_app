"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminSchema, formSchema } from "@/utils/validationSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const signUp = async () => {
    const { firstname, lastname, email, password, repassword } = userData;

    if (password !== repassword) {
      toast.error("Нууц үг хоорондоо тохирохгүй байна.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/signup`, {
        firstname,
        lastname,
        email,
        password,
        repassword,
      });

      if (res.status === 201) {
        toast.success("User successfully signed up", { autoClose: 1000 });
        router.push("/login");
      }
    } catch (error) {
      console.log("There was an error signing up:", error);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof adminSchema>) => {
    signUp();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl	font-semibold	">Админ бүртгүүлэх</h2>
      </div>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-[300px]"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
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
                      placeholder="Password"
                      {...field}
                      type="password"
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
                      placeholder="Repassword"
                      {...field}
                      type="password"
                      className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ul className="list-disc ml-8 text-xs text-muted-foreground">
              <li>Том үсэг орсон байх </li>
              <li>Жижиг үсэг орсон байх </li>
              <li>Тоо орсон байх</li>
              <li>Тэмдэгт орсон байх</li>
            </ul>
            <Button
              className="btn bg-[#0166FF] text-white rounded-[20px] w-[334px] h-[36px] "
              type="submit"
            >
              Үүсгэх
            </Button>
            <Link href="/">
              <Button className="btn bg-gray-400 text-white rounded-[20px] w-[334px] h-[36px]">
                Нэвтрэх
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
