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
  HardHat,
  Award,
  Clock,
  User,
} from "lucide-react";

interface EngineerDetailModalProps {
  engineer: Engineer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EngineerDetailModal({
  engineer,
  open,
  onOpenChange,
}: EngineerDetailModalProps) {
  if (!engineer) return null;

  const certifications = engineer.certification
    ? JSON.parse(engineer.certification)
    : [];
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Chi tiết Kỹ sư
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin cá nhân */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Tên người dùng
                </label>
                <p className="text-lg font-semibold">{engineer.userName}</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{engineer.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{engineer.phoneNumber}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <span>{engineer.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin chuyên môn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" />
                Thông tin chuyên môn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Chuyên môn
                </label>
                <p className="font-medium">{engineer.specialization}</p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{engineer.experienceYears} năm kinh nghiệm</span>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Chứng chỉ
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {certifications.length > 0 ? (
                    certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">
                      Chưa có chứng chỉ
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tiểu sử */}
        <Card>
          <CardHeader>
            <CardTitle>Tiểu sử chuyên môn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{engineer.bio}</p>
          </CardContent>
        </Card>

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
                <p className="font-medium">{formatDate(engineer.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Cập nhật lần cuối
                </label>
                <p className="font-medium">{formatDate(engineer.updatedAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="font-medium">#{engineer.userId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Engineer ID
                </label>
                <p className="font-medium">#{engineer.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
