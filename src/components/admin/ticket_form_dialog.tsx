"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Ticket } from "@/types";

interface TicketFormDialogProps {
  trigger: React.ReactNode;
  ticket?: Ticket;
}

export function TicketFormDialog({ trigger, ticket }: TicketFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket?.title || "",
    category: ticket?.category || "",
    cropType: ticket?.cropType || "",
    location: ticket?.location || "",
    description: ticket?.description || "",
    priority: ticket?.priority || "medium",
    contactMethod: ticket?.contactMethod || "Điện thoại",
    phoneNumber: ticket?.phoneNumber || "",
    farmerId: ticket?.farmerId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setOpen(false);
  };

  const categories = [
    "Bệnh cây trồng",
    "Sâu hại",
    "Dinh dưỡng cây trồng",
    "Kỹ thuật canh tác",
    "Đất đai",
    "Tưới tiêu",
    "Khác",
  ];

  const cropTypes = ["Lúa", "Ngô", "Cà phê", "Rau màu", "Cây ăn trái", "Khác"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {ticket ? "Chỉnh sửa Ticket" : "Tạo Ticket mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Nhập tiêu đề ticket"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Danh mục *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropType">Loại cây trồng *</Label>
              <Select
                value={formData.cropType}
                onValueChange={(value) =>
                  setFormData({ ...formData, cropType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại cây" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Độ ưu tiên *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn độ ưu tiên" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Thấp</SelectItem>
                  <SelectItem value="medium">Trung bình</SelectItem>
                  <SelectItem value="high">Cao</SelectItem>
                  <SelectItem value="urgent">Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Địa điểm *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Ví dụ: Ruộng A1, Ấp 2, Xã Tân Hiệp"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả chi tiết *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả chi tiết vấn đề cần hỗ trợ..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactMethod">Phương thức liên hệ *</Label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, contactMethod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phương thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Điện thoại">Điện thoại</SelectItem>
                  <SelectItem value="Zalo">Zalo</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Trực tiếp">Trực tiếp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Số điện thoại *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="farmerId">ID Nông dân</Label>
            <Input
              id="farmerId"
              type="number"
              value={formData.farmerId}
              onChange={(e) =>
                setFormData({ ...formData, farmerId: e.target.value })
              }
              placeholder="Nhập ID nông dân (tùy chọn)"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit">{ticket ? "Cập nhật" : "Tạo Ticket"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
