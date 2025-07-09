"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FarmerFormData, farmerSchema } from "@/lib/schemas";
import { FormField } from "./form-field";

interface FarmerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (farmerData: FarmerFormData) => void;
  farmer: Farmer | null;
}

export function FarmerFormModal({
  open,
  onOpenChange,
  onSubmit,
  farmer,
}: FarmerFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FarmerFormData>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      farmLocation: "",
      farmSize: 0,
      cropTypes: "[]",
      farmingExperienceYears: 0,
    },
  });

  const [newCropType, setNewCropType] = useState("");
  const [editCropTypes, setEditCropTypes] = useState<string[]>([]);

  useEffect(() => {
    if (farmer) {
      const cropArray = parseCropTypes(farmer.cropTypes);
      setEditCropTypes(cropArray);
      reset({
        ...farmer,
        cropTypes: JSON.stringify(cropArray),
        password: "",
      });
    } else {
      setEditCropTypes([]);
      reset();
    }
  }, [farmer, reset]);

  const parseCropTypes = (value: unknown): string[] => {
    if (typeof value !== "string") return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const addCropType = () => {
    const trimmed = newCropType.trim();
    if (trimmed && !editCropTypes.includes(trimmed)) {
      const updated = [...editCropTypes, trimmed];
      setEditCropTypes(updated);
      setValue("cropTypes", JSON.stringify(updated));
      setNewCropType("");
    }
  };

  const removeCropType = (type: string) => {
    const updated = editCropTypes.filter((t) => t !== type);
    setEditCropTypes(updated);
    setValue("cropTypes", JSON.stringify(updated));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {farmer ? "Cập nhật Nông dân" : "Thêm Nông dân"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Thông tin chính */}
            <div className="space-y-4">
              <FormField label="Tên đăng nhập" error={errors.username?.message}>
                <Input {...register("username")} placeholder="Tên đăng nhập" />
              </FormField>

              <FormField label="Email" error={errors.email?.message}>
                <Input {...register("email")} placeholder="Email" />
              </FormField>

              {!farmer && (
                <FormField label="Mật khẩu" error={errors.password?.message}>
                  <Input
                    {...register("password")}
                    placeholder="Mật khẩu"
                    type="password"
                  />
                </FormField>
              )}

              <FormField
                label="Số điện thoại"
                error={errors.phoneNumber?.message}
              >
                <Input
                  {...register("phoneNumber")}
                  placeholder="Số điện thoại"
                />
              </FormField>
            </div>

            {/* Right: Thông tin phụ */}
            <div className="space-y-4">
              <FormField label="Địa chỉ">
                <Input {...register("address")} placeholder="Địa chỉ" />
              </FormField>

              <FormField label="Vị trí trang trại">
                <Input {...register("farmLocation")} placeholder="Vị trí" />
              </FormField>

              <FormField
                label="Diện tích trang trại (ha)"
                error={errors.farmSize?.message}
              >
                <Input
                  {...register("farmSize", { valueAsNumber: true })}
                  type="number"
                />
              </FormField>

              <FormField
                label="Kinh nghiệm (năm)"
                error={errors.farmingExperienceYears?.message}
              >
                <Input
                  {...register("farmingExperienceYears", {
                    valueAsNumber: true,
                  })}
                  type="number"
                />
              </FormField>
            </div>
          </div>

          {/* Cây trồng */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1">
              Loại cây trồng
            </label>
            <div className="flex items-center">
              <Input
                placeholder="Nhập loại cây trồng"
                value={newCropType}
                onChange={(e) => setNewCropType(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCropType()}
              />
              <Button className="ml-2" type="button" onClick={addCropType}>
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {editCropTypes.map((type, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="flex items-center px-2"
                >
                  {type}
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeCropType(type)}
                  >
                    x
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit" className="ml-2">
              {farmer ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
