import { Badge } from "@/components/ui/badge";

interface PaymentStatusBadgeProps {
  status: Order["paymentStatus"];
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const getStatusConfig = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "pending":
        return { label: "Chờ thanh toán", variant: "secondary" as const };
      case "paid":
        return { label: "Đã thanh toán", variant: "default" as const };
      case "failed":
        return {
          label: "Thanh toán thất bại",
          variant: "destructive" as const,
        };
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
