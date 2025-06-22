"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductFormDialog } from "@/components/admin/product_form_dialog";
import { ProductDetailModal } from "@/components/admin/product_detail_modal";
import { Pagination } from "@/components/admin/pagination";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "@/state/apiAdmin";
import { useDebounce } from "@/hooks/use-debounce";
import { Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/admin/confirm_dialog";
import { ProductTable } from "@/components/admin/product_table";
import { ProductFilters } from "@/components/admin/product_filter";
import { AdminProductsQueryParams } from "@/types/api";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortDescByDiscount, setSortDescByDiscount] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilter>({
    categoryName: "",
    isActive: undefined,
    sortByDiscountPrice: false,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryParams: AdminProductsQueryParams = useMemo(() => {
    return {
      PageNumber: currentPage,
      PageSize: pageSize,
      SortByDiscountPrice: sortDescByDiscount,
      ...(debouncedSearchTerm && {
        Name: debouncedSearchTerm,
        Description: debouncedSearchTerm,
      }),
      ...(filters.isActive !== undefined && { IsActive: filters.isActive }),
      ...(filters.categoryName && { CategoryName: filters.categoryName }),
      ...(filters.sortByDiscountPrice && {
        SortByDiscountPrice: filters.sortByDiscountPrice,
      }),
    };
  }, [currentPage, pageSize, debouncedSearchTerm, sortDescByDiscount, filters]);

  const {
    data: productsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAdminProductsQuery(queryParams);
  const [deleteProduct] = useDeleteProductMutation();

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleViewProduct = (product: Product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
  };
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN");

  const exportToCSV = () => {
    if (!productsResponse?.items) return;
    const csvContent = [
      [
        "ID",
        "Tên sản phẩm",
        "SKU",
        "Danh mục",
        "Giá",
        "Tồn kho",
        "Trạng thái",
        "Ngày tạo",
      ].join(","),
      ...productsResponse.items.map((p: Product) =>
        [
          p.id,
          `"${p.name}"`,
          p.sku,
          `"${p.category?.name || ""}"`,
          p.price,
          p.stock,
          p.isActive ? "Hoạt động" : "Ngừng bán",
          formatDate(p.createdAt),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.csv";
    link.click();
  };

  if (isError) {
    return (
      <div className="text-center text-red-600 py-8">Lỗi khi tải sản phẩm.</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground">
            Tổng cộng {productsResponse?.totalCount || 0} sản phẩm
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Xuất CSV
          </Button>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>
            {productsResponse
              ? `Hiển thị ${(currentPage - 1) * pageSize + 1}-${Math.min(
                  currentPage * pageSize,
                  productsResponse.totalCount
                )}`
              : "Đang tải..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductFilters
            filters={filters}
            sortDesc={sortDescByDiscount}
            searchTerm={searchTerm}
            onFilterChange={setFilters}
            onSearchChange={setSearchTerm}
            onToggleSort={() => setSortDescByDiscount((prev) => !prev)}
          />

          <ProductTable
            products={productsResponse?.items}
            isLoading={isLoading}
            sortDescByDiscount={sortDescByDiscount}
            onToggleSort={() => setSortDescByDiscount((prev) => !prev)}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={(product) => {
              setProductToDelete(product);
              setConfirmDeleteOpen(true);
            }}
          />

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={productsResponse?.totalPages || 1}
              pageSize={pageSize}
              totalItems={productsResponse?.totalCount || 0}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </CardContent>
      </Card>

      <ProductFormDialog
        open={showProductForm}
        onOpenChange={setShowProductForm}
        product={editingProduct}
        onSave={() => {
          refetch();
          setEditingProduct(null);
          setShowProductForm(false);
        }}
      />

      <ProductDetailModal
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        product={detailProduct}
        onEdit={handleEditProduct}
      />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => {
          setConfirmDeleteOpen(open);
          if (!open) setProductToDelete(null);
        }}
        title="Xác nhận xóa sản phẩm"
        description={
          <>
            Bạn có chắc chắn muốn xóa sản phẩm{" "}
            <span className="font-medium text-foreground">
              {productToDelete?.name}
            </span>
            ?<br />
            <span className="text-destructive font-semibold">
              Hành động này không thể hoàn tác.
            </span>
          </>
        }
        confirmText="Xác nhận xóa"
        cancelText="Hủy"
        onConfirm={async () => {
          if (!productToDelete) return;
          try {
            await deleteProduct(productToDelete.id).unwrap();
            toast.success("Xóa sản phẩm thành công");
          } catch {
            toast.error("Không thể xóa sản phẩm");
          } finally {
            setConfirmDeleteOpen(false);
            setProductToDelete(null);
          }
        }}
      />
    </div>
  );
}
