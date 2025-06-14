"use client";

import { useState } from "react";
import { Search, Eye, HardHat, Award, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EngineerDetailModal } from "@/components/admin/engineer_detail_modal";
import { Pagination } from "@/components/admin/pagination";
import type { Engineer } from "@/types";

// Extended mock data with 16 engineers for pagination
const mockEngineers: Engineer[] = [
  {
    id: 1,
    userId: 2,
    userName: "Nguyễn Văn An",
    email: "nguyenvana@agricultural.com",
    phoneNumber: "0902345678",
    address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
    specialization: "Bệnh học thực vật",
    experienceYears: 8,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Chuyên gia Bệnh học thực vật"]',
    bio: "Chuyên gia về bệnh hại cây trồng với 8 năm kinh nghiệm trong lĩnh vực chẩn đoán và điều trị bệnh lúa, rau màu.",
    createdAt: "2025-06-12T09:09:04.4115059",
    updatedAt: "2025-06-12T09:09:04.4115059",
  },
  {
    id: 2,
    userId: 3,
    userName: "Trần Thị Bình",
    email: "tranthibinh@agricultural.com",
    phoneNumber: "0913456789",
    address: "789 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    specialization: "Dinh dưỡng cây trồng",
    experienceYears: 12,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Chuyên gia Dinh dưỡng thực vật", "Chứng chỉ Phân bón hữu cơ"]',
    bio: "Chuyên gia dinh dưỡng cây trồng với hơn 12 năm kinh nghiệm tư vấn về phân bón và dinh dưỡng cho các loại cây trồng.",
    createdAt: "2025-06-10T14:20:15.1234567",
    updatedAt: "2025-06-13T10:30:25.7654321",
  },
  {
    id: 3,
    userId: 4,
    userName: "Lê Văn Cường",
    email: "levancuong@agricultural.com",
    phoneNumber: "0924567890",
    address: "321 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
    specialization: "Kỹ thuật canh tác",
    experienceYears: 6,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Kỹ thuật canh tác hiện đại"]',
    bio: "Kỹ sư chuyên về kỹ thuật canh tác hiện ��ại, tư vấn về quy trình sản xuất và công nghệ nông nghiệp.",
    createdAt: "2025-06-08T11:45:30.9876543",
    updatedAt: "2025-06-12T16:15:45.1357924",
  },
  {
    id: 4,
    userId: 5,
    userName: "Phạm Thị Dung",
    email: "phamthidung@agricultural.com",
    phoneNumber: "0935678901",
    address: "654 Đường Võ Văn Tần, Quận 10, TP.HCM",
    specialization: "Côn trùng học",
    experienceYears: 15,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Chuyên gia Côn trùng học", "Chứng chỉ Quản lý dịch hại tổng hợp"]',
    bio: "Chuyên gia côn trùng học với 15 năm kinh nghiệm trong việc nghiên cứu và phòng trừ sâu bệnh hại cây trồng.",
    createdAt: "2025-06-05T08:30:20.5432109",
    updatedAt: "2025-06-11T14:25:35.8642097",
  },
  {
    id: 5,
    userId: 6,
    userName: "Hoàng Văn Em",
    email: "hoangvanem@agricultural.com",
    phoneNumber: "0946789012",
    address: "987 Đường Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
    specialization: "Công nghệ sinh học",
    experienceYears: 10,
    certification:
      '["Chứng chỉ Kỹ sư Sinh học", "Chứng chỉ Công nghệ sinh học ứng dụng", "Chứng chỉ Giống cây trồng"]',
    bio: "Kỹ sư công nghệ sinh học chuyên về phát triển giống cây trồng và ứng dụng công nghệ sinh học trong nông nghiệp.",
    createdAt: "2025-06-03T13:15:45.2468135",
    updatedAt: "2025-06-09T09:40:20.9753186",
  },
  {
    id: 6,
    userId: 7,
    userName: "Vũ Thị Phương",
    email: "vuthiphuong@agricultural.com",
    phoneNumber: "0957890123",
    address: "147 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    specialization: "Thổ nhưỡng học",
    experienceYears: 9,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Chuyên gia Thổ nhưỡng", "Chứng chỉ Phân tích đất"]',
    bio: "Chuyên gia thổ nhưỡng học với kinh nghiệm phân tích đất và tư vấn cải tạo đất cho sản xuất nông nghiệp.",
    createdAt: "2025-06-01T10:25:30.1357924",
    updatedAt: "2025-06-07T15:50:15.7531864",
  },
  {
    id: 7,
    userId: 8,
    userName: "Đặng Văn Giang",
    email: "dangvangiang@agricultural.com",
    phoneNumber: "0968901234",
    address: "258 Đường Lý Tự Trọng, Quận 1, TP.HCM",
    specialization: "Tưới tiêu và thủy lợi",
    experienceYears: 14,
    certification:
      '["Chứng chỉ Kỹ sư Thủy lợi", "Chứng chỉ Hệ thống tưới tiêu", "Chứng chỉ Quản lý nước nông nghiệp"]',
    bio: "Kỹ sư thủy lợi chuyên về thiết kế và quản lý hệ thống tưới tiêu, tối ưu hóa việc sử dụng nước trong nông nghiệp.",
    createdAt: "2025-05-30T16:40:25.8642097",
    updatedAt: "2025-06-05T12:35:40.2468135",
  },
  {
    id: 8,
    userId: 9,
    userName: "Ngô Thị Hoa",
    email: "ngothihoa@agricultural.com",
    phoneNumber: "0979012345",
    address: "369 Đường Pasteur, Quận 3, TP.HCM",
    specialization: "Chăn nuôi",
    experienceYears: 11,
    certification:
      '["Chứng chỉ Kỹ sư Chăn nuôi", "Chứng chỉ Thú y", "Chứng chỉ Dinh dưỡng động vật"]',
    bio: "Kỹ sư chăn nuôi với kinh nghiệm tư vấn về kỹ thuật chăn nuôi, dinh dưỡng và chăm sóc sức khỏe động vật.",
    createdAt: "2025-05-28T12:20:15.7531864",
    updatedAt: "2025-06-03T08:45:30.1357924",
  },
  // Add more engineers for pagination demo...
  {
    id: 9,
    userId: 10,
    userName: "Bùi Văn Khoa",
    email: "buivankhoa@agricultural.com",
    phoneNumber: "0980123456",
    address: "741 Đường Hai Bà Trưng, Quận 1, TP.HCM",
    specialization: "Máy móc nông nghiệp",
    experienceYears: 7,
    certification:
      '["Chứng chỉ Kỹ sư Cơ khí", "Chứng chỉ Máy móc nông nghiệp", "Chứng chỉ Bảo trì thiết bị"]',
    bio: "Kỹ sư cơ khí chuyên về máy móc nông nghiệp, tư vấn lựa chọn và bảo trì thiết bị cho sản xuất nông nghiệp.",
    createdAt: "2025-05-25T14:35:40.8642097",
    updatedAt: "2025-06-01T11:20:25.2468135",
  },
  {
    id: 10,
    userId: 11,
    userName: "Cao Thị Lan",
    email: "caothilan@agricultural.com",
    phoneNumber: "0991234567",
    address: "852 Đường Nguyễn Thái Học, Quận Gò Vấp, TP.HCM",
    specialization: "Hậu thu hoạch",
    experienceYears: 13,
    certification:
      '["Chứng chỉ Kỹ sư Nông nghiệp", "Chứng chỉ Công nghệ hậu thu hoạch", "Chứng chỉ Bảo quản nông sản"]',
    bio: "Chuyên gia công nghệ hậu thu hoạch với kinh nghiệm tư vấn về bảo quản, chế biến và nâng cao chất lượng nông sản.",
    createdAt: "2025-05-22T09:50:20.7531864",
    updatedAt: "2025-05-30T16:15:35.1357924",
  },
  // Continue adding more engineers...
];

