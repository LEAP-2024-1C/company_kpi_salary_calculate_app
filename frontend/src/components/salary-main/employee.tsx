import { useUser } from "@/context/user-provider";
import React from "react";

const Employee = () => {
  //   const { user } = useUser();
  return (
    <div className="w-[300px] h-[400px] bg-gray-200 rounded-xl p-5">
      <div
        className="w-[100px] h-[100px] rounded-lg"
        style={{
          //   backgroundImage: `url(${user?.profile_img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Employee;
