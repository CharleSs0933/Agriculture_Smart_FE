"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Crop,
  AlertTriangle,
  Clock,
  CheckCircle,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

interface TicketDetailModalProps {
  ticket: Ticket;
  trigger: React.ReactNode;
}

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

export function TicketDetailModal({ ticket, trigger }: TicketDetailModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-4xl max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Chi tiết Ticket #{ticket.id}</span>
            <Badge className={priorityColors[ticket.priority]}>
              {priorityLabels[ticket.priority]}
            </Badge>
            <Badge className={statusColors[ticket.status]}>
              {statusLabels[ticket.status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {ticket.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Crop className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Loại cây:</strong> {ticket.cropType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Danh mục:</strong> {ticket.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Địa điểm:</strong> {ticket.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Liên hệ:</strong> {ticket.contactMethod}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="font-semibold">Lịch sử xử lý</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Ticket được tạo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>

                {ticket.assignedEngineer && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Đã phân công kỹ sư
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Phân công cho {ticket.assignedEngineer?.username}
                      </p>
                    </div>
                  </div>
                )}

                {ticket.resolvedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Đã giải quyết
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(ticket.resolvedAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            {ticket.imageUrl && ticket.imageUrl !== "default.jpg" && (
              <div className="space-y-2">
                <h4 className="font-semibold">Hình ảnh đính kèm</h4>
                <div className="relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=400`}
                    alt="Ticket image"
                    className="rounded-lg border max-w-full h-auto"
                    fill
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Farmer Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Thông tin nông dân</h4>
              {ticket.farmer ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {ticket.farmer.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{ticket.farmer.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.farmer.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.farmer.phoneNumber}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{ticket.farmer.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Crop className="h-4 w-4 text-muted-foreground" />
                      <span>Diện tích: {ticket.farmer.farmSize} ha</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Kinh nghiệm: {ticket.farmer.farmingExperienceYears} năm
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Không có thông tin nông dân
                </p>
              )}
            </div>

            <Separator />

            {/* Assigned Engineer */}
            <div className="space-y-4">
              <h4 className="font-semibold">Kỹ sư phụ trách</h4>
              {ticket.assignedEngineer ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {ticket.assignedEngineer.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {ticket.assignedEngineer.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ticket.assignedEngineer.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.assignedEngineer.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{ticket.assignedEngineer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Kinh nghiệm: {ticket.assignedEngineer.experienceYears}{" "}
                        năm
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <UserPlus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Chưa phân công kỹ sư</p>
                  <Button size="sm" className="mt-2">
                    Phân công kỹ sư
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <h4 className="font-semibold">Thao tác</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Gửi tin nhắn
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi điện
                </Button>
                {ticket.status !== "resolved" && (
                  <Button className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Đánh dấu đã giải quyết
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
