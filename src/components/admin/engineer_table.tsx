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
import { Eye } from "lucide-react";

interface EngineerTableProps {
  engineers: Engineer[];
  onViewDetails: (engineer: Engineer) => void;
}

export const EngineerTable: React.FC<EngineerTableProps> = ({
  engineers,
  onViewDetails,
}) => {
  const parseCertifications = (certificationString: string) => {
    try {
      return JSON.parse(certificationString);
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
        {engineers.map((engineer) => (
          <TableRow key={engineer.id}>
            <TableCell>
              <div>
                <div className="font-medium">{engineer.userName}</div>
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
              <div className="text-sm">
                {parseCertifications(engineer.certification).length} chứng chỉ
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
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Mở menu</span>
                    <Eye className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewDetails(engineer)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
