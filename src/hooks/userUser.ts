"use client";

import {
  useLazyGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/state/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
          Cookies.remove("token");
          Cookies.remove("role");
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
        Cookies.set("token", res.token, {
          // Set token in cookies with 1 hours expiration
          expires: 1 / 24, // 1 hour
          secure: false,
          sameSite: "strict",
        });
        Cookies.set("role", res.role, {
          // Set role in cookies with 1 hours expiration
          expires: 1 / 24, // 1 hour
          secure: false,
          sameSite: "strict",
        });
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
        Cookies.remove("token");
        Cookies.remove("role");
        router.push("/login");
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
  };
};
