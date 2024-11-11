// "use client";

// import { apiUrl } from "@/lib/utils";
// import { SavedTasks } from "@/utils/interfaces";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const SalaryCalculator = () => {
//   const [cartData, setCartData] = useState<SavedTasks>();
//   //   [
//   //   {
//   //     products: [
//   //       {
//   //         product_id: "",
//   //         productName: "",
//   //         description: "",
//   //         images: [""],
//   //         quantity: 0,
//   //         status: 0,
//   //         components: [
//   //           {
//   //             _id: "",
//   //             categoryName: "",
//   //             procedures: [
//   //               {
//   //                 _id: "",
//   //                 taskName: "",
//   //                 quantity: 0,
//   //                 status: { pending: 0, progress: 0, done: 0, review: 0 },
//   //                 unitPrice: 0,
//   //               },
//   //             ],
//   //           },
//   //         ],
//   //       },
//   //     ],
//   //   },
//   // ]
//   const getCartData = async () => {
//     try {
//       const userToken = localStorage.getItem("token");
//       // console.log("User Token:", userToken);
//       const response = await axios.get(`${apiUrl}get-savedTaks`, {
//         headers: { Authorization: `Bearer ${userToken}` },
//       });
//       console.log("response:", response);
//       if (response.status === 200) {
//         console.log("Saved Tasks Data:", response.data.cart);
//         setCartData(response.data.cart);
//       }
//     } catch (error) {
//       console.error("Error fetching data:");
//       toast.error("Failed to fetch saved tasks");
//     }
//   };
//   useEffect(() => {
//     getCartData();
//   }, []);
//   console.log("cartData", cartData);
//   return (
//     <div className="flex flex-col gap-5">
//       {/* {cartData?.products.map((c) => {})} */}

//       <div className="text-black"></div>
//     </div>
//   );
// };

// export default SalaryCalculator;
