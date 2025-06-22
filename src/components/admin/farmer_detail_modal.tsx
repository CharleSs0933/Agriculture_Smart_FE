"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Calendar, Clock, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

interface FarmerDetailModalProps {
  farmer: Farmer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FarmerDetailModal({
  farmer,
  open,
  onOpenChange,
}: FarmerDetailModalProps) {
  if (!farmer) return null;

  const parseCropTypes = (cropTypesString: unknown): string[] => {
    if (typeof cropTypesString !== "string" || !cropTypesString.trim()) {
      return [];
    }

    const trimmed = cropTypesString.trim();

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (
          Array.isArray(parsed) &&
          parsed.every((item) => typeof item === "string")
        ) {
          return parsed;
        }
      } catch (error) {
        console.warn("JSON.parse failed, fallback to CSV:", error);
      }
    }

    // Nếu không phải JSON thì fallback về xử lý CSV
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const cropTypes = parseCropTypes(farmer.cropTypes);
  const initial = farmer.userName.charAt(0).toUpperCase();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Thông tin người nông dân</DialogTitle>
      </DialogHeader>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            {/* Grid container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "h-20 w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-white",
                    "bg-gradient-to-br from-green-500 via-green-600 to-blue-600 shadow-md"
                  )}
                >
                  {initial}
                </div>
                <div className="text-center w-full">
                  <p
                    className="text-lg font-medium truncate max-w-full"
                    title={farmer.userName}
                  >
                    {farmer.userName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: #{farmer.id}
                  </p>
                </div>
              </div>

              {/* Cột 2: Contact Info */}
              <div className="space-y-5">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="break-all text-sm" title={farmer.email}>
                    {farmer.email || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span
                    className="break-all text-sm"
                    title={farmer.phoneNumber}
                  >
                    {farmer.phoneNumber || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">
                    {farmer.farmingExperienceYears} năm kinh nghiệm
                  </span>
                </div>
              </div>

              {/* Cột 3: System Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">
                    Ngày tạo: {formatDate(farmer.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">
                    Cập nhật: {formatDate(farmer.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Farm Information Section - Expanded */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  ĐỊA CHỈ TRANG TRẠI
                </h3>
                <p className="text-sm break-words">
                  {farmer.farmLocation || "Chưa xác định"}
                </p>
                {farmer.address && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {farmer.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farm Size */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    QUY MÔ
                  </h3>
                  <p className="text-sm">
                    {farmer.farmSize > 0
                      ? `${farmer.farmSize} hecta`
                      : "Chưa xác định"}
                  </p>
                </div>

                {/* Crop Types */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    LOẠI CÂY TRỒNG
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cropTypes.length > 0 ? (
                      cropTypes.map((crop: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs max-w-[140px] truncate px-2 py-1"
                          title={crop} // Tooltip for full crop name
                        >
                          {crop}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Chưa có thông tin
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
