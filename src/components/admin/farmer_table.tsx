import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust the import path as necessary
import { Badge } from "@/components/ui/badge"; // Adjust the import path as necessary
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as necessary
import { Button } from "@/components/ui/button"; // Adjust the import path as necessary
import { Eye, Pencil, Trash, MoreHorizontal } from "lucide-react"; // Adjust the import path as necessary

interface FarmerTableProps {
  farmers: Farmer[];
  onViewDetails: (farmer: Farmer) => void;
  onEdit: (farmer: Farmer) => void;
  onDelete: (farmer: Farmer) => void;
}

export function FarmerTable({
  farmers,
  onViewDetails,
  onEdit,
  onDelete,
}: FarmerTableProps) {
  const parseCropTypes = (cropTypesString: string) => {
    try {
      return JSON.parse(cropTypesString);
    } catch {
      return [];
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[180px]">Nông dân</TableHead>
          <TableHead className="min-w-[180px]">Liên hệ</TableHead>
          <TableHead className="min-w-[180px]">Trang trại</TableHead>
          <TableHead className="min-w-[120px]">Cây trồng</TableHead>
          <TableHead className="min-w-[100px]">Kinh nghiệm</TableHead>
          <TableHead className="min-w-[120px]">Ngày tạo</TableHead>
          <TableHead className="w-[50px]">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {farmers.length > 0 ? (
          farmers.map((farmer) => (
            <TableRow key={farmer.id}>
              <TableCell>
                <div className="font-medium">{farmer.userName}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {farmer.id}
                </div>
              </TableCell>
              <TableCell>
                <div>{farmer.email}</div>
                <div className="text-sm text-muted-foreground">
                  {farmer.phoneNumber}
                </div>
              </TableCell>
              <TableCell>
                <div>{farmer.farmLocation || "Chưa xác định"}</div>
                <div className="text-sm text-muted-foreground">
                  {farmer.farmSize ? `${farmer.farmSize} ha` : "Chưa xác định"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {parseCropTypes(farmer.cropTypes)
                    .slice(0, 2)
                    .map((crop, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  {parseCropTypes(farmer.cropTypes).length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{parseCropTypes(farmer.cropTypes).length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                  ${
                    farmer.farmingExperienceYears < 2
                      ? "bg-zinc-500 text-zinc-200"
                      : ""
                  }
                  ${
                    farmer.farmingExperienceYears >= 2 &&
                    farmer.farmingExperienceYears < 5
                      ? "bg-yellow-100 text-yellow-800"
                      : ""
                  }
                  ${
                    farmer.farmingExperienceYears >= 5
                      ? "bg-green-100 text-green-800"
                      : ""
                  }
                `}
                >
                  {farmer.farmingExperienceYears} năm
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(farmer.createdAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(farmer)}>
                      <Eye className="mr-2 h-4 w-4" /> Xem
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onEdit({
                          ...farmer,
                          cropTypes: parseCropTypes(farmer.cropTypes),
                        });
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(farmer)}
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
            <TableCell colSpan={7} className="h-[300px] text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <p>Không tìm thấy nông dân nào</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
