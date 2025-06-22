"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
      <p className="text-gray-600 mb-6 max-w-md">Cảm ơn bạn đã đặt hàng.</p>
      <Button onClick={() => router.push("/products")}>Tiếp tục mua sắm</Button>
    </div>
  );
};

export default CheckoutSuccessPage;
