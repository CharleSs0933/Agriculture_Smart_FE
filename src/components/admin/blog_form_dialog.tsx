"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Eye } from "lucide-react";
import Image from "next/image";

interface BlogFormDialogProps {
  post?: BlogPostApi | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (post: Partial<BlogPostApi>) => void;
}

export function BlogFormDialog({
  post,
  open,
  onOpenChange,
  onSave,
}: BlogFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryName: "",
    status: "draft" as "draft" | "published" | "archived",
    featuredImage: "",
  });

  const [slug, setSlug] = useState("");

  const categories = [
    "Kỹ thuật canh tác",
    "Bệnh cây trồng",
    "Công nghệ",
    "Giống cây trồng",
    "Phân bón",
    "Tưới tiêu",
    "Thu hoạch",
    "Chế biến",
  ];

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: "", // Will be loaded from API
        categoryName: post.categoryName,
        status: post.status,
        featuredImage: "",
      });
      setSlug(post.slug);
    } else {
      setFormData({
        title: "",
        content: "",
        categoryName: "",
        status: "draft",
        featuredImage: "",
      });
      setSlug("");
    }
  }, [post]);

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !post) {
      const generatedSlug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(generatedSlug);
    }
  }, [formData.title, post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      ...formData,
      slug,
      id: post?.id,
    };

    onSave(postData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, upload to server and get URL
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, featuredImage: imageUrl }));
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Đã xuất bản";
      case "draft":
        return "Bản nháp";
      case "archived":
        return "Lưu trữ";
      default:
        return status;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {post ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề bài viết *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Nhập tiêu đề bài viết..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-slug-bai-viet"
                />
                <p className="text-xs text-muted-foreground">
                  URL: /blog/{slug || "url-slug-bai-viet"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Nội dung bài viết *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Nhập nội dung bài viết..."
                  rows={12}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Hỗ trợ Markdown và HTML
                </p>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label>Ảnh đại diện</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  {formData.featuredImage ? (
                    <div className="relative">
                      <Image
                        src={formData.featuredImage || "/placeholder.svg"}
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            featuredImage: "",
                          }))
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <span className="text-sm font-medium text-primary hover:text-primary/80">
                            Tải ảnh lên
                          </span>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF tối đa 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Cài đặt xuất bản</h4>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(
                      value: "draft" | "published" | "archived"
                    ) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Đã xuất bản</SelectItem>
                      <SelectItem value="archived">Lưu trữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select
                    value={formData.categoryName}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, categoryName: value }))
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
              </div>

              <Separator />

              {/* Preview */}
              <div className="space-y-4">
                <h4 className="font-medium">Xem trước</h4>
                <div className="p-4 border rounded-lg space-y-3">
                  <h5 className="font-medium line-clamp-2">
                    {formData.title || "Tiêu đề bài viết"}
                  </h5>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {formData.categoryName || "Danh mục"}
                    </Badge>
                    <Badge
                      variant={
                        formData.status === "draft" ? "success" : "secondary"
                      }
                    >
                      {getStatusLabel(formData.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {formData.content ||
                      "Nội dung bài viết sẽ hiển thị ở đây..."}
                  </p>
                </div>
              </div>

              <Separator />

              {/* SEO */}
              <div className="space-y-4">
                <h4 className="font-medium">SEO</h4>
                <div className="text-sm space-y-2">
                  <div>
                    <span className="text-muted-foreground">URL:</span>
                    <p className="font-mono text-xs bg-muted p-2 rounded break-all">
                      /blog/{slug || "url-slug"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Độ dài tiêu đề:
                    </span>
                    <span
                      className={`ml-2 ${
                        formData.title.length > 60
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {formData.title.length}/60
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="button" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Xem trước
            </Button>
            <Button type="submit">{post ? "Cập nhật" : "Tạo bài viết"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
