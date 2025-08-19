"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutCancelPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <X className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Thanh toán thất bại!</h2>
      <Button onClick={() => router.push("/products")}>Tiếp tục mua sắm</Button>
    </div>
  );
};

export default CheckoutCancelPage;
