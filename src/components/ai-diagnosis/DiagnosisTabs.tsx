"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketForm } from "@/components/support/ticket-form";
import {
  Info,
  FileText,
  MessageSquare,
  Microscope,
  Droplets,
  AlertCircle,
  Send,
  Leaf,
  Bug,
} from "lucide-react";

interface AnalysisResult {
  plant_name: string;
  disease_name: string;
  confidence: number;
  symptoms: string[];
  description: string;
  treatment: string;
}

interface DiagnosisTabsProps {
  results: AnalysisResult;
  preview: string | null;
}

export function DiagnosisTabs({ results, preview }: DiagnosisTabsProps) {
  return (
    <div className="mx-auto max-w-5xl mt-8">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="info"
            className="flex items-center gap-1 text-xs md:text-sm"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Thông tin bệnh</span>
            <span className="sm:hidden">Thông tin</span>
          </TabsTrigger>
          <TabsTrigger
            value="treatment"
            className="flex items-center gap-1 text-xs md:text-sm"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Phương pháp điều trị</span>
            <span className="sm:hidden">Điều trị</span>
          </TabsTrigger>
          <TabsTrigger
            value="support"
            className="flex items-center gap-1 text-xs md:text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Hỗ trợ chuyên gia</span>
            <span className="sm:hidden">Hỗ trợ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="info"
          className="p-4 bg-white rounded-lg border mt-2"
        >
          <div className="space-y-6">
            {/* Plant and Disease Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-green-800">
                    <Leaf className="h-5 w-5" />
                    Loại cây trồng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-green-700">
                    {results.plant_name}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-red-800">
                    <Bug className="h-5 w-5" />
                    Bệnh được phát hiện
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-red-700">
                    {results.disease_name}
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Độ tin cậy: {results.confidence}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Symptoms */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Microscope className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">
                  Triệu chứng quan sát được
                </h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {results.symptoms.map((symptom, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-600 mt-1">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Mô tả bệnh</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {results.description}
              </p>
            </div>

            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">
                Lưu ý quan trọng
              </AlertTitle>
              <AlertDescription className="text-amber-700">
                Chẩn đoán này chỉ mang tính tham khảo. Để có kết quả chính xác
                nhất, vui lòng tham khảo ý kiến của chuyên gia nông nghiệp.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        <TabsContent
          value="treatment"
          className="p-4 bg-white rounded-lg border mt-2"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Phương pháp điều trị</h3>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                {results.treatment}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-700">
                    Biện pháp phòng ngừa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>
                      Luân canh cây trồng để ngăn ngừa sự tích tụ của mầm bệnh
                    </li>
                    <li>
                      Đảm bảo khoảng cách hợp lý giữa các cây để thông gió tốt
                    </li>
                    <li>Sử dụng giống cây kháng bệnh nếu có thể</li>
                    <li>Kiểm soát độ ẩm và tránh tưới nước quá mức</li>
                    <li>Vệ sinh vườn trồng, loại bỏ cây bệnh kịp thời</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-blue-700">
                    Biện pháp điều trị
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>Loại bỏ và tiêu hủy phần cây bị nhiễm bệnh</li>
                    <li>Sử dụng thuốc bảo vệ thực vật theo hướng dẫn</li>
                    <li>Cải thiện điều kiện thoát nước và thông gió</li>
                    <li>
                      Tăng cường dinh dưỡng cho cây để nâng cao sức đề kháng
                    </li>
                    <li>Theo dõi và xử lý kịp thời khi có dấu hiệu tái phát</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="support"
          className="p-4 bg-white rounded-lg border mt-2"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">
                Nhận hỗ trợ từ chuyên gia
              </h3>
            </div>
            <p className="text-gray-600">
              Bạn cần tư vấn thêm về kết quả chẩn đoán này? Gửi yêu cầu hỗ trợ
              đến các kỹ sư nông nghiệp chuyên nghiệp của chúng tôi.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">
                Thông tin sẽ được gửi kèm:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    <span>Loại cây: {results.plant_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    <span>Bệnh: {results.disease_name}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div>• Độ tin cậy: {results.confidence}%</div>
                  <div>• Hình ảnh đã phân tích</div>
                  <div>• Các triệu chứng được phát hiện</div>
                </div>
              </div>
            </div>

            <TicketForm
              defaultTitle={`Tư vấn về bệnh ${results.disease_name} trên ${results.plant_name}`}
              defaultDescription={`Tôi đã sử dụng AI chẩn đoán và nhận được kết quả:

🌱 Loại cây: ${results.plant_name}
🐛 Bệnh: ${results.disease_name}
📊 Độ tin cậy: ${results.confidence}%

Tôi muốn được tư vấn thêm về:
- Xác nhận chẩn đoán
- Phương pháp điều trị cụ thể cho điều kiện của tôi
- Biện pháp phòng ngừa hiệu quả
- Sản phẩm điều trị phù hợp

Các triệu chứng quan sát được:
${results.symptoms.map((s) => `• ${s}`).join("\n")}

Xin cảm ơn!`}
              defaultImage={preview ? preview : ""}
              aiDiagnosisData={{
                plant_name: results.plant_name,
                disease_name: results.disease_name,
                confidence: results.confidence,
                image: preview || "",
              }}
              trigger={
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Gửi yêu cầu hỗ trợ chuyên gia
                </Button>
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
