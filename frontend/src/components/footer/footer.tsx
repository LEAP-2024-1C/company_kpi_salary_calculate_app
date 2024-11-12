import React from "react";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-teal-700  p-10 border-t">
      <div className=" flex justify-between p-5 mb-[50px] mx-[100px]">
        <img src="./images/homeLogo.png" alt="" className="" />
        <div className=" flex gap-8">
          <div className="flex text-gray-200 items-center gap-4">
            <div className="p-2 border border-gray-700 rounded-full flex items-center justify-center">
              <FiPhone className=" text-white" />
            </div>
            <p>(976) 7000-0000</p>
          </div>
          <div className="flex text-gray-200 items-center gap-4">
            <div className="p-2 border border-gray-700 rounded-full flex items-center justify-center">
              <IoMailOutline className=" text-white" />
            </div>
            <p>company@kpi.mn</p>
          </div>
        </div>
      </div>
      <div className="text-gray-200 p-5 border-t border-gray-600 mx-[100px] ">
        <div className="mt-[50px]  flex items-center justify-between">
          {" "}
          <p>© 2024 Company KPI</p>
          <ul className="text-gray-200 flex gap-5">
            <li>
              <FaFacebook />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaTwitter />
            </li>
            <li>
              <FaLinkedin />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
