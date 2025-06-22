"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetTicketsQuery } from "@/state/apiAdmin";
import { TicketAdminFilter } from "@/components/my-tickets/TicketAdminFilter";
import { TicketTable } from "@/components/my-tickets/TicketTable";
import { Pagination } from "@/components/Pagination";

// Thêm vào đầu component, sau các import
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export default function AdminTickets() {
  const [filters, setFilters] = useState<TicketsQueryParams>({
    pageNumber: 1,
    pageSize: 5,
    title: "",
    assignedEngineerName: "",
    farmerName: "",
    status: undefined,
  });

  const { data: ticketsData, isLoading } = useGetTicketsQuery(filters);

  const handleFilterChange = useCallback(
    (newFilters: Partial<TicketsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, pageNumber: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Ticket</h1>
          <p className="text-muted-foreground">
            Xử lý các yêu cầu hỗ trợ từ nông dân
          </p>
        </div>

        {/* Statistics Cards */}
        {/* <div className="grid gap-4 md:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Ticket</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Tất cả ticket</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mở</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.open}
              </div>
              <p className="text-xs text-muted-foreground">Chờ xử lý</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đã phân công
              </CardTitle>
              <UserPlus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.assigned}
              </div>
              <p className="text-xs text-muted-foreground">Có kỹ sư</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Đang giải quyết</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đã giải quyết
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </div>
              <p className="text-xs text-muted-foreground">Hoàn thành</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khẩn cấp</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.urgent}
              </div>
              <p className="text-xs text-muted-foreground">Ưu tiên cao</p>
            </CardContent>
          </Card>
        </div> */}

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Ticket</CardTitle>
            <CardDescription>
              Quản lý và xử lý các yêu cầu hỗ trợ từ nông dân
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketAdminFilter
              currentFilters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Table */}
            <TicketTable ticketsData={ticketsData} />

            {/* Pagination */}
            {ticketsData && ticketsData.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={ticketsData.pageNumber}
                  onPageChange={handlePageChange}
                  totalPages={ticketsData.totalPages}
                  hasNextPage={ticketsData.hasNextPage}
                  hasPreviousPage={ticketsData.hasPreviousPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
