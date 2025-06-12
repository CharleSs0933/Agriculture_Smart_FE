"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, SortAsc, Tag, Percent } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface ProductFilterProps {
  categories: Category[];
  onFilterChange: (filters: ProductsQueryParams) => void;
  currentFilters: ProductsQueryParams;
}

export function ProductFilter({
  categories,
  onFilterChange,
  currentFilters,
}: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.Name || "");
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters.CategoryName || ""
  );
  const [sortByDiscount, setSortByDiscount] = useState(
    currentFilters.SortByDiscount || false
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onFilterChange({
      Name: debouncedSearchTerm,
      CategoryName: selectedCategory,
      SortByDiscount: sortByDiscount,
      PageNumber: 1, // Reset to first page when filters change
    });
  }, [debouncedSearchTerm, selectedCategory, sortByDiscount, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "all" ? "" : category);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortByDiscount(false);
  };

  const popularTags = [
    "Hạt giống",
    "Phân bón",
    "Thuốc BVTV",
    "Dụng cụ",
    "Máy móc",
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-4 w-4" />
            Tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
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
              variant={selectedCategory === "" ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleCategoryChange("all")}
            >
              Tất cả sản phẩm
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                className="w-full justify-start"
                onClick={() => handleCategoryChange(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <SortAsc className="h-4 w-4" />
            Sắp xếp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="sort-discount"
              checked={sortByDiscount}
              onCheckedChange={setSortByDiscount}
            />
            <label
              htmlFor="sort-discount"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Percent className="h-4 w-4" />
              Ưu tiên sản phẩm giảm giá
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Thẻ phổ biến
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-green-50"
                onClick={() => setSearchTerm(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full" onClick={handleClearFilters}>
        Xóa bộ lọc
      </Button>
    </div>
  );
}
