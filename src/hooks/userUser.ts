"use client";

import {
  useLazyGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/state/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [getMeQuery, { isLoading }] = useLazyGetMeQuery();

  useEffect(() => {
    // Check for user in local storage or cookies on initial load
    const fetchUser = async () => {
      await getMeQuery()
        .unwrap()
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        });
    };

    fetchUser();
  }, [user, getMeQuery]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await loginMutation({ username, password })
      .unwrap()
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: res.username,
            email: res.email,
            role: res.role,
          })
        );
        localStorage.setItem("token", res.token);
        if (res.role === "Admin") router.push("/admin");
        if (res.role === "Farmer") router.push("/");
        toast.success("Login successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async () => {
    await logoutMutation()
      .unwrap()
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = async ({
    username,
    email,
    password,
    address,
    phoneNumber,
  }: {
    username: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
  }) => {
    await registerMutation({
      username,
      email,
      password,
      address,
      phoneNumber,
    })
      .unwrap()
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    router.push("/login");
  };

  const isLogged = !!user;

  return {
    user,
    isLoading,
    isLogged,
    login,
    isLoginLoading,
    logout,
    isLogoutLoading,
    register,
    isRegisterLoading,
    clearUser,
  };
};
