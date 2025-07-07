import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface EngineerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (EngineerData: EngineerFormdata) => void;
  engineer: Engineer | null;
}

export function EngineerFormModal({
  open,
  onOpenChange,
  onSubmit,
  engineer,
}: EngineerFormModalProps) {
  const [newCertificate, setNewCertificate] = useState("");
  const [editCertificates, setEditCertificates] = useState<string[]>([]);
  const [formData, setFormData] = useState<EngineerFormdata>({
    id: undefined,
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    specialization: "",
    experienceYears: 0,
    certification: "",
    bio: "",
  });

  useEffect(() => {
    if (engineer) {
      setEditCertificates(parseCertification(engineer.certification));
      setFormData({
        id: engineer.id,
        username: engineer.username || "",
        email: engineer.email || "",
        password: "",
        address: engineer.address || "",
        phoneNumber: engineer.phoneNumber || "",
        specialization: engineer.specialization || "",
        experienceYears: engineer.experienceYears || 0,
        certification: engineer.certification,
        bio: engineer.bio || "0",
      });
    }
  }, [engineer]);

  const parseCertification = (certificationString: unknown): string[] => {
    if (
      typeof certificationString !== "string" ||
      !certificationString.trim()
    ) {
      return [];
    }
    const trimmed = certificationString.trim();
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
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experienceYears" ? Number(value) : value,
    }));
  };

  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCertificate(e.target.value);
  };

  const addCertification = () => {
    if (newCertificate && !editCertificates.includes(newCertificate.trim())) {
      const updated = [...editCertificates, newCertificate.trim()];
      setEditCertificates(updated);
      setFormData((prev) => ({
        ...prev,
        certification: JSON.stringify(updated), // or updated.join(",")
      }));
      setNewCertificate(""); // Clear input
    }
  };

  const removeCertification = (certification: string) => {
    const updated = editCertificates.filter((type) => type !== certification);
    setEditCertificates(updated);
    setFormData((prev) => ({
      ...prev,
      certification: JSON.stringify(updated),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {engineer ? "Cập nhật Nông dân" : "Thêm Nông dân"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* username */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Tên đăng nhập
            </label>
            <Input
              name="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              placeholder="Example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* password */}
          {!engineer ? (
            <div>
              <label className="block text-sm font-medium mb-1">Mật khẩu</label>
              <Input
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                type="password"
                onChange={handleChange}
              />
            </div>
          ) : null}
          {/* address */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <Input
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          {/* phone number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <Input
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          {/* Farm Location Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Tiểu sử</label>
            <Input
              name="bio"
              placeholder="Tiểu sử kỹ sư"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Farm Size Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Chuyên môn</label>
            <Input
              name="specialization"
              placeholder="Chuyên môn hóa"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>

          {/* Crop Type Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Chứng chỉ</label>
            <div className="flex items-center">
              <Input
                name="newCertificate"
                placeholder="Nhập tên chứng chỉ"
                value={newCertificate}
                onChange={handleCertificationChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCertification();
                  }
                }}
              />
              <Button onClick={addCertification} className="ml-2">
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {editCertificates.map((certification, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center"
                >
                  {certification}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeCertification(certification)}
                  >
                    x
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Farming Experience Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Kinh nghiệm (năm)
            </label>
            <Input
              name="experienceYears"
              type="number"
              placeholder="Kinh nghiệm (năm)"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button className="ml-2" onClick={() => handleSubmit()}>
            {engineer ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
