"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/lib/utils";
import { ISavedTasks, ISavedProduct } from "@/utils/interfaces";

interface CartContext {
  cartData: ISavedTasks | null;
  isLoading: boolean;
  refreshData: () => void;
  updateComponentStatus: (
    component_id: string,
    task_id: string,
    assign: number,
    product_id: string
  ) => Promise<void>;
  calculateProductTotal: (product: ISavedProduct) => number;
}

const CartContext = createContext<CartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartData, setCartData] = useState<ISavedTasks | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getCartData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}savedTask`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        const data = response.data.cart;
        setCartData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch saved tasks");
    }
  };

  const updateComponentStatus = async (
    component_id: string,
    task_id: string,
    assign: number,
    product_id: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      const res = await axios.put(
        `${apiUrl}comp/update/status/employee`,
        {
          compStatus: {
            product_id,
            component_id,
            task_id,
            assign,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setRefresh((prev) => !prev);
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProductTotal = (product: ISavedProduct): number => {
    return product.components.reduce((productTotal, component) => {
      const componentTotal = component.procedures.reduce((sum, procedure) => {
        return (
          sum +
          procedure.unitPrice * procedure.status.assign * procedure.quantity
        );
      }, 0);
      return productTotal + componentTotal;
    }, 0);
  };

  const refreshData = () => setRefresh((prev) => !prev);

  useEffect(() => {
    getCartData();
  }, [refresh]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        isLoading,
        refreshData,
        updateComponentStatus,
        calculateProductTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
