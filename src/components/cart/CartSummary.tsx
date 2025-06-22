"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function CartSummary({ cart }: { cart: Cart }) {
  const router = useRouter();

  // Calculate additional costs
  const subtotal = cart?.totalAmount || 0;
  // const shipping = subtotal > 500000 ? 0 : 30000;
  // const tax = subtotal * 0.1;
  // const total = subtotal + shipping + tax;
  const total = subtotal;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Tóm tắt đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Số lượng sản phẩm:</span>
          <span>{cart.cartItems.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Tạm tính:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {/* <div className="flex justify-between">
          <span className="text-gray-500">Thuế (10%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Phí vận chuyển:</span>
          {shipping === 0 ? (
            <span className="text-green-600">Miễn phí</span>
          ) : (
            <span>{formatCurrency(shipping)}</span>
          )}
        </div>

        {shipping > 0 && (
          <div className="text-xs text-gray-500">
            Miễn phí vận chuyển cho đơn hàng trên {formatCurrency(500000)}
          </div>
        )} */}

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Tổng cộng:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/checkout")}
          disabled={cart.cartItems.length === 0}
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Tiến hành thanh toán
        </Button>
      </CardFooter>
    </Card>
  );
}
