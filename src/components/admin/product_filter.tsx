import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

type Filters = {
  categoryName: string;
  isActive?: boolean;
};

type Props = {
  filters: {
    categoryName: string;
    isActive?: boolean;
  };
  sortDesc: boolean;
  searchTerm: string;
  onFilterChange: (filters: Filters) => void;
  onSearchChange: (text: string) => void;
  onToggleSort: () => void;
};

export function ProductFilters({
  filters,
  sortDesc,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onToggleSort,
}: Props) {
  return (
    <div className="flex gap-3 mb-4 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Danh mục: {filters.categoryName || "Tất cả"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[
            "",
            "Hạt giống",
            "Phân bón",
            "Thuốc BVTV",
            "Dụng cụ nông nghiệp",
            "Máy móc",
          ].map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() =>
                onFilterChange({ ...filters, categoryName: category })
              }
            >
              {category || "Tất cả"}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Trạng thái:{" "}
            {filters.isActive === undefined
              ? "Tất cả"
              : filters.isActive
              ? "Đang bán"
              : "Ngừng bán"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => onFilterChange({ ...filters, isActive: undefined })}
          >
            Tất cả
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange({ ...filters, isActive: true })}
          >
            Đang bán
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onFilterChange({ ...filters, isActive: false })}
          >
            Ngừng bán
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        onClick={onToggleSort}
        className="min-w-[120px]"
      >
        Giá: {sortDesc ? "Cao → Thấp" : "Thấp → Cao"}{" "}
        {sortDesc ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUp className="ml-2 h-4 w-4" />
        )}
      </Button>

      <Input
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />
    </div>
  );
}
