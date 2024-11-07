"use client";

import { useUser } from "@/context/user-provider";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserInfo = () => {
  const router = useRouter();
  const { user } = useUser();
  const { id } = useParams();
  const edit = () => {
    router.push("/edit-profile");
  };
  return (
    <div className="w-full h-full flex flex-col items-center p-40 gap-16">
      <div className="font-semibold text-2xl text-gray-800 mb-5 flex gap-5 items-center">
        <p>Ажилтны хувийн мэдээлэл</p>
        <div onClick={edit}>
          <FaRegEdit />
        </div>
      </div>
      <div className="flex gap-16 ">
        <div
          className="rounded-xl w-[400px] h-[300px]"
          style={{
            backgroundColor: "gray",
            backgroundImage: `url('${user?.profile_img}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Нэр</TableCell>
              <TableCell>{user?.firstName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Овог</TableCell>
              <TableCell>{user?.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Мэйл хаяг</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Утасны дугаар</TableCell>
              <TableCell>{user?.phoneNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* <div className="font-bold">
          <div>Нэр: {user?.firstName}</div>
          <div>Овог: {user?.lastName}</div>
          <div>Мэйл хаяг:{user?.email}</div>
          <div>Утасны дугаар: {user?.phoneNumber}</div>
        </div> */}
      </div>
    </div>
  );
};

export default UserInfo;
