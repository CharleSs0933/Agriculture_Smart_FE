"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Tractor,
  Wheat,
  Clock,
} from "lucide-react";

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

  const cropTypes = farmer.cropTypes ? JSON.parse(farmer.cropTypes) : [];
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Chi tiết Nông dân
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cá nhân */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tractor className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tên người dùng
                </label>
                <p className="text-lg font-semibold">{farmer.userName}</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{farmer.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{farmer.phoneNumber}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <span>{farmer.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin trang trại */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wheat className="h-5 w-5" />
                Thông tin trang trại
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Vị trí trang trại
                </label>
                <p className="font-medium">
                  {farmer.farmLocation || "Chưa xác định"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Quy mô trang trại
                </label>
                <p className="font-medium">
                  {farmer.farmSize > 0
                    ? `${farmer.farmSize} ha`
                    : "Chưa xác định"}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loại cây trồng
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {cropTypes.length > 0 ? (
                    cropTypes.map((crop: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {crop}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Chưa xác định</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{farmer.farmingExperienceYears} năm kinh nghiệm</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Thông tin hệ thống */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thông tin hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Ngày tạo tài khoản
                </label>
                <p className="font-medium">{formatDate(farmer.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Cập nhật lần cuối
                </label>
                <p className="font-medium">{formatDate(farmer.updatedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="font-medium">#{farmer.userId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Farmer ID
                </label>
                <p className="font-medium">#{farmer.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
