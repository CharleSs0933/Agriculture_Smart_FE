"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Filter, X } from "lucide-react";

interface ProductFiltersProps {
  filters: {
    categoryName: string;
    isActive: boolean | undefined;
    sortByDiscountPrice: boolean;
  };
  onFiltersChange: (filters: {
    categoryName: string;
    isActive: boolean | undefined;
    sortByDiscountPrice: boolean;
  }) => void;
}

const categories = [
  { name: "Phân bón" },
  { name: "Thuốc BVTV" },
  { name: "Hạt giống" },
  { name: "Dụng cụ nông nghiệp" },
  { name: "Máy móc" },
];

export function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      categoryName: "",
      isActive: undefined,
      sortByDiscountPrice: false,
    };
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.categoryName ||
    filters.isActive !== undefined ||
    filters.sortByDiscountPrice;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Lọc nâng cao
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5">
        <SheetHeader>
          <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
          <SheetDescription>
            Sử dụng các bộ lọc để tìm sản phẩm phù hợp
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Danh mục</Label>
            <Select
              value={filters.categoryName}
              onValueChange={(value) =>
                handleFilterChange("categoryName", value === "all" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Trạng thái</Label>
            <Select
              value={
                filters.isActive === undefined
                  ? "all"
                  : filters.isActive.toString()
              }
              onValueChange={(value) =>
                handleFilterChange(
                  "isActive",
                  value === "all" ? undefined : value === "true"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="true">Đang bán</SelectItem>
                <SelectItem value="false">Ngừng bán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="sortByDiscountPrice"
                checked={filters.sortByDiscountPrice}
                onCheckedChange={(checked) =>
                  handleFilterChange("sortByDiscountPrice", checked)
                }
              />
              <Label htmlFor="sortByDiscountPrice">Sắp xếp theo giá giảm</Label>
            </div>
          </div>

          <Button onClick={clearFilters} variant="outline" className="w-full">
            <X className="mr-2 h-4 w-4" />
            Xóa bộ lọc
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
