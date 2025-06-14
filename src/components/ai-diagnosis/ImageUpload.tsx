"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, Camera, Leaf } from "lucide-react";

interface ImageUploadProps {
  file: File | null;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({ file, preview, onFileChange }: ImageUploadProps) {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-white">
      <CardHeader>
        <CardTitle>Tải lên hình ảnh</CardTitle>
        <CardDescription>
          Chụp ảnh hoặc tải lên hình ảnh cây trồng của bạn để AI phân tích
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {preview ? (
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Plant preview"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full aspect-square max-w-md mx-auto flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
              <Leaf className="h-12 w-12 text-gray-300" />
              <p className="text-sm text-gray-500">
                Chưa có hình ảnh nào được tải lên
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button
          className="w-full sm:w-auto flex items-center gap-2"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className="h-4 w-4" />
          Tải lên hình ảnh
        </Button>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </CardFooter>
    </Card>
  );
}
