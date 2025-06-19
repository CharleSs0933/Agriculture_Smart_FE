"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface BlogFilterProps {
  categories: BlogCategory[] | undefined;
  onFilterChange: (filters: BlogsQueryParams) => void;
  currentFilters: BlogsQueryParams;
}

export function BlogFilterSkeleton() {
  return (
    <div className="sticky top-16 space-y-6">
      {/* Search Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* Author Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* Category Skeleton */}
      <Card>
        <CardHeader className="text-lg flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters Skeleton */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function BlogFilter({
  categories,
  onFilterChange,
  currentFilters,
}: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.title || "");
  const [searchAuthorTerm, setAuthorSearchTerm] = useState(
    currentFilters.author || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    currentFilters.categoryId || undefined
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedSearchAuthorTerm = useDebounce(searchAuthorTerm, 500);

  useEffect(() => {
    onFilterChange({
      title: debouncedSearchTerm,
      categoryId: selectedCategory,
      author: debouncedSearchAuthorTerm,
      pageNumber: 1, // Reset to first page when filters change
    });
  }, [
    debouncedSearchTerm,
    selectedCategory,
    debouncedSearchAuthorTerm,
    onFilterChange,
  ]);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAuthorSearchTerm("");
    setSelectedCategory(undefined);
  };

  return (
    <div className="sticky top-16 space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-4 w-4" />
            Tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-4 w-4" />
            Tìm kiếm tác giả
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm tác giả..."
              value={searchAuthorTerm}
              onChange={(e) => setAuthorSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories && (
        <Card>
          <CardHeader className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle>Danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === undefined ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleCategoryChange(undefined)}
              >
                Tất cả sản phẩm
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        Xóa bộ lọc
      </Button>
    </div>
  );
}
