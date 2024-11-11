"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

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
    console.log("1");
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
      });

      if (res.status === 201) {
        toast.success("User successfully signed up", { autoClose: 1000 });
        router.push("/login");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      toast.error("Failed to sign up. Please try again.");
    }
    console.log("2");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl	font-semibold	">Бүртгүүлэх</h2>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Нэр"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          value={userData.firstname}
          onChange={(e) =>
            setUserData({ ...userData, firstname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Овог"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          value={userData.lastname}
          onChange={(e) =>
            setUserData({ ...userData, lastname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Имэйл хаяг"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Нууц үг"
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Нууц үг давтах "
          className="w-[334px] h-[36px] bg-[#FFFFFF] rounded-[18px] pl-4 border"
          value={userData.repassword}
          onChange={(e) =>
            setUserData({ ...userData, repassword: e.target.value })
          }
        />
        <div className="text-[#71717A] text-sm">
          <li>Том үсэг орсон байх</li>
          <li>Жижиг үсэг орсон байх</li>
          <li>Тоо орсон байх</li>
          <li>Тэмдэгт орсон байх</li>
        </div>

        <button
          className="btn bg-[#0166FF] text-white rounded-[20px] w-[334px] h-[36px] "
          onClick={signUp}
        >
          Үүсгэх
        </button>
        <Link href="/login">
          <button className="btn text-[#0166FF] bg-[#FFFFFF] border rounded-[20px] w-[334px] h-[36px] ">
            Нэвтрэх
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
