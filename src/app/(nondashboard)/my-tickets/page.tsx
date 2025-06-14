"use client";

import { useState, useEffect } from "react";
import { TicketStats } from "@/components/my-tickets/TicketStats";
import { TicketFilters } from "@/components/my-tickets/TicketFilters";
import { TicketDetailDialog } from "@/components/my-tickets/TicketDetailDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  MapPin,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/userUser";
import { useGetTicketsQuery } from "@/state/api";

interface TicketFiltersType {
  status: string;
  priority: string;
  category: string;
  search: string;
}

export default function MyTicketsPage() {
  const { user } = useUser();
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState<TicketFiltersType>({
    status: "all",
    priority: "all",
    category: "all",
    search: "",
  });

  const { data: tickets, isLoading } = useGetTicketsQuery();

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user) {
    return (
      <div className=" mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h1>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để xem các ticket của mình.
          </p>
          <Link href="/auth/login">
            <Button>Đăng nhập</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ticket của tôi
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi các yêu cầu hỗ trợ của bạn
          </p>
        </div>
        <Link href="/support">
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Tạo ticket mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <TicketStats
        tickets={tickets || []}
        onStatusFilter={(status) => setFilters((prev) => ({ ...prev, status }))}
      />

      {/* Filters */}
      <TicketFilters filters={filters} onFiltersChange={setFilters} />

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
            <Link href="/support">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tạo ticket mới
              </Button>
            </Link>
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
                  <CardTitle className="text-lg line-clamp-2">
                    {ticket.title}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${getStatusColor(ticket.status)}`}
                  >
                    {getStatusIcon(ticket.status)}
                    <span className="ml-1 capitalize">
                      {ticket.status === "open"
                        ? "Mở"
                        : ticket.status === "in_progress"
                        ? "Đang xử lý"
                        : "Đã giải quyết"}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline">{ticket.category}</Badge>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(ticket.priority)}
                  >
                    {ticket.priority === "high"
                      ? "Cao"
                      : ticket.priority === "medium"
                      ? "Trung bình"
                      : "Thấp"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
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

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {/* Ticket Detail Dialog */}
      {selectedTicket && (
        <TicketDetailDialog
          ticket={selectedTicket}
          open={!!selectedTicket}
          onOpenChange={(open) => !open && setSelectedTicket(null)}
        />
      )}
    </div>
  );
}
