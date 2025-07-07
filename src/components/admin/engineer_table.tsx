import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

interface EngineerTableProps {
  engineers: Engineer[];
  onViewDetails: (engineer: Engineer) => void;
  onEdit: (engineer: Engineer) => void;
  onDelete: (engineer: Engineer) => void;
}

export function EngineerTable({
  engineers,
  onViewDetails,
  onEdit,
  onDelete,
}: EngineerTableProps) {
  const parseCertifications = (certificationString: string) => {
    try {
      const parsed = JSON.parse(certificationString);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Kỹ sư</TableHead>
          <TableHead className="min-w-[150px]">Liên hệ</TableHead>
          <TableHead className="min-w-[180px]">Chuyên môn</TableHead>
          <TableHead className="min-w-[150px]">Chứng chỉ</TableHead>
          <TableHead className="min-w-[120px]">Kinh nghiệm</TableHead>
          <TableHead className="min-w-[120px]">Ngày tạo</TableHead>
          <TableHead className="w-[100px]">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {engineers.length > 0 ? (
          engineers.map((engineer) => (
            <TableRow key={engineer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{engineer.username}</div>
                  <div className="text-sm text-muted-foreground">
                    ID: #{engineer.id}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">{engineer.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {engineer.phoneNumber}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{engineer.specialization}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {parseCertifications(engineer.certification)
                    .slice(0, 2)
                    .map((cropType, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {cropType}
                      </Badge>
                    ))}
                  {parseCertifications(engineer.certification).length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{parseCertifications(engineer.certification).length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{engineer.experienceYears} năm</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{formatDate(engineer.createdAt)}</div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDetails(engineer)}>
                      <Eye className="mr-2 h-4 w-4" /> Xem
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        onEdit(engineer);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete(engineer)}
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
                <p>Không tìm thấy kỹ sư nào nào</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
