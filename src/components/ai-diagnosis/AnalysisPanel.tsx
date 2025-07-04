"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ArrowRight, Leaf, Bug } from "lucide-react";

interface AnalysisPanelProps {
  file: File | null;
  isAnalyzing: boolean;
  results: AnalysisResult | null;
  onAnalyze: () => void;
}

export function AnalysisPanel({
  file,
  isAnalyzing,
  results,
  onAnalyze,
}: AnalysisPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân tích AI</CardTitle>
        <CardDescription>
          Hệ thống AI sẽ phân tích hình ảnh và đưa ra chẩn đoán
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!file && !results && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Chưa có hình ảnh</AlertTitle>
            <AlertDescription>
              Vui lòng tải lên hình ảnh cây trồng của bạn để bắt đầu phân tích.
            </AlertDescription>
          </Alert>
        )}

        {file && !results && !isAnalyzing && (
          <div className="flex justify-center">
            <Button
              onClick={onAnalyze}
              className="bg-green-600 hover:bg-green-700"
            >
              Bắt đầu phân tích
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin"></div>
            <p className="text-sm text-gray-500">Đang phân tích hình ảnh...</p>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Loại cây</p>
                  <p className="font-semibold capitalize">
                    {results.plant_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Bệnh được phát hiện
                  </p>
                  <p className="font-semibold capitalize">
                    {results.disease_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Độ tin cậy</p>
                <Badge variant="outline" className="bg-green-50">
                  {results.confidence.toFixed(1)}%
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                Triệu chứng
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {results.symptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
