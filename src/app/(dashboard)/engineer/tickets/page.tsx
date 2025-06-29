"use client";

import { TicketDetailDialog } from "@/components/engineer/ticket-detail-dialog";
import { TicketFilters } from "@/components/my-tickets/TicketFilters";
import { TicketStats } from "@/components/my-tickets/TicketStats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTicketByEngineerQuery } from "@/state/apiAdmin";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  User,
  UserPlus,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface TicketFiltersType {
  status: string;
  priority: string;
  category: string;
  search: string;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "open":
      return <AlertTriangle className="h-4 w-4" />;
    case "assigned":
      return <UserPlus className="h-4 w-4" />;
    case "in_progress":
      return <Clock className="h-4 w-4" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4" />;
    case "closed":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};
const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColors = {
  open: "bg-yellow-100 text-yellow-800",
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const priorityLabels = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
  urgent: "Khẩn cấp",
};

const statusLabels = {
  open: "Mở",
  assigned: "Đã phân công",
  in_progress: "Đang xử lý",
  resolved: "Đã giải quyết",
  closed: "Đã đóng",
};

const Page = () => {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<TicketFiltersType>({
    status: "all",
    priority: "all",
    category: "all",
    search: "",
  });

  const { data: tickets, isLoading } = useGetTicketByEngineerQuery();

  // Apply filters
  useEffect(() => {
    let filtered = tickets || [];

    if (filters.status !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filters.status);
    }

    if (filters.priority !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.priority === filters.priority
      );
    }

    if (filters.category !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.category === filters.category
      );
    }

    if (filters.search) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, filters]);

  const categories = [
    ...new Set(tickets?.map((ticket) => ticket.category) || []),
  ];

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ticket của tôi
          </h1>
          <p className="text-gray-600">
            Quan sát và quản lý các ticket hỗ trợ của bạn
          </p>
        </div>
      </div>

      {/* Stats */}
      <TicketStats
        tickets={tickets || []}
        onStatusFilter={(status) => setFilters((prev) => ({ ...prev, status }))}
      />

      {/* Filters */}
      <TicketFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
      />

      {/* Tickets Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filters.status !== "all" || filters.search
                ? "Không tìm thấy ticket"
                : "Chưa có ticket nào"}
            </h3>
            <p className="text-gray-600 mb-6">
              {filters.status !== "all" || filters.search
                ? "Thử thay đổi bộ lọc để xem thêm ticket khác"
                : "Bạn chưa tạo ticket hỗ trợ nào. Tạo ticket đầu tiên ngay bây giờ!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-1 ">
                    {ticket.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${statusColors[ticket.status]}`}
                  >
                    <StatusIcon status={ticket.status} />
                    <span className="ml-1 capitalize">
                      {statusLabels[ticket.status]}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline">{ticket.category}</Badge>
                  <Badge
                    variant="outline"
                    className={priorityColors[ticket.priority]}
                  >
                    <span className="capitalize">
                      {priorityLabels[ticket.priority]}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {ticket.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{ticket.cropType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{ticket.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </div>

                <TicketDetailDialog
                  ticket={ticket}
                  trigger={
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
