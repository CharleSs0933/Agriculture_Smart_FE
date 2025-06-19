import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

interface BlogFilterProps {
  categories: BlogCategory[] | undefined;
  onFilterChange: (filters: BlogsQueryParams) => void;
  currentFilters: BlogsQueryParams;
}

export function BlogToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex flex-1 items-center space-x-2">
        {/* Search Input Skeleton */}
        <Skeleton className="h-10 w-full max-w-sm rounded-md" />

        {/* Status Select Skeleton */}
        <Skeleton className="h-10 w-40 rounded-md" />

        {/* Category Select Skeleton */}
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>
    </div>
  );
}

export function BlogAdminFilter({
  categories,
  onFilterChange,
  currentFilters,
}: BlogFilterProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.title || "");

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    currentFilters.categoryId || undefined
  );

  const [selectedStatus, setSelectedStatus] = useState<
    "published" | "draft" | "archived" | undefined
  >(currentFilters.status || undefined);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onFilterChange({
      title: debouncedSearchTerm,
      categoryId: selectedCategory,
      status: selectedStatus,
      pageNumber: 1, // Reset to first page when filters change
    });
  }, [debouncedSearchTerm, selectedCategory, selectedStatus, onFilterChange]);

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
  };
  const handleStatusChange = (
    status: "published" | "draft" | "archived" | undefined
  ) => {
    setSelectedStatus(status);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết, tác giả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={selectedStatus ? selectedStatus : "all"}
          onValueChange={(value) => {
            handleStatusChange(
              value === "all"
                ? undefined
                : (value as "published" | "draft" | "archived")
            );
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="published">Đã xuất bản</SelectItem>
            <SelectItem value="draft">Bản nháp</SelectItem>
            <SelectItem value="archived">Lưu trữ</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={selectedCategory ? selectedCategory.toString() : "all"}
          onValueChange={(value) => {
            handleCategoryChange(value === "all" ? undefined : Number(value));
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories &&
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
