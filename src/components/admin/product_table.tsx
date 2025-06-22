"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

type Props = {
  products: Product[] | undefined;
  isLoading: boolean;
  sortDescByDiscount: boolean;
  onToggleSort: () => void;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export function ProductTable({
  products,
  isLoading,
  sortDescByDiscount,
  onToggleSort,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN");

  return (
    <div className="overflow-x-auto border rounded">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">Hình</TableHead>
            <TableHead className="min-w-[180px]">Tên</TableHead>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead className="min-w-[140px]">Danh mục</TableHead>
            <TableHead
              onClick={onToggleSort}
              className="cursor-pointer select-none w-[120px]"
            >
              Giá{" "}
              {sortDescByDiscount ? (
                <ArrowDown className="inline h-4 w-4" />
              ) : (
                <ArrowUp className="inline h-4 w-4" />
              )}
            </TableHead>
            <TableHead className="w-[80px] text-center">Tồn kho</TableHead>
            <TableHead className="w-[120px]">Trạng thái</TableHead>
            <TableHead className="w-[130px]">Ngày cập nhật</TableHead>
            <TableHead className="w-[60px] text-center">⋮</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={idx}>
                {Array.from({ length: 9 }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton className="h-8 w-full rounded" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id} className="align-middle">
                <TableCell className="text-center">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="rounded object-cover mx-auto w-12 h-12"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell className="text-center">{product.stock}</TableCell>
                <TableCell>
                  {product.isActive ? (
                    <Badge variant="success">Đang bán</Badge>
                  ) : (
                    <Badge variant="secondary">Ngừng bán</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(product.updatedAt)}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="mx-auto">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(product)}>
                        <Eye className="mr-2 h-4 w-4" /> Xem
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        <Edit className="mr-2 h-4 w-4" /> Sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(product)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" /> Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center py-6 text-muted-foreground"
              >
                Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
