'use client';

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  Dispatch
} from 'react';
import axios from 'axios';

interface IContext {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

export const AdminContext = createContext<IContext>({
  setRefresh: () => {},
  refresh: true
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [refresh, setRefresh] = useState<boolean>(true);

  return (
    <AdminContext.Provider value={{ setRefresh, refresh }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(AdminContext);
};
