"use client";

import { useState } from "react";
import { Search, Eye, Tractor, MapPin, Wheat } from "lucide-react";
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
import { FarmerDetailModal } from "@/components/admin/farmer_detail_modal";
import { Pagination } from "@/components/admin/pagination";
import type { Farmer } from "@/types";

// Extended mock data with 20 farmers for pagination
const mockFarmers: Farmer[] = [
  {
    id: 1004,
    userId: 1007,
    userName: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    phoneNumber: "0933717171",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    farmLocation: "Đồng Tháp",
    farmSize: 5.5,
    cropTypes: '["Lúa", "Rau màu"]',
    farmingExperienceYears: 12,
    createdAt: "2025-06-13T11:54:11.4247325",
    updatedAt: "2025-06-13T11:54:11.4247327",
  },
  {
    id: 1005,
    userId: 1008,
    userName: "Trần Thị Bình",
    email: "tranthibinh@gmail.com",
    phoneNumber: "0912345678",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    farmLocation: "An Giang",
    farmSize: 8.2,
    cropTypes: '["Lúa", "Ngô", "Đậu xanh"]',
    farmingExperienceYears: 18,
    createdAt: "2025-06-12T09:30:15.1234567",
    updatedAt: "2025-06-13T14:20:30.7654321",
  },
  {
    id: 1006,
    userId: 1009,
    userName: "Lê Văn Cường",
    email: "levancuong@gmail.com",
    phoneNumber: "0987654321",
    address: "789 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
    farmLocation: "Cần Thơ",
    farmSize: 3.8,
    cropTypes: '["Rau màu", "Cây ăn trái"]',
    farmingExperienceYears: 8,
    createdAt: "2025-06-10T16:45:22.9876543",
    updatedAt: "2025-06-12T10:15:45.1357924",
  },
  {
    id: 1007,
    userId: 1010,
    userName: "Phạm Thị Dung",
    email: "phamthidung@gmail.com",
    phoneNumber: "0901234567",
    address: "321 Đường Võ Văn Tần, Quận 10, TP.HCM",
    farmLocation: "Long An",
    farmSize: 12.5,
    cropTypes: '["Lúa", "Mía", "Rau màu"]',
    farmingExperienceYears: 25,
    createdAt: "2025-06-08T08:20:10.5432109",
    updatedAt: "2025-06-13T16:30:25.8642097",
  },
  {
    id: 1008,
    userId: 1011,
    userName: "Hoàng Văn Em",
    email: "hoangvanem@gmail.com",
    phoneNumber: "0934567890",
    address: "654 Đường Cách Mạng Tháng 8, Quận Tân Bình, TP.HCM",
    farmLocation: "Tiền Giang",
    farmSize: 6.7,
    cropTypes: '["Lúa", "Cây ăn trái"]',
    farmingExperienceYears: 15,
    createdAt: "2025-06-07T12:10:30.2468135",
    updatedAt: "2025-06-11T09:45:18.9753186",
  },
  {
    id: 1009,
    userId: 1012,
    userName: "Vũ Thị Phương",
    email: "vuthiphuong@gmail.com",
    phoneNumber: "0945678901",
    address: "987 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    farmLocation: "Bến Tre",
    farmSize: 4.3,
    cropTypes: '["Dừa", "Cây ăn trái"]',
    farmingExperienceYears: 10,
    createdAt: "2025-06-05T14:25:45.1357924",
    updatedAt: "2025-06-10T11:20:35.7531864",
  },
  {
    id: 1010,
    userId: 1013,
    userName: "Đặng Văn Giang",
    email: "dangvangiang@gmail.com",
    phoneNumber: "0956789012",
    address: "147 Đường Lý Tự Trọng, Quận 1, TP.HCM",
    farmLocation: "Vĩnh Long",
    farmSize: 9.1,
    cropTypes: '["Lúa", "Rau màu", "Cây ăn trái"]',
    farmingExperienceYears: 20,
    createdAt: "2025-06-03T10:15:20.8642097",
    updatedAt: "2025-06-09T15:40:50.2468135",
  },
  {
    id: 1011,
    userId: 1014,
    userName: "Ngô Thị Hoa",
    email: "ngothihoa@gmail.com",
    phoneNumber: "0967890123",
    address: "258 Đường Pasteur, Quận 3, TP.HCM",
    farmLocation: "Hậu Giang",
    farmSize: 7.6,
    cropTypes: '["Lúa", "Ngô"]',
    farmingExperienceYears: 14,
    createdAt: "2025-06-01T09:30:15.7531864",
    updatedAt: "2025-06-08T13:25:40.1357924",
  },
  // Add more farmers for pagination demo...
  {
    id: 1012,
    userId: 1015,
    userName: "Bùi Văn Khoa",
    email: "buivankhoa@gmail.com",
    phoneNumber: "0978901234",
    address: "369 Đường Hai Bà Trưng, Quận 1, TP.HCM",
    farmLocation: "Sóc Trăng",
    farmSize: 11.2,
    cropTypes: '["Lúa", "Tôm"]',
    farmingExperienceYears: 22,
    createdAt: "2025-05-30T16:45:30.1357924",
    updatedAt: "2025-06-07T12:20:15.7531864",
  },
  {
    id: 1013,
    userId: 1016,
    userName: "Cao Thị Lan",
    email: "caothilan@gmail.com",
    phoneNumber: "0989012345",
    address: "741 Đường Nguyễn Thái Học, Quận Gò Vấp, TP.HCM",
    farmLocation: "Kiên Giang",
    farmSize: 6.8,
    cropTypes: '["Rau màu", "Hoa"]',
    farmingExperienceYears: 9,
    createdAt: "2025-05-28T11:30:45.8642097",
    updatedAt: "2025-06-05T14:15:20.2468135",
  },
  // Continue adding more farmers...
];

