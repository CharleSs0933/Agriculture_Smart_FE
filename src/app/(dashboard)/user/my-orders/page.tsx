"use client";

import { useState, useMemo } from "react";
import { OrderDetailDialog } from "@/components/my-orders/OrderDetailDialog";
import { OrderFilters } from "@/components/my-orders/OrderFilters";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw } from "lucide-react";
import { useCancelOrderMutation, useGetOrdersQuery } from "@/state/api";
import { OrderCard } from "@/components/my-orders/OrderCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";

export default function MyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">(
    "all"
  );
  const [paymentFilter, setPaymentFilter] = useState<
    Order["paymentStatus"] | "all"
  >("all");
  const [searchValue, setSearchValue] = useState("");

  const { data: orders, isLoading, refetch } = useGetOrdersQuery();
  const [cancelOrder] = useCancelOrderMutation();

  const filteredOrders = useMemo(() => {
    return orders
      ? orders.filter((order) => {
          const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;
          const matchesPayment =
            paymentFilter === "all" || order.paymentStatus === paymentFilter;
          const matchesSearch =
            searchValue === "" ||
            order.orderNumber.toLowerCase().includes(searchValue.toLowerCase());

          return matchesStatus && matchesPayment && matchesSearch;
        })
      : [];
  }, [orders, statusFilter, paymentFilter, searchValue]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!orderId) return;
    await cancelOrder(orderId)
      .unwrap()
      .then(() => {
        toast.success("Hủy đơn hàng thành công");
        setDialogOpen(false);
      })
      .catch((error) => {
        console.log("Failed to cancel order:", error);
      });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full sm:w-48" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </div>

        {/* Order Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <Skeleton className="h-12 w-12 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-8 w-8" />
              Đơn hàng của tôi
            </h1>
            <p className="text-gray-600 mt-2">
              Quản lý và theo dõi tất cả đơn hàng của bạn
            </p>
          </div>
          <Button
            variant="outline"
            onClick={refetch}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Làm mới
          </Button>
        </div>
      </div>

      {/* Filters */}
      <OrderFilters
        onStatusFilter={setStatusFilter}
        onPaymentFilter={setPaymentFilter}
        onSearchChange={setSearchValue}
        searchValue={searchValue}
      />

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchValue || statusFilter !== "all" || paymentFilter !== "all"
              ? "Không tìm thấy đơn hàng nào"
              : "Chưa có đơn hàng nào"}
          </h3>
          <p className="text-gray-500">
            {searchValue || statusFilter !== "all" || paymentFilter !== "all"
              ? "Thử thay đổi bộ lọc để xem thêm đơn hàng"
              : "Hãy đặt hàng để xem đơn hàng của bạn tại đây"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Order Detail Dialog */}
      <OrderDetailDialog
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
}
