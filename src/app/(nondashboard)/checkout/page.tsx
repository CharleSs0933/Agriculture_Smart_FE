"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetCartQuery } from "@/state/api";

export default function CheckoutPage() {
  const { data: cart, isLoading } = useGetCartQuery();
  const router = useRouter();

  // Redirect to cart if no items
  useEffect(() => {
    if (!isLoading && (!cart || cart.cartItems.length === 0)) {
      router.push("/cart");
    }
  }, [cart, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin giỏ hàng...</p>
        </div>
      </main>
    );
  }

  // If no cart or empty cart, will redirect (but show nothing while redirecting)
  if (!cart || cart.cartItems.length === 0) {
    return null;
  }

  return (
    <div className=" px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-green-600">
          Giỏ hàng
        </Link>
        <span>/</span>
        <span className="text-gray-900">Thanh toán</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại giỏ hàng
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Thanh toán</h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
