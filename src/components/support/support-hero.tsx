"use client";

import { TicketForm } from "@/components/support/ticket-form";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function SupportHero() {
  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Hỗ Trợ Kỹ Thuật Nông Nghiệp
            </h1>
            <p className="max-w-[1000px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nhận hỗ trợ trực tiếp từ các kỹ sư nông nghiệp chuyên nghiệp. Gửi
              yêu cầu và nhận phản hồi trong vòng 24 giờ.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <TicketForm />
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat trực tiếp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
