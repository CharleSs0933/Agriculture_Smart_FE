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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Filter, X } from "lucide-react";

interface ProductFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const categories = [
  { id: 1, name: "Phân bón" },
  { id: 2, name: "Thuốc BVTV" },
  { id: 3, name: "Giống cây trồng" },
  { id: 4, name: "Dụng cụ nông nghiệp" },
  { id: 5, name: "Máy móc" },
];

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 2000000],
    inStock: false,
    isActive: false,
    minRating: 0,
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "",
      priceRange: [0, 2000000],
      inStock: false,
      isActive: false,
      minRating: 0,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Lọc nâng cao
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
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Khoảng giá (VND)</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              max={2000000}
              step={50000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.priceRange[0].toLocaleString()}</span>
              <span>{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Đánh giá tối thiểu</Label>
            <Select
              value={filters.minRating.toString()}
              onValueChange={(value) =>
                handleFilterChange("minRating", Number(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tất cả đánh giá</SelectItem>
                <SelectItem value="3">3 sao trở lên</SelectItem>
                <SelectItem value="4">4 sao trở lên</SelectItem>
                <SelectItem value="4.5">4.5 sao trở lên</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) =>
                  handleFilterChange("inStock", checked)
                }
              />
              <Label htmlFor="inStock">Chỉ hiển thị sản phẩm còn hàng</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={filters.isActive}
                onCheckedChange={(checked) =>
                  handleFilterChange("isActive", checked)
                }
              />
              <Label htmlFor="isActive">Chỉ hiển thị sản phẩm đang bán</Label>
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
