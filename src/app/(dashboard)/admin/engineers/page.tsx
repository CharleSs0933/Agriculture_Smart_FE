"use client";

import { useMemo, useState } from "react";
import { Search, HardHat, Award, Clock, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EngineerDetailModal } from "@/components/admin/engineer_detail_modal";
import { Pagination } from "@/components/admin/pagination";
import {
  useAddEngineerMutation,
  useDeleteEngineerMutation,
  useGetEngineerQuery,
  useUpdateEngineerMutation,
} from "@/state/apiAdmin";
import { StatsCard } from "@/components/admin/stats_card"; // Import the StatsCard component
import { EngineerTable } from "@/components/admin/engineer_table"; // Import the EngineerTable component
import { toast } from "sonner";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { EngineerFormModal } from "@/components/admin/engineer_form_modal";
import { ConfirmDialog } from "@/components/admin/confirm_dialog";

export default function EngineersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryParams = useMemo(
    () => ({
      pageNumber: currentPage,
      pageSize: pageSize,
    }),
    [currentPage, pageSize]
  );

  const {
    data: fetchEngineer,
    isLoading,
    isError,
    refetch,
  } = useGetEngineerQuery(queryParams);

  const [deleteEngineer] = useDeleteEngineerMutation();
  const [addEngineer] = useAddEngineerMutation();
  const [updateEngineer] = useUpdateEngineerMutation();

  const handleDelete = async () => {
    if (!selectedEngineer) return;

    try {
      await deleteEngineer(selectedEngineer.id).unwrap();
      toast.success("Xóa kỹ sư thành công");
      refetch();
    } catch {
      toast.error("Xóa kỹ sư thất bại");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (data: EngineerFormdata) => {
    try {
      if (data.id) {
        await updateEngineer({
          id: data.id,
          data: data,
        }).unwrap();
        toast.success("Cập nhật kỹ sư thành công");
      } else {
        // Nếu không có id → là thêm mới
        await addEngineer(data).unwrap();
        toast.success("Thêm kỹ sư thành công");
      }

      setIsFormOpen(false);
      setSelectedEngineer(null);
      refetch();
    } catch {
      toast.error(data.id ? "Cập nhật thất bại" : "Thêm mới thất bại");
    }
  };

  const filteredEngineers = (fetchEngineer?.items ?? []).filter(
    (engineer: EngineerFilter) =>
      engineer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      engineer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = fetchEngineer?.totalCount;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEngineers = filteredEngineers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewDetails = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsDetailModalOpen(true);
  };

  const handleViewEdit = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsFormOpen(true);
  };

  const handleViewDeleteForm = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsDeleteDialogOpen(true);
  };

  const handleViewAdd = () => {
    setSelectedEngineer(null);
    setIsFormOpen(true);
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <p className="text-red-600 text-center">
          Đã xảy ra lỗi khi tải dữ liệu
        </p>
        <Button variant="outline" onClick={refetch}>
          Thử lại
        </Button>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Kỹ sư</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin kỹ sư nông nghiệp ({totalItems} kỹ sư)
          </p>
        </div>
        <Button onClick={handleViewAdd}>
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng số kỹ sư"
          value={fetchEngineer?.totalCount ?? 0}
          icon={<HardHat className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Kinh nghiệm TB"
          value={
            fetchEngineer?.items.length > 0
              ? Math.round(
                  fetchEngineer.items.reduce(
                    (sum: number, engineer: Engineer) =>
                      sum + engineer.experienceYears,
                    0
                  ) / fetchEngineer.items.length
                )
              : 0 + " năm"
          }
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Chứng chỉ TB"
          value={
            fetchEngineer?.items.length > 0
              ? Math.round(
                  fetchEngineer.items.reduce(
                    (sum: number, engineer: Engineer) =>
                      sum + JSON.parse(engineer.certification).length,
                    0
                  ) / fetchEngineer.items.length
                )
              : 0
          }
          icon={<Award className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Kỹ sư mới"
          value={
            fetchEngineer?.items.filter(
              (engineer: Engineer) =>
                new Date(engineer.createdAt) >
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length
          }
          icon={<HardHat className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm kỹ sư..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <EngineerTable
        engineers={currentEngineers}
        onViewDetails={handleViewDetails}
        onEdit={handleViewEdit}
        onDelete={handleViewDeleteForm}
      />

      {/* Pagination */}
      <div className="p-4 border-t">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      {isFormOpen && (
        <EngineerFormModal
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleSubmit}
          engineer={selectedEngineer}
        />
      )}

      {/* Detail Modal */}
      <EngineerDetailModal
        engineer={selectedEngineer}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {isDeleteDialogOpen && (
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="Xác nhận xóa"
          description="Bạn có chắc chắn muốn xóa kỹ sư này?"
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
