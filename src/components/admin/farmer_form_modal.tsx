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

interface FarmerFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (farmerData: FarmerMutation) => void;
  farmer: FarmerMutation | null;
}

export function FarmerFormModal({
  open,
  onOpenChange,
  onSubmit,
  farmer,
}: FarmerFormModalProps) {
  const [formData, setFormData] = useState<FarmerMutation>({
    farmLocation: "",
    farmSize: 0,
    cropTypes: [],
    farmingExperienceYears: 0,
  });
  const [newCropType, setNewCropType] = useState("");

  useEffect(() => {
    if (farmer) {
      setFormData(farmer);
    } else {
      setFormData({
        farmLocation: "",
        farmSize: 0,
        cropTypes: [],
        farmingExperienceYears: 0,
      });
    }
  }, [farmer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCropTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCropType(e.target.value);
  };

  const addCropType = () => {
    if (newCropType && !formData.cropTypes.includes(newCropType)) {
      setFormData((prev) => ({
        ...prev,
        cropTypes: [...prev.cropTypes, newCropType],
      }));
      setNewCropType(""); // Clear the input after adding
    }
  };

  const removeCropType = (cropType: string) => {
    setFormData((prev) => ({
      ...prev,
      cropTypes: prev.cropTypes.filter((type) => type !== cropType),
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
            {farmer ? "Cập nhật Nông dân" : "Thêm Nông dân"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Farm Location Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Vị trí trang trại
            </label>
            <Input
              name="farmLocation"
              placeholder="Vị trí trang trại"
              value={formData.farmLocation}
              onChange={handleChange}
            />
          </div>

          {/* Farm Size Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Diện tích trang trại (ha)
            </label>
            <Input
              name="farmSize"
              type="number"
              placeholder="Diện tích trang trại (ha)"
              value={formData.farmSize}
              onChange={handleChange}
            />
          </div>

          {/* Crop Type Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loại cây trồng
            </label>
            <div className="flex items-center">
              <Input
                name="newCropType"
                placeholder="Nhập loại cây trồng"
                value={newCropType}
                onChange={handleCropTypeChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addCropType();
                  }
                }}
              />
              <Button onClick={addCropType} className="ml-2">
                Thêm
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.cropTypes.map((cropType, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center"
                >
                  {cropType}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeCropType(cropType)}
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
              name="farmingExperienceYears"
              type="number"
              placeholder="Kinh nghiệm (năm)"
              value={formData.farmingExperienceYears}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button className="ml-2" onClick={handleSubmit}>
            {farmer ? "Cập nhật" : "Thêm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
