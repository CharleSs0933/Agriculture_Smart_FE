"use client";

import { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Loader2, Edit, Ban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDetailModal } from "@/components/admin/order-detail-modal";
import { OrderStatusDialog } from "@/components/admin/order-status-dialog";
import { useCancelOrderMutation, useGetOrdersQuery } from "@/state/apiAdmin";
import { OrderFilters } from "@/components/admin/order-filters";
import { Pagination } from "@/components/Pagination";
import { toast } from "sonner";

export default function AdminOrders() {
  const [filters, setFilters] = useState<OrdersQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    status: undefined,
    paymentStatus: undefined,
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const { data: ordersData, isLoading, error } = useGetOrdersQuery(filters);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const handleFilterChange = useCallback(
    (newFilters: Partial<OrdersQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, pageNumber: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusDialogOpen(true);
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!orderId) return;
    await cancelOrder(orderId)
      .unwrap()
      .then(() => {
        toast.success("Hủy đơn hàng thành công");
      })
      .catch((error) => {
        console.log("Failed to cancel order:", error);
      });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đã gửi hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "bank_transfer":
        return "Chuyển khoản ngân hàng";
      case "wallet":
        return "Ví điện tử";
      default:
        return method;
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán";
      case "paid":
        return "Đã thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return status;
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "paid":
        return "default";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Chưa có";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý đơn hàng
          </h1>
          <p className="text-muted-foreground">
            Theo dõi và xử lý các đơn hàng
          </p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-red-500">Không thể tải danh sách đơn hàng</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý đơn hàng</h1>
        <p className="text-muted-foreground">Theo dõi và xử lý các đơn hàng</p>
      </div>
      {/* 
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">Tổng số đơn hàng</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ xử lý</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Cần xử lý ngay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã giao hàng</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === "delivered").length}
            </div>
            <p className="text-xs text-muted-foreground">Hoàn thành</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                orders.reduce((sum, order) => sum + order.totalAmount, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">Tổng doanh thu</p>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Quản lý và theo dõi trạng thái đơn hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <OrderFilters
              currentFilters={filters}
              onFilterChange={handleFilterChange}
            />

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : ordersData && ordersData.items.length > 0 ? (
              <div className="space-y-4">
                {ordersData.items.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{order.orderNumber}</h3>
                        <Badge variant={getStatusVariant(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                        <Badge
                          variant={getPaymentStatusVariant(order.paymentStatus)}
                        >
                          {getPaymentStatusLabel(order.paymentStatus)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium">Khách hàng:</span>{" "}
                          {order.userName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {order.userEmail}
                        </p>
                        <p>
                          <span className="font-medium">Số lượng:</span>{" "}
                          {order.totalItems} sản phẩm
                        </p>
                        <p>
                          <span className="font-medium">Thanh toán:</span>{" "}
                          {getPaymentMethodLabel(order.paymentMethod)}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {order.shippingAddress}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-lg">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tạo: {formatDate(order.createdAt)}
                      </p>
                      {order.paidAt && (
                        <p className="text-sm text-green-600">
                          Thanh toán: {formatDate(order.paidAt)}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(order)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUpdateStatus(order)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Cập nhật trạng thái
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={
                            order.status === "cancelled" ||
                            order.status === "delivered" ||
                            isCancelling
                          }
                          className="text-red-600"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Hủy đơn hàng
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Không tìm thấy đơn hàng nào
                </p>
              </div>
            )}

            {ordersData && ordersData.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={ordersData.pageNumber}
                  onPageChange={handlePageChange}
                  totalPages={ordersData.totalPages}
                  hasNextPage={ordersData.hasNextPage}
                  hasPreviousPage={ordersData.hasPreviousPage}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
      />

      <OrderStatusDialog
        order={selectedOrder}
        isOpen={isStatusDialogOpen}
        onClose={() => {
          setIsStatusDialogOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}
