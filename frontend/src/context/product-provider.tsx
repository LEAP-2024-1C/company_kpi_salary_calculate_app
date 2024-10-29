"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { IProduct } from "@/utils/interfaces";
import { apiUrl } from "@/lib/utils";

interface IContext {
  products: IProduct[] | undefined;
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Promise<void>;
}

export const ProductContext = createContext<IContext | undefined>(undefined);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [oneProduct, setOneProduct] = useState<IProduct[]>([]);

  const getAllProducts = async () => {
    const response = await axios.get(`${apiUrl}product`);
    setProducts(response.data.products);
  };
  const getProduct = async (id: string) => {
    try {
      const response = await axios.get(`${apiUrl}product/${id}`);
      setOneProduct(response.data.product);
    } catch (err) {
      console.log("Failed to fetch product");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, oneProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
