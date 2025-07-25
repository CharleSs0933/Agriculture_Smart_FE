import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Phone,
  UserPlus,
  XCircle,
} from "lucide-react";
import { TicketDetailModal } from "../admin/ticket_detail_modal";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AssignEngineerDialog } from "../admin/assign_engineer_dialog";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

// Define the Ticket type
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

export function TicketTableSkeleton() {
  return (
    <div className="roumded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
          {[...Array(5)].map((_, idx) => (
            <TableRow key={`skeleton-${idx}`}>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-10" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 mx-auto" />
                  <Skeleton className="h-3 w-20 mx-auto" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16 mt-1" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-8 ml-auto rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function TicketTable({
  ticketsData,
}: //   handleViewPost,
//   handleEditPost,
{
  ticketsData: ApiResponse<Ticket> | undefined;
  //   handleViewPost: (ticketId: number) => void;
  //   handleEditPost: (ticketId: number) => void;
}) {
  return (
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          <TableRow>
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
          {ticketsData && ticketsData.items.length > 0 ? (
            ticketsData.items.map((ticket) => (
              <TableRow key={ticket.id} className="hover:bg-muted/50">
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
                      <Badge variant="outline" className="text-xs px-1 py-0">
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
                <TableCell className="text-center">
                  {ticket.assignedEngineer ? (
                    <div className="space-y-1">
                      <div className="font-medium text-sm">
                        {ticket.assignedEngineer.username}
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
                      {new Date(ticket.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(ticket.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Khoong tim thay ket qua
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
