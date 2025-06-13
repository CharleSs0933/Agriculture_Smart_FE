"use client";

import { useState, useCallback } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CartProvider } from "@/contexts/cart-context";
import { useGetProductsQuery } from "@/state/api";

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductsQueryParams>({
    PageNumber: 1,
    PageSize: 12,
    Name: "",
    Description: "",
    CategoryName: "",
    SortByDiscount: false,
  });

  const { data: productsData, isLoading } = useGetProductsQuery(filters);

  const handleFilterChange = useCallback(
    (newFilters: Partial<ProductsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  // Extract unique categories from products
  const categories = productsData?.items
    ? Array.from(
        new Map(
          productsData.items.map((product) => [
            product.category.id,
            product.category,
          ])
        ).values()
      )
    : [];

  if (isLoading) {
    return (
      <main className="flex-1">
        <div className="px-4 md:px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-80 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <CartProvider>
      <main className="flex-1">
        <div className="bg-green-50 py-12">
          <div className="px-4 md:px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Sản phẩm nông nghiệp
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl mt-4">
                Khám phá bộ sưu tập đầy đủ các sản phẩm nông nghiệp chất lượng
                cao từ phân bón, thuốc BVTV đến hạt giống và công cụ nông
                nghiệp.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-6 py-8">
          {productsData && (
            <ProductGrid
              productsData={productsData}
              categories={categories}
              onFilterChange={handleFilterChange}
              onPageChange={handlePageChange}
              currentFilters={filters}
            />
          )}
        </div>
      </main>
    </CartProvider>
  );
}
