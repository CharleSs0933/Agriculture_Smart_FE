"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Calendar } from "lucide-react";

import { useGetFarmerQuery, useUpdateFarmerMutation } from "@/state/api";
import FarmInformation from "./FarmInformation";
import { useEffect, useState } from "react";
import { parseCropTypes } from "@/lib/utils";

interface FormData {
  farmLocation: string;
  farmSize: number;
  cropTypes: string[];
  farmingExperienceYears: number;
}

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { data: profile, isLoading: profileLoading } = useGetFarmerQuery(
    user.id!
  );

  const [formData, setFormData] = useState<FormData>({
    farmLocation: "",
    farmSize: 0,
    cropTypes: [], // Parse JSON string to array
    farmingExperienceYears: 0,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        farmLocation: profile.farmLocation,
        farmSize: profile.farmSize,
        cropTypes: parseCropTypes(profile.cropTypes), // Parse JSON string to array
        farmingExperienceYears: profile.farmingExperienceYears,
      });
    }
  }, [profile, profileLoading]);

  const [updateProfile, { isLoading }] = useUpdateFarmerMutation();

  const handleSave = async (formData: FormData) => {
    if (!profile) return;

    const updateData = {
      ...formData,
      cropTypes: JSON.stringify(formData.cropTypes),
    };

    await updateProfile({ ...updateData, id: user.id })
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log("Error saving profile:", error);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form data will be sent with cropTypes as array
    // Service layer will convert it to JSON string for database
    await handleSave(formData);
  };

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin cá nhân và trang trại của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Personal & Account Info */}
          <div className="space-y-6">
            {/* Personal Information - Read Only */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Thông tin cá nhân
                </CardTitle>
                <CardDescription>Thông tin cá nhân của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Tên người dùng
                    </Label>
                    <Input
                      value={profile.username}
                      disabled
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <Input
                      value={profile.email}
                      disabled
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Số điện thoại
                    </Label>
                    <Input
                      value={profile.phoneNumber}
                      disabled
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Địa chỉ
                    </Label>
                    <Textarea
                      value={profile.address}
                      disabled
                      rows={3}
                      className="bg-gray-50 border-gray-200 resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information - Read Only */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Thông tin tài khoản
                </CardTitle>
                <CardDescription>Chi tiết tài khoản của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <Label className="text-sm font-medium text-gray-700">
                      ID người dùng
                    </Label>
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      #{profile.userId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <Label className="text-sm font-medium text-gray-700">
                      Ngày tạo
                    </Label>
                    <span className="text-sm text-gray-600">
                      {new Date(profile.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Cập nhật lần cuối
                    </Label>
                    <span className="text-sm text-gray-600">
                      {new Date(profile.updatedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Farm Information */}
          <FarmInformation
            formData={formData}
            setFormData={setFormData}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
