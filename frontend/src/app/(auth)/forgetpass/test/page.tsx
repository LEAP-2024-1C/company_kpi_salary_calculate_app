// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema } from "@/utils/validationSchema";
// import React, { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Form, useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import Link from "next/link";
// interface IPass {
//   password: string;
//   repassword: string;
// }

// const NewPass = () => {
//   const router = useRouter();

//   const { toast } = useToast();

//   const params = useSearchParams();

//   const handleNewPassword = async (value: IPass) => {
//     const { password, repassword } = value;
//     if (!(password === repassword)) {
//       console.log("Clicked not match");
//       toast({
//         title: "Алдаа",
//         description: "Нууц үг хоорондоо таарахгүй байна",
//       });
//       return;
//     }
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/auth/verify-password`,
//         {
//           password: password,
//           resetToken: params.get("resettoken"),
//         }
//       );
//       if (res.status === 200) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.log("first", error);
//     }
//   };
//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     // handleNewPassword(values);
//     console.log("pass", values);
//   };

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       password: "",
//       repassword: "",
//     },
//   });

//   return (
//     <div className="flex flex-col items-center  bg-gray-100">
//       <div className=" flex flex-col h-screen gap-10 justify-center">
//         <h1 className="flex justify-center"> Нууц үг сэргээх</h1>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex flex-col gap-6 w-[300px]"
//           >
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="password" {...field} type="password" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="repassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="repassword"
//                       {...field}
//                       type="password"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <ul className="list-disc ml-8 text-xs text-muted-foreground">
//               <li>Том үсэг орсон байх </li>
//               <li>Жижиг үсэг орсон байх </li>
//               <li>Тоо орсон байх</li>
//               <li>Тэмдэгт орсон байх</li>
//             </ul>
//             <Button type="submit">Үүсгэх</Button>
//             <Link
//               href="/Login"
//               className={` bg-white flex justify-center text-black  border border-blue-700 rounded-2xl bg-primary w-full py-2 px-4`}
//             >
//               Нэвтрэх
//             </Link>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default NewPass;

"use client";

import React, { useContext, useState } from "react";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/utils/validationSchema";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RecoverPass = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      repassword: "",
    },
  });
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("first", values);
  };
  return (
    <div className="flex justify-center items-center w-full heightcalc">
      <div className="w-[334px] ">
        <h1 className="text-2xl font-semibold text-center">Нэвтрэх</h1>
        <div className="flex flex-col gap-4 items-center mb-12 mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="password" {...field} />
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ul className="list-disc">
                <li>Том үсэг орсон байх </li>
                <li>Жижиг үсэг орсон байх </li>
                <li>Тоо орсон байх</li>
                <li>Тэмдэгт орсон байх</li>
              </ul>
              <Button className="w-full" type="submit">
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
