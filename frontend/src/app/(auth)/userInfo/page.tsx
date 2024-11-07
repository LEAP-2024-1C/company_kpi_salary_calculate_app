"use client";

import { useUser } from "@/context/user-provider";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

const UserInfo = () => {
  const router = useRouter();
  const { user } = useUser();
  const { id } = useParams();
  const edit = () => {
    router.push("/edit-profile");
  };
  return (
    <div className="w-full h-full p-5">
      <div className="font-semibold text-2xl text-gray-800 mb-5 flex gap-5">
        <p>Ажилтны хувийн мэдээлэл</p>
        <div onClick={edit}>
          <FaRegEdit />
        </div>
      </div>
      <div className="flex gap-5">
        <div
          className="rounded-xl w-[200px] h-[200px]"
          style={{
            backgroundColor: "gray",
            backgroundImage: `url('${user?.profile_img}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="font-bold">
          <div>Нэр: {user?.firstName}</div>
          <div>Овог: {user?.lastName}</div>
          <div>Майл хаяг:{user?.email}</div>
          <div>Утасны дугаар: {user?.phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
