"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TicketForm } from "@/components/support/ticket-form";
import {
  Leaf,
  Send,
  Clock,
  AlertCircle,
  Search,
  MessageSquare,
  User,
  Calendar,
  Eye,
} from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  engineer?: string;
  responses: number;
}

const mockTickets: Ticket[] = [
  {
    id: "AG0001",
    title: "Cây lúa bị vàng lá bất thường",
    description:
      "Lúa của tôi đang trong giai đoạn trỗ bông nhưng lá bắt đầu vàng từ gốc lên...",
    category: "Bệnh cây trồng",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-16",
    engineer: "TS. Nguyễn Văn An",
    responses: 3,
  },
  {
    id: "AG0002",
    title: "Sâu cuốn lá trên cây ngô",
    description:
      "Phát hiện sâu cuốn lá trên ruộng ngô, diện tích khoảng 2 hecta...",
    category: "Sâu hại",
    priority: "urgent",
    status: "resolved",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-14",
    engineer: "KS. Trần Thị Bình",
    responses: 5,
  },
  {
    id: "AG0003",
    title: "Tư vấn phân bón cho cà phê",
    description: "Cần tư vấn về lịch bón phân cho cà phê trong mùa khô...",
    category: "Dinh dưỡng cây trồng",
    priority: "medium",
    status: "pending",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
    responses: 0,
  },
];

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  pending: "Chờ xử lý",
  "in-progress": "Đang xử lý",
  resolved: "Đã giải quyết",
  closed: "Đã đóng",
};

const priorityLabels = {
  low: "Thấp",
  medium: "Trung bình",
  high: "Cao",
  urgent: "Khẩn cấp",
};

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || ticket.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-xl font-bold">Agriculture Smart</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Trang chủ
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/ai-diagnosis"
          >
            AI Chẩn đoán
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/support"
          >
            Hỗ trợ
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Hỗ Trợ Kỹ Thuật Nông Nghiệp
                </h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nhận hỗ trợ trực tiếp từ các kỹ sư nông nghiệp chuyên nghiệp.
                  Gửi yêu cầu và nhận phản hồi trong vòng 24 giờ.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <TicketForm />
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat trực tiếp
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-2xl font-bold text-green-600">24h</div>
                  <div className="text-sm text-gray-500">
                    Thời gian phản hồi
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-500">Tỷ lệ giải quyết</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-500">
                    Kỹ sư chuyên nghiệp
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="text-2xl font-bold text-green-600">1000+</div>
                  <div className="text-sm text-gray-500">
                    Ticket đã giải quyết
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tickets Management */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Quản lý yêu cầu hỗ trợ
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                Theo dõi trạng thái và lịch sử các yêu cầu hỗ trợ của bạn.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm ticket..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 mb-6">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                  size="sm"
                >
                  Tất cả
                </Button>
                <Button
                  variant={selectedStatus === "pending" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("pending")}
                  size="sm"
                >
                  Chờ xử lý
                </Button>
                <Button
                  variant={
                    selectedStatus === "in-progress" ? "default" : "outline"
                  }
                  onClick={() => setSelectedStatus("in-progress")}
                  size="sm"
                >
                  Đang xử lý
                </Button>
                <Button
                  variant={
                    selectedStatus === "resolved" ? "default" : "outline"
                  }
                  onClick={() => setSelectedStatus("resolved")}
                  size="sm"
                >
                  Đã giải quyết
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{ticket.id}</Badge>
                          <Badge className={priorityColors[ticket.priority]}>
                            {priorityLabels[ticket.priority]}
                          </Badge>
                          <Badge className={statusColors[ticket.status]}>
                            {statusLabels[ticket.status]}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">
                          {ticket.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {ticket.description}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Tạo:{" "}
                        {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Cập nhật:{" "}
                        {new Date(ticket.updatedAt).toLocaleDateString("vi-VN")}
                      </div>
                      {ticket.engineer && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {ticket.engineer}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {ticket.responses} phản hồi
                      </div>
                      <Badge variant="secondary">{ticket.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTickets.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    Không tìm thấy ticket nào
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.
                  </p>
                  <TicketForm
                    trigger={
                      <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Tạo ticket mới
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Câu hỏi thường gặp
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed">
                Tìm câu trả lời nhanh cho những vấn đề phổ biến.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Thời gian phản hồi là bao lâu?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Chúng tôi cam kết phản hồi trong vòng 24 giờ cho tất cả các
                    yêu cầu. Các trường hợp khẩn cấp sẽ được ưu tiên xử lý.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Có mất phí không?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Dịch vụ tư vấn cơ bản hoàn toàn miễn phí. Các dịch vụ chuyên
                    sâu có thể có phí tùy theo yêu cầu cụ thể.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Làm sao để theo dõi ticket?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Bạn sẽ nhận được mã ticket và có thể theo dõi trạng thái qua
                    email hoặc đăng nhập vào tài khoản.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">
          © 2024 Agriculture Smart. Bản quyền thuộc về Agriculture Smart.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Điều khoản dịch vụ
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Chính sách bảo mật
          </Link>
        </nav>
      </footer>
    </div>
  );
}
