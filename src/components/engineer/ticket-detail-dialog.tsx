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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Crop,
  AlertTriangle,
  Clock,
  CheckCircle,
  MessageSquare,
  Save,
  User,
} from "lucide-react";
import Image from "next/image";
import { useUpdateTicketStatusMutation } from "@/state/apiAdmin";
import { toast } from "sonner";

interface TicketDetailDialogProps {
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

export function TicketDetailDialog({
  ticket,
  trigger,
}: TicketDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "open" | "assigned" | "in_progress" | "resolved" | "closed"
  >(ticket.status);
  const [notes, setNotes] = useState("");
  const [updateTicketStatus, { isLoading: isUpdating }] =
    useUpdateTicketStatusMutation();

  const handleStatusUpdate = async () => {
    if (status === ticket.status) {
      return; // No change, do nothing
    }
    await updateTicketStatus({
      id: ticket.id,
      status,
    })
      .unwrap()
      .then(() => {
        toast.success("Cập nhật trạng thái thành công", {
          description: `Trạng thái đã được cập nhật thành ${statusLabels[status]}`,
        });
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Cập nhật trạng thái thất bại", {
          description:
            error?.data?.message || "Đã xảy ra lỗi khi cập nhật trạng thái",
        });
      });
  };

  const handleCompleteTicket = async () => {
    setStatus("resolved");
    await handleStatusUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>
              Ticket #{ticket.id} - {ticket.title}
            </span>
            <Badge className={priorityColors[ticket.priority]}>
              {priorityLabels[ticket.priority]}
            </Badge>
            <Badge className={statusColors[status]}>
              {statusLabels[status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-1">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ticket Info */}
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {ticket.description}
                  </p>
                </div>

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

              {/* Status Update Section */}
              <div className="space-y-4">
                <h4 className="font-semibold">Cập nhật trạng thái</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={status}
                      onValueChange={(value) =>
                        setStatus(
                          value as
                            | "open"
                            | "assigned"
                            | "in_progress"
                            | "resolved"
                            | "closed"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assigned">Đã phân công</SelectItem>
                        <SelectItem value="in_progress">Đang xử lý</SelectItem>
                        <SelectItem value="resolved">Đã giải quyết</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating || status === ticket.status}
                      className="w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Engineer Notes */}
              <div className="space-y-4">
                <Label htmlFor="notes">Ghi chú xử lý</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú về quá trình xử lý ticket..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
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
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Đã được phân công
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Phân công cho {ticket.assignedEngineer?.userName}
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
                  <Image
                    src={ticket.imageUrl}
                    alt="Ticket image"
                    width={600}
                    height={400}
                    className="rounded-lg border max-w-full h-auto"
                  />
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
                          Kinh nghiệm: {ticket.farmer.farmingExperienceYears}{" "}
                          năm
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

              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="font-semibold">Thao tác nhanh</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Gọi điện
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Gửi email
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Complete Ticket */}
              {status !== "resolved" && (
                <div className="space-y-3">
                  <Button
                    onClick={handleCompleteTicket}
                    disabled={isUpdating}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isUpdating ? "Đang xử lý..." : "Hoàn thành ticket"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
