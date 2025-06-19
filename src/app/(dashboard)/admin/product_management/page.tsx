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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductFormDialog } from "@/components/admin/product_form_dialog";
import { ProductFilters } from "@/components/admin/product_filters";
import { ProductDetailModal } from "@/components/admin/product_detail_modal";
import { Pagination } from "@/components/admin/pagination";
import { useGetAdminProductsQuery } from "@/state/apiAdmin";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState({
    categoryName: "",
    isActive: undefined as boolean | undefined,
    sortByDiscountPrice: false,
  });

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Build query parameters matching backend interface
  const queryParams: AdminProductsQueryParams = useMemo(() => {
    const params: AdminProductsQueryParams = {
      PageNumber: currentPage,
      PageSize: pageSize,
    };

    // Add search terms
    if (debouncedSearchTerm) {
      params.Name = debouncedSearchTerm;
      params.Description = debouncedSearchTerm;
    }

    // Add filters
    if (filters.categoryName) {
      params.CategoryName = filters.categoryName;
    }
    if (filters.isActive !== undefined) {
      params.IsActive = filters.isActive;
    }
    if (filters.sortByDiscountPrice) {
      params.SortByDiscountPrice = filters.sortByDiscountPrice;
    }

    return params;
  }, [currentPage, pageSize, debouncedSearchTerm, filters]);

  // API Hooks
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetAdminProductsQuery(queryParams);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusBadge = (product: Product) => {
    if (!product.isActive) {
      return <Badge variant="destructive">Ngừng bán</Badge>;
    }
    if (product.stock === 0) {
      return <Badge variant="secondary">Hết hàng</Badge>;
    }
    if (product.stock < 10) {
      return <Badge variant="outline">Sắp hết</Badge>;
    }
    return <Badge variant="default">Còn hàng</Badge>;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedProducts([]);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setSelectedProducts([]);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedProducts([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && productsResponse?.items) {
      setSelectedProducts(productsResponse.items.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleViewProduct = (product: Product) => {
    setDetailProduct(product);
    setShowDetailModal(true);
  };

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
      ...productsResponse.items.map((product) =>
        [
          product.id,
          `"${product.name}"`,
          product.sku,
          `"${product.category?.name || ""}"`,
          product.price,
          product.stock,
          product.isActive ? "Hoạt động" : "Ngừng bán",
          formatDate(product.createdAt),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "products.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-600 mb-2">Có lỗi xảy ra khi tải dữ liệu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý sản phẩm
          </h1>
          <p className="text-muted-foreground">
            Quản lý danh sách sản phẩm nông nghiệp (
            {productsResponse?.totalCount || 0} sản phẩm)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={!productsResponse?.items?.length}
          >
            <Download className="mr-2 h-4 w-4" />
            Xuất CSV
          </Button>
          <Button onClick={() => setShowProductForm(true)}>
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
                )} của ${productsResponse.totalCount} sản phẩm`
              : "Đang tải..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc mô tả sản phẩm..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedProducts.length ===
                            productsResponse?.items?.length &&
                          (productsResponse?.items?.length || 0) > 0
                        }
                        onCheckedChange={handleSelectAll}
                        disabled={isLoading}
                      />
                    </TableHead>
                    <TableHead className="w-[80px]">Hình ảnh</TableHead>
                    <TableHead className="min-w-[200px] max-w-[250px]">
                      Sản phẩm
                    </TableHead>
                    <TableHead className="w-[100px]">SKU</TableHead>
                    <TableHead className="w-[120px]">Danh mục</TableHead>
                    <TableHead className="w-[120px]">Giá</TableHead>
                    <TableHead className="w-[80px]">Tồn kho</TableHead>
                    <TableHead className="w-[100px]">Trạng thái</TableHead>
                    <TableHead className="w-[100px]">Đánh giá</TableHead>
                    <TableHead className="w-[100px]">Cập nhật</TableHead>
                    <TableHead className="w-[80px] text-right">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? Array.from({ length: pageSize }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-12 w-12 bg-muted animate-pulse rounded-lg" />
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                          </TableCell>
                          <TableCell>
                            <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                          </TableCell>
                        </TableRow>
                      ))
                    : productsResponse?.items?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) =>
                                handleSelectProduct(
                                  product.id,
                                  checked as boolean
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                              <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="h-12 w-12 rounded-lg object-cover"
                                fill
                              />
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[250px]">
                            <div className="space-y-1">
                              <p
                                className="font-medium leading-none truncate"
                                title={product.name}
                              >
                                {product.name}
                              </p>
                              <p
                                className="text-sm text-muted-foreground line-clamp-2"
                                title={product.description}
                              >
                                {product.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {product.sku}
                            </code>
                          </TableCell>
                          <TableCell
                            className="truncate"
                            title={product.category?.name}
                          >
                            {product.category?.name}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-sm">
                                {formatPrice(product.price)}
                              </p>
                              {product.discountPrice &&
                                product.discountPrice < product.price && (
                                  <p className="text-xs text-green-600">
                                    Giảm: {formatPrice(product.discountPrice)}
                                  </p>
                                )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium text-sm ${
                                product.stock < 10
                                  ? "text-orange-600"
                                  : product.stock === 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(product)}</TableCell>
                          <TableCell>
                            {product.rating && (
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-500 text-sm">
                                  ★
                                </span>
                                <span className="text-sm font-medium">
                                  {product.rating}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({product.reviews})
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(product.updatedAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleViewProduct(product)}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {productsResponse && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={productsResponse.totalPages}
                pageSize={pageSize}
                totalItems={productsResponse.totalCount}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}

          {!isLoading && !productsResponse?.items?.length && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Không tìm thấy sản phẩm nào
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={showProductForm}
        onOpenChange={setShowProductForm}
        product={editingProduct}
        onSave={() => {
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
    </div>
  );
}