export default function EngineersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredEngineers = mockEngineers.filter(
    (engineer) =>
      engineer.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      engineer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredEngineers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEngineers = filteredEngineers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewDetails = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsDetailModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const parseCertifications = (certificationString: string) => {
    try {
      return JSON.parse(certificationString);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Kỹ sư</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin kỹ sư nông nghiệp ({totalItems} kỹ sư)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số kỹ sư</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEngineers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kinh nghiệm TB
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockEngineers.reduce(
                  (sum, engineer) => sum + engineer.experienceYears,
                  0
                ) / mockEngineers.length
              )}{" "}
              năm
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chứng chỉ TB</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockEngineers.reduce(
                  (sum, engineer) =>
                    sum + parseCertifications(engineer.certification).length,
                  0
                ) / mockEngineers.length
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kỹ sư mới</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockEngineers.filter(
                  (engineer) =>
                    new Date(engineer.createdAt) >
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm kỹ sư..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
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
                {currentEngineers.map((engineer) => (
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
                      <Badge variant="secondary">
                        {engineer.specialization}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {parseCertifications(engineer.certification).length}{" "}
                        chứng chỉ
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {engineer.experienceYears} năm
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(engineer.createdAt)}
                      </div>
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
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(engineer)}
                          >
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
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <EngineerDetailModal
        engineer={selectedEngineer}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
}
