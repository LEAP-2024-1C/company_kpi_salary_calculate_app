"use client";

import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { IProduct, IProductStat } from "@/utils/interfaces";
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
  const [productStat, setProductStat] = useState<IProductStat[] | null>(null);

  const getAllProducts = async () => {
    const userToken = localStorage.getItem("token");

    const response = await axios.get(`${apiUrl}product/stat/employee`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const products = response.data.products;
    setProducts(products);
    const productStat = response.data.productStat;
    setProductStat(productStat);
  };

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
