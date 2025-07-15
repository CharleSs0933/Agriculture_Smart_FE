"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Chẩn đoán bệnh cây trồng bằng AI
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Sử dụng công nghệ trí tuệ nhân tạo để phát hiện và chẩn đoán bệnh
              trên cây trồng một cách nhanh chóng và chính xác
            </p>
          </div>

          <div className="w-full max-w-2xl mt-8">
            <Alert className="bg-red-50 border-red-200">
              <Info className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">
                Thông báo quan trọng
              </AlertTitle>
              <AlertDescription className="text-red-700 inline">
                Hệ thống AI hiện tại chỉ hỗ trợ chẩn đoán bệnh cho{" "}
                <strong>cây lúa</strong> và <strong>cây sầu riêng</strong>.
                Chúng tôi đang phát triển để mở rộng hỗ trợ thêm nhiều loại cây
                trồng khác.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  );
}
