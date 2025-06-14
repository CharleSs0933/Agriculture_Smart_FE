"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  CheckCircle,
  Archive,
  Edit,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface BlogDetailModalProps {
  post: BlogPostApi;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogDetailModal({
  post,
  open,
  onOpenChange,
}: BlogDetailModalProps) {
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "secondary";
      case "archived":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4" />;
      case "draft":
        return <Clock className="h-4 w-4" />;
      case "archived":
        return <Archive className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight pr-8">
            {post.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Featured Image */}
            <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt={post.title}
                fill
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Nội dung bài viết</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  Đây là phần preview nội dung bài viết. Trong thực tế, nội dung
                  đầy đủ sẽ được hiển thị ở đây với định dạng HTML hoặc Markdown
                  được render thành HTML.
                </p>
                <p className="text-muted-foreground">
                  Bài viết này sẽ bao gồm các thông tin chi tiết về chủ đề được
                  đề cập, với hình ảnh minh họa và các ví dụ cụ thể để người đọc
                  dễ hiểu và áp dụng.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Xem trên trang web
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="space-y-3">
              <h4 className="font-medium">Trạng thái</h4>
              <Badge variant={getStatusVariant(post.status)} className="gap-2">
                {getStatusIcon(post.status)}
                {getStatusLabel(post.status)}
              </Badge>
            </div>

            <Separator />

            {/* Statistics */}
            <div className="space-y-3">
              <h4 className="font-medium">Thống kê</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {post.viewCount.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">lượt xem</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Author & Category */}
            <div className="space-y-3">
              <h4 className="font-medium">Thông tin</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Tác giả:</span>
                  <span className="font-medium">{post.authorName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Danh mục:</span>
                  <Badge variant="outline">{post.categoryName}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dates */}
            <div className="space-y-3">
              <h4 className="font-medium">Thời gian</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Ngày tạo</span>
                  </div>
                  <p className="text-sm font-medium ml-6">
                    {formatDateTime(post.createdAt)}
                  </p>
                </div>

                {post.publishedAt && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Ngày xuất bản</span>
                    </div>
                    <p className="text-sm font-medium ml-6">
                      {formatDateTime(post.publishedAt)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* SEO Info */}
            <div className="space-y-3">
              <h4 className="font-medium">SEO</h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Slug:</span>
                  <p className="font-mono text-xs bg-muted p-2 rounded mt-1 break-all">
                    {post.slug}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
