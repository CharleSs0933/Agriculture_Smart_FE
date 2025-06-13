"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { CartItemRow } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <div className="px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-gray-900">Giỏ hàng</span>
      </nav>

      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tiếp tục mua sắm
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-6">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/products">Khám phá sản phẩm</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Sản phẩm trong giỏ ({items.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Xóa tất cả
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
