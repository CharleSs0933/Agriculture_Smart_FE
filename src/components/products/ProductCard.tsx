"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { ProductDetailDialog } from "./ProductDetailDialog";
import { useAddToCartMutation } from "@/state/api";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [addItem, { isLoading }] = useAddToCartMutation();

  const hasDiscount =
    product.discountPrice !== null &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice! : product.price;
  const originalPrice = hasDiscount ? product.price : undefined;

  const discount = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice!) / product.price) * 100
      )
    : 0;

  const handleAddToCart = async () => {
    await addItem({ productId: product.id, quantity: 1 })
      .unwrap()
      .then(() => {
        toast.success("Đã thêm vào giỏ hàng");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card
        className={`overflow-hidden h-full ${
          featured ? "border-green-200" : ""
        }`}
      >
        <div className="relative">
          <button onClick={() => setShowDetail(true)} className="w-full">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain transition-transform hover:scale-105"
              />
            </div>
          </button>

          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              -{discount}%
            </Badge>
          )}

          {featured && (
            <Badge className="absolute top-2 right-2 bg-green-600">
              Nổi bật
            </Badge>
          )}

          {!(product.stock > 0 && product.isActive) && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge
                variant="outline"
                className="bg-white text-black font-semibold"
              >
                Hết hàng
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex flex-col">
          <Badge variant="outline" className="mb-2">
            {product.category.name}
          </Badge>
          <button
            onClick={() => setShowDetail(true)}
            className="hover:underline text-left"
          >
            <h3 className="font-semibold text-lg mb-1 line-clamp-2">
              {product.name}
            </h3>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatCurrency(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!(product.stock > 0 && product.isActive) || isLoading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? "Đang tạo đơn hàng..." : "Thêm với giỏ hàng"}
          </Button>
        </CardFooter>
      </Card>

      <ProductDetailDialog
        product={product}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
}
