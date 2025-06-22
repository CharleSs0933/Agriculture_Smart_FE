"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { Package, Calendar, MapPin, Eye } from "lucide-react";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">#{order.orderNumber}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatDate(order.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">
              {order.totalItems} sản phẩm
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {order.orderItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <div className="relative w-12 h-12">
                  <Image
                    src={item.product.imageUrl || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>
            ))}
            {order.orderItems.length > 3 && (
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  +{order.orderItems.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600 line-clamp-2">
            {order.shippingAddress}
          </span>
        </div>

        {/* Order Total and Actions */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div>
            <span className="text-sm text-gray-500">Tổng cộng:</span>
            <p className="font-bold text-lg text-green-600">
              {formatCurrency(order.totalAmount)}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
