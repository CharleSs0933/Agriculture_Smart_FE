"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersFilterProps {
  onFilterChange: (filters: OrdersQueryParams) => void;
  currentFilters: OrdersQueryParams;
}

export function OrderFilters({
  currentFilters,
  onFilterChange,
}: OrdersFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState(
    currentFilters.status || undefined
  );
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(
    currentFilters.paymentStatus || undefined
  );

  useEffect(() => {
    onFilterChange({
      paymentStatus: selectedPaymentStatus,
      status: selectedStatus,
      pageNumber: 1, // Reset to first page when filters change
    });
  }, [selectedPaymentStatus, selectedStatus, onFilterChange]);

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "pending", label: "Chờ xử lý" },
    { value: "processing", label: "Đang xử lý" },
    { value: "shipped", label: "Đã gửi hàng" },
    { value: "delivered", label: "Đã giao hàng" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const paymentStatusOptions = [
    { value: "all", label: "Tất cả trạng thái thanh toán" },
    { value: "pending", label: "Chờ thanh toán" },
    { value: "paid", label: "Đã thanh toán" },
    { value: "failed", label: "Thanh toán thất bại" },
  ];

  const handleStatusChange = (
    status:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled"
      | undefined
  ) => {
    setSelectedStatus(status);
  };

  const handlePaymentStatusChange = (
    paymentStatus: "pending" | "paid" | "failed" | undefined
  ) => {
    setSelectedPaymentStatus(paymentStatus);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm ticket"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div> */}
      </div>

      <div className="flex flex-wrap gap-4">
        <Select
          value={selectedStatus ? selectedStatus : "all"}
          onValueChange={(value) => {
            handleStatusChange(
              value === "all"
                ? undefined
                : (value as
                    | "pending"
                    | "processing"
                    | "shipped"
                    | "delivered"
                    | "cancelled")
            );
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPaymentStatus ? selectedPaymentStatus : "all"}
          onValueChange={(value) => {
            handlePaymentStatusChange(
              value === "all"
                ? undefined
                : (value as "pending" | "paid" | "failed")
            );
          }}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Độ ưu tiên" />
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
  );
}