export default function FarmersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredFarmers = mockFarmers.filter(
    (farmer) =>
      farmer.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.farmLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredFarmers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentFarmers = filteredFarmers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewDetails = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setIsDetailModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const parseCropTypes = (cropTypesString: string) => {
    try {
      return JSON.parse(cropTypesString);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý Nông dân
          </h1>
          <p className="text-muted-foreground">
            Quản lý thông tin nông dân và trang trại ({totalItems} nông dân)
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số nông dân
            </CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFarmers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng diện tích
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFarmers
                .reduce((sum, farmer) => sum + farmer.farmSize, 0)
                .toFixed(1)}{" "}
              ha
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Kinh nghiệm TB
            </CardTitle>
            <Wheat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockFarmers.reduce(
                  (sum, farmer) => sum + farmer.farmingExperienceYears,
                  0
                ) / mockFarmers.length
              )}{" "}
              năm
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nông dân mới</CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockFarmers.filter(
                  (farmer) =>
                    new Date(farmer.createdAt) >
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
            placeholder="Tìm kiếm nông dân..."
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
                  <TableHead className="min-w-[200px]">Nông dân</TableHead>
                  <TableHead className="min-w-[150px]">Liên hệ</TableHead>
                  <TableHead className="min-w-[200px]">Trang trại</TableHead>
                  <TableHead className="min-w-[150px]">
                    Loại cây trồng
                  </TableHead>
                  <TableHead className="min-w-[120px]">Kinh nghiệm</TableHead>
                  <TableHead className="min-w-[120px]">Ngày tạo</TableHead>
                  <TableHead className="w-[100px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{farmer.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: #{farmer.id}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{farmer.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {farmer.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {farmer.farmLocation}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {farmer.farmSize > 0
                            ? `${farmer.farmSize} ha`
                            : "Chưa xác định"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {parseCropTypes(farmer.cropTypes)
                          .slice(0, 2)
                          .map((crop: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
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
                      <Badge variant="outline">
                        {farmer.farmingExperienceYears} năm
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(farmer.createdAt)}
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
                            onClick={() => handleViewDetails(farmer)}
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
      <FarmerDetailModal
        farmer={selectedFarmer}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
}
