import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Plus, Save, Sprout, X } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface FormData {
  farmLocation: string;
  farmSize: number;
  cropTypes: string[];
  farmingExperienceYears: number;
}

const FarmInformation = ({
  formData,
  setFormData,
  isLoading,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isLoading?: boolean;
}) => {
  const [newCropType, setNewCropType] = useState("");

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addCropType = () => {
    if (
      newCropType.trim() &&
      !formData.cropTypes.includes(newCropType.trim())
    ) {
      setFormData((prev: FormData) => ({
        ...prev,
        cropTypes: [...prev.cropTypes, newCropType.trim()],
      }));
      setNewCropType("");
    }
  };

  const removeCropType = (cropType: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      cropTypes: prev.cropTypes.filter((type) => type !== cropType),
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Thông tin trang trại
          </CardTitle>
          <CardDescription>
            Cập nhật thông tin về trang trại và hoạt động nông nghiệp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="farmLocation"
              className="text-sm font-medium text-gray-700"
            >
              Vị trí trang trại
            </Label>
            <Textarea
              id="farmLocation"
              value={formData.farmLocation}
              onChange={(e) =>
                handleInputChange("farmLocation", e.target.value)
              }
              placeholder="Nhập vị trí trang trại của bạn..."
              rows={3}
              className="resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="farmSize"
                className="text-sm font-medium text-gray-700"
              >
                Diện tích (ha)
              </Label>
              <Input
                id="farmSize"
                type="number"
                step="0.1"
                min="0"
                value={formData.farmSize}
                onChange={(e) =>
                  handleInputChange(
                    "farmSize",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0.0"
                className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="farmingExperienceYears"
                className="text-sm font-medium text-gray-700"
              >
                Kinh nghiệm (năm)
              </Label>
              <Input
                id="farmingExperienceYears"
                type="number"
                min="0"
                max="100"
                value={formData.farmingExperienceYears}
                onChange={(e) =>
                  handleInputChange(
                    "farmingExperienceYears",
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder="0"
                className="focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Crop Types Management */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Loại cây trồng
            </Label>
            <div className="flex gap-2">
              <Input
                value={newCropType}
                onChange={(e) => setNewCropType(e.target.value)}
                placeholder="Nhập loại cây trồng..."
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addCropType())
                }
                className="flex-1 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <Button
                type="button"
                onClick={addCropType}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="min-h-[60px] p-3 border border-gray-200 rounded-md bg-gray-50">
              {formData.cropTypes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.cropTypes.map((cropType, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      {cropType}
                      <button
                        type="button"
                        onClick={() => removeCropType(cropType)}
                        className="ml-1 hover:bg-red-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3 text-red-600" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic text-center py-4">
                  Chưa có loại cây trồng nào được thêm
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-32 bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FarmInformation;
