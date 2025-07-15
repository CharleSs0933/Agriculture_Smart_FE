"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Stethoscope,
  Pill,
  ImageIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import { TicketForm } from "../support/ticket-form";
import Image from "next/image";

interface DiagnosisTabsProps {
  results: AnalysisResult;
  preview: string | null;
}

export function DiagnosisTabs({ results, preview }: DiagnosisTabsProps) {
  // Prepare ticket data from AI analysis
  const ticketTitle = `Tư vấn về bệnh ${results.disease_name} trên ${results.plant_name}`;
  const ticketDescription = `Tôi đã sử dụng AI chẩn đoán và nhận được kết quả:

🌱 Loại cây: ${results.plant_name}
🐛 Bệnh: ${results.disease_name}

Tôi muốn được tư vấn thêm về:
- Xác nhận chẩn đoán
- Phương pháp điều trị cụ thể cho điều kiện của tôi
- Biện pháp phòng ngừa hiệu quả
- Sản phẩm điều trị phù hợp

Các triệu chứng quan sát được:
${results.symptoms.map((s) => `• ${s}`).join("\n")}

Mô tả bệnh:
${results.description.map((d) => `• ${d}`).join("\n")}

Xin cảm ơn!`;

  return (
    <div className="mx-auto max-w-5xl mt-8">
      <Tabs defaultValue="symptoms" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="symptoms" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Triệu chứng</span>
          </TabsTrigger>
          <TabsTrigger value="diagnosis" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">Chẩn đoán</span>
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden sm:inline">Điều trị</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Hình ảnh</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Hỗ trợ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Triệu chứng bệnh
              </CardTitle>
              <CardDescription>
                Các dấu hiệu và triệu chứng của bệnh {results.disease_name} trên{" "}
                {results.plant_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-green-50">
                    {results.plant_name}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50">
                    {results.disease_name}
                  </Badge>
                </div>
                <Separator />
                <ul className="space-y-3">
                  {results.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnosis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-500" />
                Chẩn đoán chi tiết
              </CardTitle>
              <CardDescription>
                Thông tin chi tiết về bệnh {results.disease_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-green-50">
                    {results.plant_name}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50">
                    {results.disease_name}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-3">
                  {results.description.map((desc, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-green-500" />
                Phương pháp điều trị
              </CardTitle>
              <CardDescription>
                Hướng dẫn điều trị và phòng ngừa bệnh {results.disease_name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-green-50">
                    {results.plant_name}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50">
                    {results.disease_name}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-3">
                  {results.treatment.map((treatment, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {treatment}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Lưu ý:</strong> Vui lòng tham khảo ý kiến chuyên gia
                    nông nghiệp trước khi áp dụng các phương pháp điều trị. Kết
                    quả chẩn đoán AI chỉ mang tính chất tham khảo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-purple-500" />
                Hình ảnh đã phân tích
              </CardTitle>
              <CardDescription>
                Hình ảnh cây trồng được sử dụng để chẩn đoán
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-green-50">
                    {results.plant_name}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50">
                    {results.disease_name}
                  </Badge>
                </div>
                <Separator />
                {preview && (
                  <div className="flex justify-center">
                    <div className="relative max-w-md w-full">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt="Analyzed plant image"
                        className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  </div>
                )}
                {!preview && (
                  <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">
                      Không có hình ảnh để hiển thị
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Nhận hỗ trợ từ chuyên gia
              </CardTitle>
              <CardDescription>
                Bạn cần tư vấn thêm về kết quả chẩn đoán này? Gửi yêu cầu hỗ trợ
                đến các kỹ sư nông nghiệp chuyên nghiệp của chúng tôi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3">
                    Thông tin sẽ được gửi kèm:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                    <div className="space-y-1">
                      <div>🌱 Loại cây: {results.plant_name}</div>
                      <div>🐛 Bệnh: {results.disease_name}</div>
                    </div>
                    <div className="space-y-1">
                      <div>• Hình ảnh đã phân tích</div>
                      <div>• Các triệu chứng được phát hiện</div>
                      <div>• Thông tin mô tả và điều trị</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Các triệu chứng đã phát hiện:</h4>
                  <ul className="space-y-2">
                    {results.symptoms.slice(0, 3).map((symptom, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        {symptom}
                      </li>
                    ))}
                    {results.symptoms.length > 3 && (
                      <li className="text-sm text-gray-500">
                        ... và {results.symptoms.length - 3} triệu chứng khác
                      </li>
                    )}
                  </ul>
                </div>

                <TicketForm
                  defaultTitle={ticketTitle}
                  defaultDescription={ticketDescription}
                  aiDiagnosisData={{
                    plant_name: results.plant_name,
                    disease_name: results.disease_name,
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
