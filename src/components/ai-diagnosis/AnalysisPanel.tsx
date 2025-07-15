"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Loader2, RotateCcw, CheckCircle } from "lucide-react";

interface AnalysisPanelProps {
  file: File | null;
  isAnalyzing: boolean;
  results: AnalysisResult | null;
  onAnalyze: () => void;
  onReset: () => void;
}

export function AnalysisPanel({
  file,
  isAnalyzing,
  results,
  onAnalyze,
  onReset,
}: AnalysisPanelProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-green-600" />
          Phân tích AI
        </CardTitle>
        <CardDescription>
          {!results
            ? "Tải lên hình ảnh cây trồng để bắt đầu chẩn đoán bệnh"
            : "Kết quả chẩn đoán từ hệ thống AI"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!results ? (
          <>
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Chưa có kết quả phân tích</p>
              <Button
                onClick={onAnalyze}
                disabled={!file || isAnalyzing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Đang phân tích...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Phân tích hình ảnh
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">
                  Phân tích hoàn tất
                </span>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Loại cây trồng
                  </label>
                  <Badge variant="outline" className="ml-2 bg-green-50">
                    {results.plant_name}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Bệnh được phát hiện
                  </label>
                  <Badge variant="outline" className="ml-2 bg-red-50">
                    {results.disease_name}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Số triệu chứng
                  </label>
                  <Badge variant="outline" className="ml-2 bg-blue-50">
                    {results.symptoms.length} triệu chứng
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button
                  onClick={onReset}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Phân tích ảnh mới
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
