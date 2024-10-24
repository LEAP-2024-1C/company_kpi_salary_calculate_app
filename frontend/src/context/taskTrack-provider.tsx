"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

interface ITaskTracker {
  products: ITask[] | undefined;
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Promise<void>;
}

export const TaskTrackerContext = createContext<ITask | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [oneProduct, setOneProduct] = useState<IProduct[]>([]);

  const getAllProducts = async () => {
    const response = await axios.get(`${apiUrl}/api/v1/product`);
    setProducts(response.data.products);
  };
  const getProduct = async (id: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product/${id}`);
      setOneProduct(response.data.product);
    } catch (err) {
      console.log("Failed to fetch product");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <TaskTrackerContext.Provider value={{ products, oneProduct, getProduct }}>
      {children}
    </TaskTrackerContext.Provider>
  );
};

export const useTaskTracker = () => {
  return useContext(TaskTrackerContext);
};
