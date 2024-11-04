"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import { IComponents, IProduct, IProductStat } from "@/utils/interfaces";
import { apiUrl } from "@/lib/utils";

interface IContext {
  products: IProduct[] | null;
  // oneProduct: IComponents[] | null;
  // getProduct: (id: string) => Promise<void>;
  productStat: IProductStat[] | null;
}

export const ProductContext = createContext<IContext>({
  products: null,
  // oneProduct: null,
  // getProduct:(id: string) => void
  productStat: null,
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  // const [oneProduct, setOneProduct] = useState<IProduct[]>([]);
  const [productStat, setProductStat] = useState<IProductStat[] | null>(null);

  const getAllProducts = async () => {
    const userToken = localStorage.getItem("token");

    const response = await axios.get(`${apiUrl}product/stat/employee`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const products = response.data.products;
    setProducts(products);
    console.log("products", products);
    const productStat = response.data.productStat;
    setProductStat(productStat);
    console.log("productStat", productStat);
  };
  // const getProduct = async (id: string) => {
  //   try {
  //     const response = await axios.get(`${apiUrl}pro/product/${id}`);
  //     setOneProduct(response.data.product);
  //   } catch (err) {
  //     console.log("Failed to fetch product");
  //   }
  // };

  useEffect(() => {
    getAllProducts();
    // getProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products, productStat }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
