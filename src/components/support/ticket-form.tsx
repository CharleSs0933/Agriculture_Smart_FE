"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Upload,
  X,
  Send,
  CheckCircle,
  AlertCircle,
  Camera,
} from "lucide-react";
import Image from "next/image";

interface TicketFormProps {
  trigger?: React.ReactNode;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImages?: string[];
  aiDiagnosisData?: {
    disease: string;
    confidence: number;
    symptoms: string[];
    image: string;
  };
}

export function TicketForm({
  trigger,
  defaultTitle = "",
  defaultDescription = "",
  defaultImages = [],
  aiDiagnosisData,
}: TicketFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: defaultTitle,
    description: defaultDescription,
    category: "",
    priority: "medium",
    cropType: "",
    location: "",
    contactMethod: "email",
  });

  const [images, setImages] = useState<string[]>(defaultImages);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        cropType: "",
        location: "",
        contactMethod: "email",
      });
      setImages([]);
    }, 3000);
  };

  const defaultTrigger = (
    <Button
      className="bg-green-600 hover:bg-green-700"
      onClick={() => setOpen(true)}
    >
      <Send className="h-4 w-4 mr-2" />
      Gửi yêu cầu hỗ trợ
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gửi yêu cầu hỗ trợ kỹ sư nông nghiệp</DialogTitle>
          <DialogDescription>
            Mô tả chi tiết vấn đề của bạn để nhận được sự hỗ trợ tốt nhất từ các
            chuyên gia.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
            <h3 className="text-lg font-semibold">Gửi yêu cầu thành công!</h3>
            <p className="text-gray-500 text-center">
              Ticket #AG{Math.floor(Math.random() * 10000)} đã được tạo. Kỹ sư
              nông nghiệp sẽ phản hồi trong vòng 24 giờ.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AI Diagnosis Integration */}
            {aiDiagnosisData && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Kết quả AI chẩn đoán:</strong>{" "}
                  {aiDiagnosisData.disease}
                  (Độ tin cậy: {aiDiagnosisData.confidence}%)
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề yêu cầu *</Label>
                <Input
                  id="title"
                  placeholder="Ví dụ: Cây lúa bị vàng lá bất thường"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disease">Bệnh cây trồng</SelectItem>
                    <SelectItem value="pest">Sâu hại</SelectItem>
                    <SelectItem value="nutrition">
                      Dinh dưỡng cây trồng
                    </SelectItem>
                    <SelectItem value="soil">Đất trồng</SelectItem>
                    <SelectItem value="irrigation">Tưới tiêu</SelectItem>
                    <SelectItem value="harvest">Thu hoạch</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Loại cây trồng</Label>
                <Input
                  id="cropType"
                  placeholder="Ví dụ: Lúa, Ngô, Cà phê..."
                  value={formData.cropType}
                  onChange={(e) =>
                    handleInputChange("cropType", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Vị trí</Label>
                <Input
                  id="location"
                  placeholder="Tỉnh/Thành phố"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chi tiết *</Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về vấn đề bạn đang gặp phải, thời gian xuất hiện, diện tích ảnh hưởng..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Mức độ ưu tiên</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="urgent">Khẩn cấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactMethod">Phương thức liên hệ</Label>
                <Select
                  value={formData.contactMethod}
                  onValueChange={(value) =>
                    handleInputChange("contactMethod", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Điện thoại</SelectItem>
                    <SelectItem value="both">Cả hai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Hình ảnh minh họa</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Kéo thả hình ảnh vào đây hoặc click để chọn
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Chọn hình ảnh
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi yêu cầu
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
