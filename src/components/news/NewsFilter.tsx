"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "../ui/skeleton";

interface NewsFilterProps {
  categories: { message: string; data: NewsCategory[] } | undefined;
  onFilterChange: (filters: NewsQueryParams) => void;
  currentFilters: NewsQueryParams;
}

export const NewsFilterSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Search Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>

      {/* Author Search Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>

      {/* Categories Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-10 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>

      {/* Clear Filter Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};

export function NewsFilter({
  categories,
  onFilterChange,
  currentFilters,
}: NewsFilterProps) {
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
      page: 1, // Reset to first page when filters change
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
    <div className="space-y-6">
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
              placeholder="Tìm kiếm tin tức..."
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

      {/* Categories */}
      {categories && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Danh mục
            </CardTitle>
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
              {categories.data.map((category) => (
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
