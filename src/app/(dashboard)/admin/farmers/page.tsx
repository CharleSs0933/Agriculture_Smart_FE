"use client";

import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FarmerTable } from "@/components/admin/farmer_table";
import { Pagination } from "@/components/admin/pagination";
import {
  useAddFarmerMutation,
  useDeleteFarmerMutation,
  useGetFarmerQuery,
  useUpdateFarmerMutation,
} from "@/state/apiAdmin";
import { useDebounce } from "@/hooks/use-debounce";
import Loading from "./loading";
import { ConfirmDialog } from "@/components/admin/confirm_dialog";
import { toast } from "sonner";
import { FarmerFormModal } from "@/components/admin/farmer_form_modal";
import { FarmerDetailModal } from "@/components/admin/farmer_detail_modal"; // Import the StatsCard component
import { Card, CardContent } from "@/components/ui/card";
// import { StatsCard } from "@/components/admin/stats_card";

export default function FarmersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryParams = useMemo(
    () => ({
      pageNumber: currentPage,
      pageSize: pageSize,
    }),
    [currentPage, pageSize]
  );

  const {
    data: farmerData,
    isLoading,
    isError,
    refetch,
  } = useGetFarmerQuery(queryParams);

  const [deleteFarmer] = useDeleteFarmerMutation();
  const [addFarmer] = useAddFarmerMutation();
  const [updateFarmer] = useUpdateFarmerMutation();

  const handleDelete = async () => {
    if (!selectedFarmer) return;

    try {
      await deleteFarmer(selectedFarmer.id).unwrap();
      toast.success("Xóa nông dân thành công");
      refetch();
    } catch {
      toast.error("Xóa nông dân thất bại");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (data: FarmerMutation) => {
    const payload = {
      farmLocation: data.farmLocation,
      farmSize: data.farmSize,
      cropTypes: JSON.stringify(data.cropTypes),
      farmingExperienceYears: data.farmingExperienceYears,
    };
    try {
      if (selectedFarmer) {
        const response = await updateFarmer({
          id: selectedFarmer.id,
          data: payload,
        }).unwrap();
        console.log("Update response:", response); // Log response
        toast.success("Cập nhật nông dân thành công");
      } else {
        await addFarmer(payload).unwrap();
        toast.success("Thêm nông dân thành công");
      }
      setSelectedFarmer(null);
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      console.error("Update error:", error); // Log error
      toast.error(selectedFarmer ? "Cập nhật thất bại" : "Thêm mới thất bại");
    }
  };

  const parseCropTypes = (cropTypesString: string) => {
    try {
      return JSON.parse(cropTypesString);
    } catch {
      return [];
    }
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const handleViewDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsDetailOpen(true); // Open the detail modal
  };

  const filteredFarmers = useMemo(() => {
    if (!farmerData?.items) return [];

    const searchLower = debouncedSearchTerm.toLowerCase();

    return farmerData.items.filter((farmer) => {
      return (
        (farmer.userName?.toLowerCase().includes(searchLower) ?? false) ||
        (farmer.email?.toLowerCase().includes(searchLower) ?? false) ||
        (farmer.phoneNumber?.toLowerCase().includes(searchLower) ?? false)
      );
    });
  }, [farmerData?.items, debouncedSearchTerm]);

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
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý Nông dân
          </h1>
          <p className="text-muted-foreground">
            Tổng số: {farmerData?.totalCount ?? 0} nông dân
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedFarmer(null);
            setIsFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng số"
          value={farmerData?.totalCount ?? 0}
          icon={<Tractor className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Tổng diện tích"
          value={
            (
              farmerData?.items?.reduce(
                (sum, f) => sum + (f.farmSize || 0),
                0
              ) ?? 0
            ).toFixed(1) + " ha"
          }
          icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Kinh nghiệm TB"
          value={
            farmerData?.items && farmerData.totalCount > 0
              ? Math.round(
                  farmerData.items.reduce(
                    (sum, f) => sum + (f.farmingExperienceYears || 0),
                    0
                  ) / farmerData.totalCount
                )
              : 0 + " năm"
          }
          icon={<Wheat className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Nông dân mới"
          value={
            farmerData?.items?.filter(
              (f) =>
                new Date(f.createdAt || 0) >
                new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            ).length ?? 0
          }
          icon={<Tractor className="h-4 w-4 text-muted-foreground" />}
        />
      </div> */}

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, email hoặc điện thoại..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <FarmerTable
              farmers={filteredFarmers}
              onViewDetails={handleViewDetails}
              onEdit={(farmer) => {
                setSelectedFarmer(farmer);
                setIsFormOpen(true);
              }}
              onDelete={(farmer) => {
                setSelectedFarmer(farmer);
                setIsDeleteDialogOpen(true);
              }}
            />
          </div>

          {/* Pagination */}
          {farmerData && (
            <div className="p-4 border-t">
              <Pagination
                currentPage={currentPage}
                totalPages={farmerData.totalPages}
                pageSize={pageSize}
                totalItems={farmerData.totalCount}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <FarmerFormModal
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleSubmit}
          farmer={
            selectedFarmer
              ? {
                  ...selectedFarmer,
                  cropTypes: Array.isArray(selectedFarmer.cropTypes)
                    ? selectedFarmer.cropTypes
                    : parseCropTypes(selectedFarmer.cropTypes),
                }
              : null
          }
        />
      )}

      <FarmerDetailModal
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        farmer={selectedFarmer}
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="Xác nhận xóa"
          description="Bạn có chắc chắn muốn xóa nông dân này?"
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
