"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, Package, Star, TrendingUp, Edit } from "lucide-react";
import Image from "next/image";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onEdit: (product: Product) => void;
}

export function ProductDetailModal({
  open,
  onOpenChange,
  product,
  onEdit,
}: ProductDetailModalProps) {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = () => {
    if (!product.isActive) {
      return <Badge variant="destructive">Ngừng bán</Badge>;
    }
    if (product.stock === 0) {
      return <Badge variant="secondary">Hết hàng</Badge>;
    }
    if (product.stock < 10) {
      return <Badge variant="outline">Sắp hết</Badge>;
    }
    return <Badge variant="default">Còn hàng</Badge>;
  };

  const discount =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Sửa đổi className của DialogContent */}
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          {/* Sửa đổi flexbox cho tiêu đề và nút */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
            <DialogTitle className="text-2xl break-words">
              {product.name}
            </DialogTitle>
            <div className="flex gap-2 flex-wrap justify-start sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="whitespace-nowrap"
              >
                <Edit className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="sm:inline">Chỉnh sửa</span>{" "}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <Card className="p-0">
            <CardContent className="p-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {discount > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 text-white">
                      -{discount}%
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category.name}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(product.discountPrice || product.price)}
                </span>
                {discount > 0 && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600">
                  Tiết kiệm {formatPrice(product.price - product.discountPrice)}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Trạng thái:</span>
              {getStatusBadge()}
            </div>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} đánh giá)
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Thông tin sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between flex-wrap gap-x-4">
                {" "}
                {/* Thêm flex-wrap */}
                <span className="text-muted-foreground">SKU:</span>
                <code className="bg-muted px-2 py-1 rounded text-sm break-all">
                  {" "}
                  {/* Thêm break-all */}
                  {product.sku}
                </code>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Danh mục:</span>
                <span className="font-medium text-right">
                  {product.category.name}
                </span>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Tồn kho:</span>
                <span
                  className={`font-medium text-right ${
                    product.stock < 10
                      ? "text-orange-600"
                      : product.stock === 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {product.stock} sản phẩm
                </span>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Giá gốc:</span>
                <span className="font-medium text-right">
                  {formatPrice(product.price)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between flex-wrap gap-x-4">
                  <span className="text-muted-foreground">Giá khuyến mãi:</span>
                  <span className="font-medium text-green-600 text-right">
                    {formatPrice(product.discountPrice)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Thông tin thời gian
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Ngày tạo:</span>
                <span className="font-medium text-right">
                  {formatDate(product.createdAt)}
                </span>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Cập nhật:</span>
                <span className="font-medium text-right">
                  {formatDate(product.updatedAt)}
                </span>
              </div>
              <div className="flex justify-between flex-wrap gap-x-4">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span
                  className={`font-medium text-right ${
                    product.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.isActive ? "Đang bán" : "Ngừng bán"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        {product.rating > 0 && (
          <>
            <Separator />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Thống kê
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {" "}
                  {/* Đảm bảo 2 cột trên sm */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {product.rating}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Đánh giá
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {product.reviews}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lượt đánh giá
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {product.stock}
                    </div>
                    <div className="text-sm text-muted-foreground">Tồn kho</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {discount}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Giảm giá
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
