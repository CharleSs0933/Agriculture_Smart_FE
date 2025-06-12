"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, Users, MessageSquare } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "24h",
    label: "Thời gian phản hồi",
    description: "Trung bình",
  },
  {
    icon: CheckCircle,
    value: "98%",
    label: "Tỷ lệ giải quyết",
    description: "Thành công",
  },
  {
    icon: Users,
    value: "50+",
    label: "Kỹ sư chuyên nghiệp",
    description: "Sẵn sàng hỗ trợ",
  },
  {
    icon: MessageSquare,
    value: "1000+",
    label: "Ticket đã giải quyết",
    description: "Trong tháng này",
  },
];

export function SupportStats() {
  return (
    <section className="w-full py-12">
      <div className=" px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Icon className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
