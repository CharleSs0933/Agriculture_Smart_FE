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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { RichTextEditor } from "../RichTextEditor";
import { useGetBlogByIdQuery, useGetBlogsCategoryQuery } from "@/state/api";
import { UploadDropzone } from "@/lib/uploadthing";

interface BlogFormDialogProps {
  blogId?: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (post: BlogFormParams) => void;
}

export function BlogFormDialog({
  blogId,
  open,
  onOpenChange,
  onSave,
}: BlogFormDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: 0,
    status: "draft" as "draft" | "published" | "archived",
    featuredImage: "",
  });

  const [slug, setSlug] = useState("");

  const { data: post, isLoading } = useGetBlogByIdQuery(blogId!, {
    skip: !blogId,
  });
  const { data: blogsCategories, isLoading: blogsCategoriesLoading } =
    useGetBlogsCategoryQuery();

  useEffect(() => {
    if (blogId && post && !isLoading && open) {
      setFormData({
        title: post.title,
        content: post.content || "",
        categoryId: post.categoryId,
        status: post.status,
        featuredImage: post.featuredImage || "",
      });
      setSlug(post.slug);
    } else {
      setFormData({
        title: "",
        content: "",
        categoryId: 0,
        status: "draft",
        featuredImage: "",
      });
      setSlug("");
    }
  }, [blogId, open, post, isLoading]);

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

  // Strip HTML tags for preview and word count
  const getPlainTextPreview = (html: string) => {
    if (typeof window === "undefined") return "";
    try {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    } catch {
      return "";
    }
  };

  const getWordCount = (html: string) => {
    const plainText = getPlainTextPreview(html);
    return plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  };

  const getReadingTime = (html: string) => {
    const wordCount = getWordCount(html);
    const wordsPerMinute = 200; // Average reading speed
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {blogId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
          </DialogTitle>
        </DialogHeader>

        {isLoading || blogsCategoriesLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải bài viết...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề bài viết *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
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
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) =>
                      setFormData((prev) => ({ ...prev, content }))
                    }
                    placeholder="Nhập nội dung bài viết..."
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Số từ: {getWordCount(formData.content)}</span>
                    <span>
                      Thời gian đọc: ~{getReadingTime(formData.content)} phút
                    </span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                  <Label>Ảnh đại diện</Label>
                  {formData.featuredImage ? (
                    <div className="relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <Image
                        src={formData.featuredImage || "/placeholder.svg"}
                        alt="Featured"
                        width={600}
                        height={300}
                        className="w-full h-64 object-cover rounded-lg"
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
                    <div className="text-center space-y-2">
                      <UploadDropzone
                        endpoint={"imageUploader"}
                        content={{
                          label: "Kéo thả hình ảnh vào đây hoặc click để chọn",
                        }}
                        appearance={{
                          button: {
                            color: "black",
                          },
                        }}
                        className="border-2 border-dashed rounded-lg p-6 text-center transition-colors "
                        onClientUploadComplete={(res) => {
                          if (res?.[0]?.url) {
                            setFormData((prev) => ({
                              ...prev,
                              featuredImage: res?.[0]?.url,
                            }));
                          }
                        }}
                      />
                    </div>
                  )}
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
                      defaultValue={formData.status.toString()}
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
                      value={
                        formData.categoryId === 0
                          ? ""
                          : formData.categoryId.toString()
                      }
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          categoryId: Number(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {blogsCategories &&
                          blogsCategories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
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
                    {formData.featuredImage && (
                      <Image
                        src={formData.featuredImage || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <h5 className="font-medium line-clamp-2">
                      {formData.title || "Tiêu đề bài viết"}
                    </h5>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">
                        {blogsCategories?.find(
                          (c) => c.id === formData.categoryId
                        )?.name || "Danh mục"}
                      </Badge>
                      <Badge
                        variant={
                          formData.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {getStatusLabel(formData.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {getPlainTextPreview(formData.content) ||
                        "Nội dung bài viết sẽ hiển thị ở đây..."}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {getWordCount(formData.content)} từ •{" "}
                      {getReadingTime(formData.content)} phút đọc
                    </div>
                  </div>
                </div>

                <Separator />

                {/* SEO */}
                <div className="space-y-4">
                  <h4 className="font-medium">SEO & Thống kê</h4>
                  <div className="text-sm space-y-3">
                    <div>
                      <span className="text-muted-foreground">URL:</span>
                      <p className="font-mono text-xs bg-muted p-2 rounded break-all mt-1">
                        /blogs/{slug || "url-slug"}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Tiêu đề:</span>
                        <span
                          className={`block ${
                            formData.title.length > 60
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {formData.title.length}/60
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Từ khóa:</span>
                        <span className="block text-blue-500">
                          {getWordCount(formData.content)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Mô tả tự động:
                      </span>
                      <p className="text-xs bg-muted p-2 rounded mt-1 line-clamp-3">
                        {getPlainTextPreview(formData.content).substring(
                          0,
                          160
                        ) || "Chưa có nội dung..."}
                      </p>
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
              <Button type="submit">
                {post ? "Cập nhật" : "Tạo bài viết"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
