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
import { EngineerFormData, engineerSchema } from "@/lib/schemas";
import { FormField } from "./form-field";
// Bạn có thể để trong cùng file nếu muốn

interface EngineerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (engineerData: EngineerFormData) => void;
  engineer: Engineer | null;
}

export function EngineerFormModal({
  open,
  onOpenChange,
  onSubmit,
  engineer,
}: EngineerFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EngineerFormData>({
    resolver: zodResolver(engineerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      specialization: "",
      experienceYears: 0,
      certification: "[]",
      bio: "",
    },
  });

  const [newCertificate, setNewCertificate] = useState("");
  const [certificates, setCertificates] = useState<string[]>([]);

  useEffect(() => {
    if (engineer) {
      const certs = parseCert(engineer.certification);
      setCertificates(certs);
      reset({
        ...engineer,
        certification: JSON.stringify(certs),
        password: "",
      });
    } else {
      setCertificates([]);
      reset();
    }
  }, [engineer, reset]);

  const parseCert = (certStr: unknown): string[] => {
    if (typeof certStr !== "string" || !certStr.trim()) return [];
    try {
      const parsed = JSON.parse(certStr);
      return Array.isArray(parsed)
        ? parsed.filter((s) => typeof s === "string")
        : [];
    } catch {
      return certStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  };

  const addCertificate = () => {
    const trimmed = newCertificate.trim();
    if (trimmed && !certificates.includes(trimmed)) {
      const updated = [...certificates, trimmed];
      setCertificates(updated);
      setValue("certification", JSON.stringify(updated));
      setNewCertificate("");
    }
  };

  const removeCertificate = (item: string) => {
    const updated = certificates.filter((c) => c !== item);
    setCertificates(updated);
    setValue("certification", JSON.stringify(updated));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {engineer ? "Cập nhật Kỹ sư" : "Thêm Kỹ sư"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Tên đăng nhập" error={errors.username?.message}>
              <Input {...register("username")} placeholder="Tên đăng nhập" />
            </FormField>

            <FormField label="Email" error={errors.email?.message}>
              <Input {...register("email")} placeholder="Email" />
            </FormField>

            {!engineer && (
              <FormField label="Mật khẩu" error={errors.password?.message}>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </FormField>
            )}

            <FormField label="Địa chỉ">
              <Input {...register("address")} placeholder="Địa chỉ" />
            </FormField>

            <FormField
              label="Số điện thoại"
              error={errors.phoneNumber?.message}
            >
              <Input {...register("phoneNumber")} placeholder="Số điện thoại" />
            </FormField>

            <FormField label="Chuyên môn">
              <Input {...register("specialization")} placeholder="Chuyên môn" />
            </FormField>

            <FormField label="Tiểu sử">
              <Input {...register("bio")} placeholder="Giới thiệu ngắn" />
            </FormField>

            <FormField
              label="Kinh nghiệm (năm)"
              error={errors.experienceYears?.message}
            >
              <Input
                {...register("experienceYears", { valueAsNumber: true })}
                type="number"
              />
            </FormField>
          </div>

          {/* Chứng chỉ */}
          <div>
            <label className="block text-sm font-medium mb-1">Chứng chỉ</label>
            <div className="flex items-center">
              <Input
                placeholder="Nhập chứng chỉ"
                value={newCertificate}
                onChange={(e) => setNewCertificate(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCertificate()}
              />
              <Button type="button" className="ml-2" onClick={addCertificate}>
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {certificates.map((item, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="flex items-center px-2"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeCertificate(item)}
                  >
                    x
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" className="ml-2">
              {engineer ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
