"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, ShoppingCart, Package, Calendar, User } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock reviews data
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      id: 1,
      productId: 1,
      userId: 1,
      userName: "Nguyễn Văn A",
      reviewValue: 5,
      reviewMessage:
        "Phân bón rất tốt, cây trồng phát triển mạnh sau khi sử dụng. Sẽ mua lại!",
      createdAt: "2024-01-15T10:30:00.000Z",
    },
    {
      id: 2,
      userName: "Trần Thị B",
      productId: 1,
      userId: 1,
      reviewValue: 4,
      reviewMessage: "Chất lượng ổn, giá cả hợp lý. Giao hàng nhanh.",
      createdAt: "2024-01-10T14:20:00.000Z",
    },
    {
      id: 3,
      userName: "Lê Văn C",
      productId: 1,
      userId: 1,
      reviewValue: 5,
      reviewMessage: "Đã sử dụng 2 tháng, hiệu quả rất tốt. Khuyên dùng!",
      createdAt: "2024-01-05T09:15:00.000Z",
    },
  ],
  2: [
    {
      id: 4,
      userName: "Phạm Văn D",
      productId: 1,
      userId: 1,
      reviewValue: 4,
      reviewMessage: "Thuốc trừ sâu hiệu quả, an toàn cho môi trường.",
      createdAt: "2024-01-12T16:45:00.000Z",
    },
  ],
  3: [
    {
      id: 5,
      userName: "Hoàng Thị E",
      reviewValue: 5,
      productId: 1,
      userId: 1,
      reviewMessage:
        "Hạt giống chất lượng cao, tỷ lệ nảy mầm 95%. Rất hài lòng!",
      createdAt: "2024-01-08T11:30:00.000Z",
    },
  ],
};

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const { addItem } = useCart();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviews = mockReviews[product.id] || [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
        reviews.length
      : 0;

  const hasDiscount =
    product.discountPrice > 0 && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice : product.price;
  const originalPrice = hasDiscount ? product.price : undefined;

  const discount = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: displayPrice,
      imageUrl: product.imageUrl,
      category: product.category.name,
      sku: product.sku,
    });
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0 || reviewMessage.trim() === "") {
      alert("Vui lòng chọn số sao và viết nhận xét!");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setReviewRating(0);
    setReviewMessage("");
    setShowReviewForm(false);
    setIsSubmitting(false);

    alert("Cảm ơn bạn đã đánh giá sản phẩm!");
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onStarClick?: (rating: number) => void
  ) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
          onClick={
            interactive && onStarClick ? () => onStarClick(i + 1) : undefined
          }
        />
      ));
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.reviewValue - 1]++;
    });
    return distribution.reverse();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category.name}
              </Badge>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-green-600">
                {formatCurrency(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm">SKU: {product.sku}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Kho: {product.stock} sản phẩm</span>
              </div>
            </div>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} đánh giá)
                </span>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              disabled={!(product.stock > 0 && product.isActive)}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 space-y-6">
          {/* Write Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Đánh giá sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showReviewForm ? (
                <Button
                  onClick={() => setShowReviewForm(true)}
                  variant="outline"
                  className="w-full"
                >
                  Viết đánh giá
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Đánh giá của bạn
                    </label>
                    <div className="flex items-center gap-1">
                      {renderStars(reviewRating, true, setReviewRating)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nhận xét
                    </label>
                    <Textarea
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={
                        isSubmitting ||
                        reviewRating === 0 ||
                        reviewMessage.trim() === ""
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false);
                        setReviewRating(0);
                        setReviewMessage("");
                      }}
                      disabled={isSubmitting}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews List */}
          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá từ khách hàng ({reviews.length})</CardTitle>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="flex items-center gap-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({reviews.length} đánh giá)
                    </span>
                  </div>

                  <div className="space-y-1">
                    {getRatingDistribution().map((count, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-8">{5 - index} sao</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width:
                                reviews.length > 0
                                  ? `${(count / reviews.length) * 100}%`
                                  : "0%",
                            }}
                          />
                        </div>
                        <span className="w-8 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {review.userName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {review.userName}
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(review.reviewValue)}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-2">
                            {review.reviewMessage}
                          </p>

                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString(
                              "vi-VN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
