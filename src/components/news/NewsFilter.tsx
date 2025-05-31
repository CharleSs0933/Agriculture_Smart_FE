"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, Calendar, TrendingUp } from "lucide-react";
import { newsCategories } from "@/lib/constants";

interface NewsFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: "newest" | "oldest" | "popular") => void;
}

const popularTags = [
  "Chính sách",
  "Hỗ trợ",
  "Dịch bệnh",
  "Xuất khẩu",
  "Thời tiết",
  "Nghiên cứu",
  "Đào tạo",
  "Thị trường",
];

export function NewsFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: NewsFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm tin tức..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Mới nhất
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Cũ nhất
                </div>
              </SelectItem>
              <SelectItem value="popular">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Phổ biến
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="flex flex-wrap gap-2">
        {newsCategories.map((category) => (
          <Button
            key={category.value}
            variant={
              selectedCategory === category.value ? "default" : "outline"
            }
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className="text-xs"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          {/* Popular Tags */}
          <div>
            <h4 className="font-medium mb-2">Thẻ tag phổ biến</h4>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => onSearchChange(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="font-medium mb-2">Thời gian</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => {}}>
                Hôm nay
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                Tuần này
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                Tháng này
              </Button>
              <Button variant="outline" size="sm" onClick={() => {}}>
                3 tháng qua
              </Button>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSearchChange("");
                onCategoryChange("all");
                onSortChange("newest");
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
