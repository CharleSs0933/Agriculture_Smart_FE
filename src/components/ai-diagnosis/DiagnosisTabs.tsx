"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Info,
  FileText,
  ShoppingCart,
  MessageSquare,
  Microscope,
  Droplets,
  AlertCircle,
  Send,
} from "lucide-react";
import { TicketForm } from "../support/ticket-form";

interface AnalysisResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  description: string;
  treatment: string;
  products: Array<{
    name: string;
    type: string;
    description: string;
    price: string;
  }>;
}

interface DiagnosisTabsProps {
  results: AnalysisResult;
  preview: string | null;
}

export function DiagnosisTabs({ results, preview }: DiagnosisTabsProps) {
  return (
    <div className="mx-auto max-w-5xl mt-8">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
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
            value="products"
            className="flex items-center gap-1 text-xs md:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Sản phẩm đề xuất</span>
            <span className="sm:hidden">Sản phẩm</span>
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
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Microscope className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Mô tả bệnh</h3>
            </div>
            <p className="text-gray-600">{results.description}</p>
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
            <p className="text-gray-600">{results.treatment}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Phòng ngừa</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>
                      Luân canh cây trồng để ngăn ngừa sự tích tụ của mầm bệnh
                    </li>
                    <li>
                      Đảm bảo khoảng cách hợp lý giữa các cây để thông gió tốt
                    </li>
                    <li>Sử dụng giống cây kháng bệnh nếu có thể</li>
                    <li>Kiểm soát độ ẩm và tránh tưới nước quá mức</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Điều trị</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Loại bỏ và tiêu hủy lá bị nhiễm bệnh</li>
                    <li>Sử dụng thuốc trừ nấm theo hướng dẫn</li>
                    <li>Tránh tưới nước trên lá, đặc biệt là vào buổi tối</li>
                    <li>
                      Tăng cường dinh dưỡng cho cây để nâng cao sức đề kháng
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.products.map((product, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-1" variant="secondary">
                    {product.type}
                  </Badge>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    {product.price}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Thêm vào giỏ hàng
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
              <h4 className="font-medium text-blue-900 mb-2">
                Thông tin sẽ được gửi kèm:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Kết quả chẩn đoán AI: {results.disease}</li>
                <li>• Độ tin cậy: {results.confidence}%</li>
                <li>• Hình ảnh đã phân tích</li>
                <li>• Các triệu chứng được phát hiện</li>
              </ul>
            </div>
            <TicketForm
              defaultTitle={`Tư vấn về ${results.disease}`}
              defaultDescription={`Tôi đã sử dụng AI chẩn đoán và nhận được kết quả là "${
                results.disease
              }" với độ tin cậy ${
                results.confidence
              }%. Tôi muốn được tư vấn thêm về:\n\n- Xác nhận chẩn đoán\n- Phương pháp điều trị cụ thể\n- Biện pháp phòng ngừa\n- Các sản phẩm phù hợp\n\nCác triệu chứng quan sát được:\n${results.symptoms
                .map((s) => `- ${s}`)
                .join("\n")}`}
              defaultImages={preview ? [preview] : []}
              aiDiagnosisData={{
                disease: results.disease,
                confidence: results.confidence,
                symptoms: results.symptoms,
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
