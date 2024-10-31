// "use client";

// import React, {
//   createContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useContext,
// } from "react";
// import axios from "axios";
// import { IComponents, IProduct } from "@/utils/interfaces";
// import { apiUrl } from "@/lib/utils";

// interface IContext {
//   tasks: IComponents[] | null;
//   // loading: boolean;
//   // error: string | null;
//   // oneProduct: IComponents[] | null;
// }

// export const TaskContext = createContext<IContext>({
//   tasks: null,
//   // oneProduct: null,
// });

// export const ProductProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [tasks, setTasks] = useState<IComponents[] | null>(null);
//   // const [oneProduct, setOneProduct] = useState<IProduct[]>([]);

//   const getAllTasks = async (_id: string) => {
//     const userToken = localStorage.getItem("token");

//     const response = await axios.get(`${apiUrl}pro/product/${_id}`, {
//       headers: { Authorization: `Bearer ${userToken}` },
//     });
//     const tasks = response.data.tasks;
//     setTasks(tasks);
//     console.log("task", tasks);
//   };

//   useEffect(() => {
//     // getAllTasks();
//     // getProduct();
//   }, []);

//   return (
//     <TaskContext.Provider value={{ tasks }}>{children}</TaskContext.Provider>
//   );
// };

// export const useTasks = () => {
//   return useContext(TaskContext);
// };
