"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

const NewPass = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [repassword, setRePassword] = useState("");
  const params = useSearchParams();

  const handleNewPassword = async () => {
    if (!(password === repassword)) {
      console.log("Clicked not match");
      toast({
        title: "Алдаа",
        description: "Нууц үг хоорондоо таарахгүй байна",
      });
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/verify-password`,
        {
          password: password,
          resetToken: params.get("resettoken"),
        }
      );
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log("first", error);
    }
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100">
      <div className=" flex flex-col h-screen gap-10 justify-center">
        <h1 className="flex justify-center"> Нууц үг сэргээх</h1>
        <input
          type="text"
          placeholder="Шинэ нууц үг"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Шинэ нууц үг давтах"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          onChange={(e) => setRePassword(e.target.value)}
        />
        <div className="text-[#71717A] text-sm">
          <li>Том үсэг орсон байх</li>
          <li>Жижиг үсэг орсон байх</li>
          <li>Тоо орсон байх</li>
          <li>Тэмдэгт орсон байх</li>
        </div>
        <Button
          className="btn bg-[#0166FF] text-white rounded-[20px] w-[334px] h-[36px] "
          onClick={handleNewPassword}
        >
          Button
        </Button>
      </div>
    </div>
  );
};

export default NewPass;
