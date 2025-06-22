import { Badge } from "@/components/ui/badge";

interface OrderStatusBadgeProps {
  status: Order["status"];
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return { label: "Chờ xử lý", variant: "secondary" as const };
      case "processing":
        return { label: "Đang xử lý", variant: "default" as const };
      case "shipped":
        return { label: "Đang giao", variant: "outline" as const };
      case "delivered":
        return { label: "Đã giao", variant: "default" as const };
      case "cancelled":
        return { label: "Đã hủy", variant: "destructive" as const };
      default:
        return { label: "Không xác định", variant: "secondary" as const };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className="text-xs">
      {config.label}
    </Badge>
  );
}
