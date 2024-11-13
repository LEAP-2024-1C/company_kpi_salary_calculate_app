"use client";

import { apiUrl } from "@/lib/utils";
import axios from "axios";
import React, {
  useContext,
  useState,
  createContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";

interface IEmployee {
  _id: string;
  email: string;
  profile_img: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

interface IContext {
  user: IEmployee | null;
  setUser: Dispatch<SetStateAction<IEmployee | null>>;
  loading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
}

export const UserContext = createContext<IContext>({
  user: null,
  setUser: () => {},
  loading: true,
  setIsLoggedIn: () => false,
  setRefresh: () => {},
  refresh: false,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IEmployee | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getCurrentUser = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        const response = await axios.get(`${apiUrl}auth/get-employee`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        if (response.status === 200) {
          const { user } = response.data;
          setUser(user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [loggedIn]);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setIsLoggedIn, setRefresh, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
