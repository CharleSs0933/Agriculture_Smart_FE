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
import { X, Send, CheckCircle, AlertCircle, Phone } from "lucide-react";
import Image from "next/image";
import { useSendTicketMutation } from "@/state/api";
import { UploadDropzone } from "@/lib/uploadthing";

interface TicketFormProps {
  trigger?: React.ReactNode;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
  aiDiagnosisData?: {
    plant_name: string;
    disease_name: string;
    confidence: number;
    image: string;
  };
}

export function TicketForm({
  trigger,
  defaultTitle = "",
  defaultDescription = "",
  defaultImage = "",
  aiDiagnosisData,
}: TicketFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<CreateTicketRequest>({
    title: defaultTitle,
    description: defaultDescription,
    category: "",
    priority: "medium",
    cropType: "",
    location: "",
    phoneNumber: "",
    imageUrl: "",
  });

  const [sendTicket, { isLoading }] = useSendTicketMutation();

  const [image, setImage] = useState<string>(defaultImage);

  const handleInputChange = (
    field: keyof CreateTicketRequest,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const removeImage = () => {
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images first

    const ticketData = {
      ...formData,
      imageUrl: image,
    };

    // TODO: Replace with actual API call
    await sendTicket(ticketData)
      .unwrap()
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.log("Error creating ticket:", error);
      });

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
        phoneNumber: "",
        imageUrl: "",
      });
      setImage("");
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
              Ticket đã được tạo. Kỹ sư nông nghiệp sẽ phản hồi trong vòng 24
              giờ.
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
                  {aiDiagnosisData.plant_name} - {aiDiagnosisData.disease_name}
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
                    <SelectItem value="Bệnh cây trồng">
                      Bệnh cây trồng
                    </SelectItem>
                    <SelectItem value="Sâu hại">Sâu hại</SelectItem>
                    <SelectItem value="Dinh dưỡng">
                      Dinh dưỡng cây trồng
                    </SelectItem>
                    <SelectItem value="Đất đai">Đất đai</SelectItem>
                    <SelectItem value="Tưới tiêu">Tưới tiêu</SelectItem>
                    <SelectItem value="Thu hoạch">Thu hoạch</SelectItem>
                    <SelectItem value="Khác">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cropType">Loại cây trồng *</Label>
                <Input
                  id="cropType"
                  placeholder="Ví dụ: Lúa, Ngô, Cà phê, Rau màu..."
                  value={formData.cropType}
                  onChange={(e) =>
                    handleInputChange("cropType", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Vị trí *</Label>
                <Input
                  id="location"
                  placeholder="Ví dụ: Ruộng A1, Ấp 2, Xã Tân Hiệp"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
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
                <Label htmlFor="priority">Mức độ ưu tiên *</Label>
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
                <Label htmlFor="phoneNumber">Số điện thoại *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phoneNumber"
                    placeholder="0909123456"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    className="pl-10"
                    pattern="[0-9]{10,11}"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}

            {image ? (
              <div className="">
                <div className="relative group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Image`}
                    width={100}
                    height={100}
                    className="w-full  object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage()}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Hình ảnh minh họa</Label>
                <UploadDropzone
                  endpoint={"imageUploader"}
                  content={{
                    label: "Kéo thả hình ảnh vào đây hoặc click để chọn",
                  }}
                  appearance={{
                    button: {
                      color: "black",
                    },
                  }}
                  className="border-2 border-dashed rounded-lg p-6 text-center transition-colors "
                  onClientUploadComplete={(res) => {
                    if (res?.[0]?.url) {
                      setImage(res[0].url);
                    }
                  }}
                />
              </div>
            )}

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
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
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
