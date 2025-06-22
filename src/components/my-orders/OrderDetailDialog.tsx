"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import {
  Package,
  MapPin,
  CreditCard,
  Calendar,
  User,
  Mail,
} from "lucide-react";
import Image from "next/image";

interface OrderDetailDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelOrder?: (orderId: number) => void;
}

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
  onCancelOrder,
}: OrderDetailDialogProps) {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Chưa có";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentMethodLabel = (method: Order["paymentMethod"]) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "bank_transfer":
        return "Chuyển khoản ngân hàng";
      case "wallet":
        return "Ví điện tử";
      default:
        return "Không xác định";
    }
  };

  const canCancelOrder = order.status === "pending" && onCancelOrder;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Chi tiết đơn hàng #{order.orderNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex flex-wrap items-center gap-4">
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
            {canCancelOrder && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancelOrder(order.id)}
              >
                Hủy đơn hàng
              </Button>
            )}
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin đơn hàng</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Ngày đặt: {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Tổng sản phẩm: {order.totalItems}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    Phương thức: {getPaymentMethodLabel(order.paymentMethod)}
                  </span>
                </div>
                {order.paidAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Đã thanh toán: {formatDate(order.paidAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin giao hàng</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{order.userName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{order.userEmail}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="text-sm">{order.shippingAddress}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sản phẩm đã đặt</h3>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.product.name}
                    </h4>

                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm">Số lượng: {item.quantity}</span>
                      <span className="text-sm">
                        Đơn giá: {formatCurrency(item.unitPrice)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Tổng cộng:</span>
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
