"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
} from "@/state/apiAdmin";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OrderStatusDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderStatusDialog({
  order,
  isOpen,
  onClose,
}: OrderStatusDialogProps) {
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [updateOrderStatus, { isLoading: isUpdatingOrder }] =
    useUpdateOrderStatusMutation();
  const [updatePaymentStatus, { isLoading: isUpdatingPayment }] =
    useUpdatePaymentStatusMutation();

  const isLoading = isUpdatingOrder || isUpdatingPayment;

  const orderStatusOptions = [
    { value: "pending", label: "Chờ xử lý" },
    { value: "processing", label: "Đang xử lý" },
    { value: "shipped", label: "Đã gửi hàng" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const paymentStatusOptions = [
    { value: "pending", label: "Chờ thanh toán" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "failed", label: "Thanh toán thất bại" },
  ];

  const handleSubmit = async () => {
    if (!order) return;

    try {
      const promises = [];

      if (orderStatus && orderStatus !== order.status) {
        promises.push(
          updateOrderStatus({ id: order.id, status: orderStatus }).unwrap()
        );
      }

      if (paymentStatus && paymentStatus !== order.paymentStatus) {
        promises.push(
          updatePaymentStatus({ id: order.id, paymentStatus }).unwrap()
        );
      }

      if (promises.length === 0) {
        toast.info("Không có thay đổi nào để cập nhật");
        return;
      }

      await Promise.all(promises);

      toast.success("Cập nhật trạng thái đơn hàng thành công");

      onClose();
    } catch (error) {
      console.log(error);

      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOrderStatus("");
      setPaymentStatus("");
      onClose();
    }
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Mã đơn hàng</Label>
            <p className="text-sm font-medium">{order.orderNumber}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order-status">Trạng thái đơn hàng</Label>
            <Select
              value={orderStatus || order.status}
              onValueChange={setOrderStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái đơn hàng" />
              </SelectTrigger>
              <SelectContent>
                {orderStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-status">Trạng thái thanh toán</Label>
            <Select
              value={paymentStatus || order.paymentStatus}
              onValueChange={setPaymentStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái thanh toán" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
