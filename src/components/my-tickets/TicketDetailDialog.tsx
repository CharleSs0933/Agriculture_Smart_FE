import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Phone,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";

interface TicketDetailDialogProps {
  ticket: Ticket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailDialog({
  ticket,
  open,
  onOpenChange,
}: TicketDetailDialogProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">
            {ticket.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(ticket.status)}`}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1">
                {ticket.status === "open"
                  ? "Mở"
                  : ticket.status === "in_progress"
                  ? "Đang xử lý"
                  : "Đã giải quyết"}
              </span>
            </Badge>
            <Badge
              variant="outline"
              className={getPriorityColor(ticket.priority)}
            >
              {ticket.priority === "high"
                ? "Ưu tiên cao"
                : ticket.priority === "medium"
                ? "Ưu tiên trung bình"
                : "Ưu tiên thấp"}
            </Badge>
            <Badge variant="outline">{ticket.category}</Badge>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Loại cây trồng:</span>
                <span>{ticket.cropType}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Vị trí:</span>
                <span>{ticket.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Số điện thoại:</span>
                <span>{ticket.phoneNumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Ngày tạo:</span>
                <span>
                  {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Cập nhật cuối:</span>
                <span>
                  {new Date(ticket.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              {ticket.resolvedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Ngày giải quyết:</span>
                  <span>
                    {new Date(ticket.resolvedAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Mô tả chi tiết
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {/* Image */}
          {ticket.imageUrl && ticket.imageUrl !== "default.jpg" && (
            <div>
              <h3 className="font-semibold mb-3">Hình ảnh đính kèm</h3>
              <img
                src={ticket.imageUrl || "/placeholder.svg"}
                alt="Ticket attachment"
                className="max-w-full h-auto rounded-lg border"
              />
            </div>
          )}

          {/* Assigned Engineer */}
          {ticket.assignedEngineerId && (
            <div>
              <h3 className="font-semibold mb-3">Kỹ sư phụ trách</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Kỹ sư #{ticket.assignedEngineerId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Chuyên gia nông nghiệp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="font-semibold mb-3">Lịch sử cập nhật</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Ticket được tạo</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              {ticket.assignedEngineerId && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Được phân công cho kỹ sư
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(ticket.updatedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              )}

              {ticket.status === "resolved" && ticket.resolvedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Ticket đã được giải quyết
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(ticket.resolvedAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Liên hệ hỗ trợ
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Tạo ticket liên quan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
