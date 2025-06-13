"use client";

import type React from "react";
import { useState } from "react";
import { ImageUpload } from "@/components/ai-diagnosis/ImageUpload";
import { AnalysisPanel } from "@/components/ai-diagnosis/AnalysisPanel";
import { DiagnosisTabs } from "@/components/ai-diagnosis/DiagnosisTabs";
import { HeroSection } from "@/components/ai-diagnosis/HeroSection";

export default function AIDiagnosis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
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
  }>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResults(null);
    }
  };

  const analyzeImage = () => {
    if (!file) return;

    setIsAnalyzing(true);

    // Giả lập phân tích AI với timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults({
        disease: "Bệnh đốm lá (Leaf Spot Disease)",
        confidence: 92.5,
        symptoms: [
          "Các đốm màu nâu hoặc đen trên lá",
          "Lá vàng và rụng sớm",
          "Các đốm có viền màu vàng hoặc đỏ",
          "Lá bị khô và xoăn",
        ],
        description:
          "Bệnh đốm lá là một bệnh phổ biến ở nhiều loại cây trồng, gây ra bởi các loại nấm như Alternaria, Septoria, hoặc Cercospora. Bệnh thường phát triển trong điều kiện ẩm ướt và nhiệt độ cao, lây lan qua gió, nước mưa hoặc các công cụ làm vườn bị nhiễm bệnh.",
        treatment:
          "Cần loại bỏ và tiêu hủy lá bị nhiễm bệnh, tránh tưới nước trên lá, đảm bảo thông gió tốt cho cây và sử dụng thuốc trừ nấm phù hợp. Phòng ngừa bằng cách luân canh cây trồng và duy trì khoảng cách hợp lý giữa các cây.",
        products: [
          {
            name: "Fungicide Pro",
            type: "Thuốc trừ nấm",
            description:
              "Thuốc trừ nấm hữu cơ, an toàn cho cây trồng và môi trường",
            price: "150.000 VNĐ",
          },
          {
            name: "Bio-Leaf Spray",
            type: "Thuốc xịt lá",
            description: "Thuốc xịt tăng cường sức đề kháng cho lá cây",
            price: "120.000 VNĐ",
          },
          {
            name: "Soil Health Plus",
            type: "Phân bón",
            description:
              "Phân bón vi sinh giúp cải thiện sức khỏe đất và cây trồng",
            price: "200.000 VNĐ",
          },
          {
            name: "Copper Fungicide",
            type: "Thuốc trừ nấm",
            description:
              "Thuốc trừ nấm gốc đồng, hiệu quả với nhiều loại bệnh nấm",
            price: "180.000 VNĐ",
          },
        ],
      });
    }, 2000);
  };

  return (
    <main>
      <HeroSection />

      <div className=" px-4 md:px-6 py-8">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageUpload preview={preview} onFileChange={handleFileChange} />

          <AnalysisPanel
            file={file}
            isAnalyzing={isAnalyzing}
            results={results}
            onAnalyze={analyzeImage}
          />
        </div>

        {results && <DiagnosisTabs results={results} preview={preview} />}
      </div>
    </main>
  );
}
