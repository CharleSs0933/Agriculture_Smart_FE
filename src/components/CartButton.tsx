"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";

export function CartButton() {
  const { itemCount } = useCart();
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="relative"
      onClick={() => router.push("/cart")}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Giỏ hàng
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
