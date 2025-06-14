"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { TicketDetailModal } from "@/components/admin/ticket_detail_modal";
import { TicketFormDialog } from "@/components/admin/ticket_form_dialog";
import { AssignEngineerDialog } from "@/components/admin/assign_engineer_dialog";
import { BulkActions } from "@/components/admin/bulk_actions";
import { Pagination } from "@/components/admin/pagination";
import {
  Search,
  Plus,
  Eye,
  UserPlus,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

// Thêm vào đầu component, sau các import
const styles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Define the Ticket type
type Ticket = {
  id: number;
  title: string;
  category: string;
  cropType: string;
  location: string;
  description: string;
  priority: string;
  contactMethod: string;
  phoneNumber: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  farmerId: number;
  assignedEngineerId: number | null;
  farmer?: {
    id: number;
    userId: number;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    farmLocation: string;
    farmSize: number;
    cropTypes: string;
    farmingExperienceYears: number;
    createdAt: string;
    updatedAt: string;
  };
  assignedEngineer?: {
    id: number;
    userId: number;
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
    specialization: string;
    experienceYears: number;
    certification: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
};

const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Cây lúa bị vàng lá bất thường",
    category: "Bệnh cây trồng",
    cropType: "Lúa",
    location: "Ruộng A1, Ấp 2, Xã Tân Hiệp",
    description:
      "Lúa của tôi đang trong giai đoạn trỗ bông nhưng lá bắt đầu vàng từ gốc lên, cần hỗ trợ khẩn cấp.",
    priority: "high",
    contactMethod: "Điện thoại",
    phoneNumber: "0901234567",
    imageUrl: "rice-disease.jpg",
    status: "in_progress",
    createdAt: "2024-01-15T08:30:00",
    updatedAt: "2024-01-16T10:15:00",
    resolvedAt: null,
    farmerId: 1,
    assignedEngineerId: 1,
    farmer: {
      id: 1,
      userId: 1,
      userName: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phoneNumber: "0901234567",
      address: "Ấp 2, Xã Tân Hiệp, Huyện Châu Thành",
      farmLocation: "Ruộng A1",
      farmSize: 2.5,
      cropTypes: "Lúa, Ngô",
      farmingExperienceYears: 15,
      createdAt: "2024-01-01T00:00:00",
      updatedAt: "2024-01-01T00:00:00",
    },
    assignedEngineer: {
      id: 1,
      userId: 11,
      userName: "TS. Nguyễn Văn Minh",
      email: "tsnguyenvanminh@email.com",
      phoneNumber: "0911234567",
      address: "123 Đường ABC, TP. Cần Thơ",
      specialization: "Bệnh cây trồng",
      experienceYears: 12,
      certification: "Tiến sĩ Nông nghiệp",
      bio: "Chuyên gia về bệnh cây trồng với 12 năm kinh nghiệm",
      createdAt: "2024-01-01T00:00:00",
      updatedAt: "2024-01-01T00:00:00",
    },
  },
  {
    id: 2,
    title: "Sâu cuốn lá trên cây ngô",
    category: "Sâu hại",
    cropType: "Ngô",
    location: "Ruộng B2, Ấp 3, Xã Long An",
    description:
      "Phát hiện sâu cuốn lá trên ruộng ngô, diện tích khoảng 2 hecta, cần tư vấn biện pháp phòng trừ.",
    priority: "urgent",
    contactMethod: "Zalo",
    phoneNumber: "0902345678",
    imageUrl: "corn-pest.jpg",
    status: "resolved",
    createdAt: "2024-01-12T14:20:00",
    updatedAt: "2024-01-14T16:45:00",
    resolvedAt: "2024-01-14T16:45:00",
    farmerId: 2,
    assignedEngineerId: 2,
    farmer: {
      id: 2,
      userId: 2,
      userName: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phoneNumber: "0902345678",
      address: "Ấp 3, Xã Long An, Huyện Phong Điền",
      farmLocation: "Ruộng B2",
      farmSize: 3.0,
      cropTypes: "Ngô, Đậu",
      farmingExperienceYears: 8,
      createdAt: "2024-01-01T00:00:00",
      updatedAt: "2024-01-01T00:00:00",
    },
    assignedEngineer: {
      id: 2,
      userId: 12,
      userName: "KS. Lê Thị Hoa",
      email: "kslethihoa@email.com",
      phoneNumber: "0912345678",
      address: "456 Đường DEF, TP. Cần Thơ",
      specialization: "Sâu hại",
      experienceYears: 8,
      certification: "Kỹ sư Bảo vệ thực vật",
      bio: "Chuyên gia về sâu hại cây trồng",
      createdAt: "2024-01-01T00:00:00",
      updatedAt: "2024-01-01T00:00:00",
    },
  },
  {
    id: 3,
    title: "Tư vấn phân bón cho cà phê",
    category: "Dinh dưỡng cây trồng",
    cropType: "Cà phê",
    location: "Vườn C3, Ấp 1, Xã Tân Phú",
    description:
      "Cần tư vấn về lịch bón phân cho cà phê trong mùa khô, cây đang trong giai đoạn ra hoa.",
    priority: "medium",
    contactMethod: "Email",
    phoneNumber: "0903456789",
    imageUrl: "coffee-nutrition.jpg",
    status: "open",
    createdAt: "2024-01-10T09:15:00",
    updatedAt: "2024-01-10T09:15:00",
    resolvedAt: null,
    farmerId: 3,
    assignedEngineerId: null,
  },
  {
    id: 4,
    title: "Hệ thống tưới nhỏ giọt cho rau màu",
    category: "Kỹ thuật canh tác",
    cropType: "Rau màu",
    location: "Ruộng D4, Ấp 4, Xã Hòa Bình",
    description:
      "Muốn thiết kế hệ thống tưới nhỏ giọt cho 1000m² rau màu, cần tư vấn kỹ thuật và chi phí.",
    priority: "medium",
    contactMethod: "Điện thoại",
    phoneNumber: "0904567890",
    imageUrl: "irrigation-system.jpg",
    status: "assigned",
    createdAt: "2024-01-08T11:30:00",
    updatedAt: "2024-01-12T14:20:00",
    resolvedAt: null,
    farmerId: 4,
    assignedEngineerId: 3,
    assignedEngineer: {
      id: 3,
      userId: 13,
      userName: "KS. Phạm Văn Tùng",
      email: "ksphamvantung@email.com",
      phoneNumber: "0913456789",
      address: "789 Đường GHI, TP. Cần Thơ",
      specialization: "Kỹ thuật canh tác",
      experienceYears: 10,
      certification: "Kỹ sư Cơ khí nông nghiệp",
      bio: "Chuyên gia về hệ thống tưới tiêu",
      createdAt: "2024-01-01T00:00:00",
      updatedAt: "2024-01-01T00:00:00",
    },
  },
  {
    id: 5,
    title: "Đất bị chua, cây trồng sinh trưởng kém",
    category: "Đất đai",
    cropType: "Rau màu",
    location: "Ruộng E1, Ấp 5, Xã Tân Trụ",
    description:
      "Đất trồng rau của tôi có vẻ bị chua, cây trồng sinh trưởng chậm, lá vàng. Cần tư vấn cách cải tạo đất.",
    priority: "medium",
    contactMethod: "Điện thoại",
    phoneNumber: "0909012345",
    imageUrl: "default.jpg",
    status: "open",
    createdAt: "2025-06-11T21:09:04.4115059",
    updatedAt: "2025-06-11T21:09:04.4115059",
    resolvedAt: null,
    farmerId: 5,
    assignedEngineerId: null,
  },
];

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColors = {
  open: "bg-yellow-100 text-yellow-800",
  assigned: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const priorityLabels = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
  urgent: "Khẩn cấp",
};

