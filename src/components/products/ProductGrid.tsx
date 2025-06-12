"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductPagination } from "@/components/products/ProductPagination";
import { Leaf } from "lucide-react";

interface ProductGridProps {
  productsData: ApiResponse<Product>;
  categories: Category[];
  onFilterChange: (filters: ProductsQueryParams) => void;
  onPageChange: (page: number) => void;
  currentFilters: ProductsQueryParams;
}

export function ProductGrid({
  productsData,
  categories,
  onFilterChange,
  onPageChange,
  currentFilters,
}: ProductGridProps) {
  const {
    items: products,
    totalCount,
    pageNumber,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = productsData;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            onFilterChange={onFilterChange}
            currentFilters={currentFilters}
          />
        </div>

        <div className="lg:col-span-3">
          {products.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Hiển thị {products.length} trong tổng số {totalCount} sản phẩm
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500 mb-2">
                Không tìm thấy sản phẩm nào
              </h3>
              <p className="text-gray-400">
                Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.
              </p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <ProductPagination
          currentPage={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
