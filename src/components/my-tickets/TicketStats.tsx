"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

interface TicketStatsProps {
  tickets: Ticket[];
  onStatusFilter: (status: string) => void;
}

export function TicketStats({ tickets, onStatusFilter }: TicketStatsProps) {
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  const statItems = [
    {
      label: "Tổng số",
      value: stats.total,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      filter: "all",
    },
    {
      label: "Mở",
      value: stats.open,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      filter: "open",
    },
    {
      label: "Đang xử lý",
      value: stats.inProgress,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      filter: "in_progress",
    },
    {
      label: "Đã giải quyết",
      value: stats.resolved,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      filter: "resolved",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.label}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onStatusFilter(item.filter)}
          >
            <CardContent className="p-6">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.bgColor} mb-4`}
              >
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