const statusLabels = {
  open: "Mở",
  assigned: "Đã phân công",
  in_progress: "Đang xử lý",
  resolved: "Đã giải quyết",
  closed: "Đã đóng",
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "open":
      return <AlertTriangle className="h-4 w-4" />;
    case "assigned":
      return <UserPlus className="h-4 w-4" />;
    case "in_progress":
      return <Clock className="h-4 w-4" />;
    case "resolved":
      return <CheckCircle className="h-4 w-4" />;
    case "closed":
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export default function AdminTickets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter tickets
  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.farmer?.userName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        ticket.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || ticket.priority === priorityFilter;
      const matchesCategory =
        categoryFilter === "all" || ticket.category === categoryFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + pageSize
  );

  // Statistics
  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter((t) => t.status === "open").length,
    assigned: mockTickets.filter((t) => t.status === "assigned").length,
    inProgress: mockTickets.filter((t) => t.status === "in_progress").length,
    resolved: mockTickets.filter((t) => t.status === "resolved").length,
    urgent: mockTickets.filter((t) => t.priority === "urgent").length,
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(paginatedTickets.map((ticket) => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (ticketId: number, checked: boolean) => {
    if (checked) {
      setSelectedTickets([...selectedTickets, ticketId]);
    } else {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
    }
  };

  const handleBulkAction = (action: string, ticketIds: number[]) => {
    console.log("Bulk action:", action, "for tickets:", ticketIds);
    // Implement bulk actions here
  };

  const categories = Array.from(new Set(mockTickets.map((t) => t.category)));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Ticket</h1>
          <p className="text-muted-foreground">
            Xử lý các yêu cầu hỗ trợ từ nông dân
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Ticket</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Tất cả ticket</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mở</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.open}
              </div>
              <p className="text-xs text-muted-foreground">Chờ xử lý</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đã phân công
              </CardTitle>
              <UserPlus className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.assigned}
              </div>
              <p className="text-xs text-muted-foreground">Có kỹ sư</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.inProgress}
              </div>
              <p className="text-xs text-muted-foreground">Đang giải quyết</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Đã giải quyết
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.resolved}
              </div>
              <p className="text-xs text-muted-foreground">Hoàn thành</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khẩn cấp</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.urgent}
              </div>
              <p className="text-xs text-muted-foreground">Ưu tiên cao</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách Ticket</CardTitle>
            <CardDescription>
              Quản lý và xử lý các yêu cầu hỗ trợ từ nông dân
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm ticket, nông dân, địa điểm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <TicketFormDialog
                  trigger={
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo Ticket
                    </Button>
                  }
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="open">Mở</SelectItem>
                    <SelectItem value="assigned">Đã phân công</SelectItem>
                    <SelectItem value="in_progress">Đang xử lý</SelectItem>
                    <SelectItem value="resolved">Đã giải quyết</SelectItem>
                    <SelectItem value="closed">Đã đóng</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Độ ưu tiên" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả độ ưu tiên</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            <BulkActions
              selectedItems={selectedTickets}
              onBulkAction={handleBulkAction}
              onClearSelection={() => setSelectedTickets([])}
            />

            {/* Table */}
            <div className="rounded-md border custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedTickets.length === paginatedTickets.length &&
                          paginatedTickets.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-16">ID</TableHead>
                    <TableHead className="min-w-[300px]">Ticket</TableHead>
                    <TableHead className="w-32">Độ ưu tiên</TableHead>
                    <TableHead className="w-32">Trạng thái</TableHead>
                    <TableHead className="min-w-[200px]">Kỹ sư</TableHead>
                    <TableHead className="w-32">Ngày tạo</TableHead>
                    <TableHead className="w-24 text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedTickets.includes(ticket.id)}
                          onCheckedChange={(checked) =>
                            handleSelectTicket(ticket.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        #{ticket.id}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium text-sm leading-tight line-clamp-2">
                            {ticket.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">
                              {ticket.farmer?.userName || "N/A"}
                            </span>
                            <span>•</span>
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              {ticket.category}
                            </Badge>
                            <span>•</span>
                            <span>{ticket.cropType}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{ticket.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{ticket.phoneNumber}</span>
                            <span className="ml-2 px-1 py-0.5 bg-gray-100 rounded text-xs">
                              {ticket.contactMethod}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[ticket.priority]}>
                          {priorityLabels[ticket.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={ticket.status} />
                          <Badge className={statusColors[ticket.status]}>
                            {statusLabels[ticket.status]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {ticket.assignedEngineer ? (
                          <div className="space-y-1">
                            <div className="font-medium text-sm">
                              {ticket.assignedEngineer.userName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {ticket.assignedEngineer.specialization}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {ticket.assignedEngineer.experienceYears} năm KN
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <span className="text-sm text-muted-foreground">
                              Chưa phân công
                            </span>
                            <div className="mt-1">
                              <AssignEngineerDialog
                                ticketId={ticket.id}
                                trigger={
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs"
                                  >
                                    <UserPlus className="h-3 w-3 mr-1" />
                                    Gán KS
                                  </Button>
                                }
                              />
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {new Date(ticket.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(ticket.createdAt).toLocaleTimeString(
                              "vi-VN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <TicketDetailModal
                          ticket={ticket}
                          trigger={
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredTickets.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
