"use client";

import type React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import { useDeleteItemMutation, useUpdateQuantityMutation } from "@/state/api";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [updateQuantity, { isLoading: isUpdating }] =
    useUpdateQuantityMutation();
  const [removeItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      await updateQuantity({ id: item.id, quantity: value }).unwrap();
    }
  };

  const incrementQuantity = async () => {
    await updateQuantity({ id: item.id, quantity: item.quantity + 1 }).unwrap();
  };

  const decrementQuantity = async () => {
    if (item.quantity > 1) {
      await updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      }).unwrap();
    }
  };

  const handleRemove = async () => {
    await removeItem(item.id).unwrap();
  };

  const { product } = item;

  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-20 h-20 relative flex-shrink-0">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="ml-4 flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">
          {product.category?.name || "Category"}
        </p>
        <p className="font-semibold mt-1">{formatCurrency(item.unitPrice)}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={decrementQuantity}
            disabled={item.quantity <= 1 || isUpdating}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="h-8 w-12 text-center rounded-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={incrementQuantity}
            disabled={item.quantity >= product.stock || isUpdating}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          disabled={isUpdating || isDeleting}
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="ml-4 text-right w-24">
        <p className="font-semibold">{formatCurrency(item.totalPrice)}</p>
      </div>
    </div>
  );
}
