"use client";

import type React from "react";
import { useState } from "react";
import { HeroSection } from "@/components/ai-diagnosis/HeroSection";
import { ImageUpload } from "@/components/ai-diagnosis/ImageUpload";
import { AnalysisPanel } from "@/components/ai-diagnosis/AnalysisPanel";
import { DiagnosisTabs } from "@/components/ai-diagnosis/DiagnosisTabs";
import { toast } from "sonner";
import { useAnalyzeImageMutation } from "@/state/apiAI";

export default function AIDiagnosis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const [analyzeImageMutation, { isLoading }] = useAnalyzeImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Vui lòng chọn file hình ảnh hợp lệ");
        return;
      }

      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("Kích thước file không được vượt quá 10MB");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResults(null);
    }
  };

  const analyzeImage = async () => {
    if (!file) {
      toast("Vui lòng chọn hình ảnh trước khi phân tích");
      return;
    }

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData.get("file"));

      // Call your AI analysis API

      const data = await analyzeImageMutation(formData).unwrap();

      setResults(data);

      toast.success(
        `Phát hiện bệnh ${data.disease_name} trên ${data.plant_name}`
      );
    } catch (error) {
      console.log("Analysis error:", error);

      toast.error("Có lỗi xảy ra khi phân tích hình ảnh. Vui lòng thử lại.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResults(null);

    // Reset file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <main>
      <HeroSection />

      <div className="px-4 md:px-6 py-8">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageUpload preview={preview} onFileChange={handleFileChange} />

          <AnalysisPanel
            file={file}
            isAnalyzing={isLoading}
            results={results}
            onAnalyze={analyzeImage}
            onReset={handleReset}
          />
        </div>

        {results && <DiagnosisTabs results={results} preview={preview} />}
      </div>
    </main>
  );
}
