"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface OrderFiltersProps {
  onStatusFilter: (status: Order["status"] | "all") => void;
  onPaymentFilter: (status: Order["paymentStatus"] | "all") => void;
  onSearchChange: (search: string) => void;
  searchValue: string;
}

export function OrderFilters({
  onStatusFilter,
  onPaymentFilter,
  onSearchChange,
  searchValue,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Tìm kiếm theo mã đơn hàng..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select
        onValueChange={(value) =>
          onStatusFilter(value as Order["status"] | "all")
        }
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Trạng thái đơn hàng" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="pending">Chờ xử lý</SelectItem>
          <SelectItem value="processing">Đang xử lý</SelectItem>
          <SelectItem value="shipped">Đang giao</SelectItem>
          <SelectItem value="delivered">Đã giao</SelectItem>
          <SelectItem value="cancelled">Đã hủy</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          onPaymentFilter(value as Order["paymentStatus"] | "all")
        }
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Trạng thái thanh toán" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả thanh toán</SelectItem>
          <SelectItem value="pending">Chờ thanh toán</SelectItem>
          <SelectItem value="paid">Đã thanh toán</SelectItem>
          <SelectItem value="failed">Thất bại</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
