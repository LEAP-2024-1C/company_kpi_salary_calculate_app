// "use client";

// import React, {
//   createContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useContext,
// } from "react";
// import axios from "axios";
// import { ITask } from "@/utils/interfaces";
// import { apiUrl } from "@/lib/utils";

// interface ITaskTracker {
//   products: ITask[] | undefined;
//   loading: boolean;
//   error: string | null;
//   getProduct: (id: string) => Promise<void>;
// }

// export const TaskTrackerContext = createContext<ITask | undefined>(undefined);

// export const ProductProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//     const [completedTasks, setCompletedTasks] = useState(0);

//     const completeTask = () => {
//       if (completedTasks < totalTasks) {
//         setCompletedTasks(completedTasks + 1);
//       }
//     };

//     const getDotColor = () => {
//       const percentageCompleted = completedTasks / totalTasks;

//       if (percentageCompleted === 1) return "green";
//       if (percentageCompleted >= 0.5) return "orange";
//       return "red";
//     };
//   useEffect(() => {}, []);

//   return (
//     <TaskTrackerContext.Provider value={{ tasks, oneProduct, getProduct }}>
//       {children}
//     </TaskTrackerContext.Provider>
//   );
// };

// export const useTaskTracker = () => {
//   return useContext(TaskTrackerContext);
// };
