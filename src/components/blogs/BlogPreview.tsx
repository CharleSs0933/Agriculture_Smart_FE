"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Calendar,
  User,
  Clock,
  CheckCircle,
  Archive,
  Loader2,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetBlogByIdQuery } from "@/state/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface BlogDetailModalProps {
  blogId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogDetailModal({
  blogId,
  open,
  onOpenChange,
}: BlogDetailModalProps) {
  const { data: post, isLoading } = useGetBlogByIdQuery(blogId!, {
    skip: !blogId,
  });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight pr-8">
            Xem trước bài viết
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải bài viết...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article>
                {/* Article Header */}
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <Badge variant="outline">{post.categoryName}</Badge>
                    <Badge
                      variant={getStatusVariant(post.status)}
                      className="gap-1"
                    >
                      {getStatusIcon(post.status)}
                      {getStatusLabel(post.status)}
                    </Badge>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {post.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{post.authorName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.publishedAt
                            ? formatDate(post.publishedAt)
                            : formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.viewCount} lượt xem
                        </span>
                        {post.updatedAt !== post.createdAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Cập nhật: {formatDate(post.updatedAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Article Content */}
                <div
                  className="prose max-w-none mb-8 prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-li:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="mb-8" />

                {/* Share Section */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-4">Chia sẻ bài viết này</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex-1">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Zalo
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src="/placeholder.svg"
                          alt={post.authorName}
                        />
                        <AvatarFallback>
                          {post.authorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">
                          {post.authorName}
                        </h4>
                        <p className="text-gray-600 mb-3">
                          Chuyên gia nông nghiệp với nhiều năm kinh nghiệm trong
                          lĩnh vực {post.categoryName.toLowerCase()}.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Theo dõi
                          </Button>
                          <Button variant="outline" size="sm">
                            Xem tất cả bài viết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Post Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Thông tin bài viết
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Tác giả: {post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>
                        Xuất bản:{" "}
                        {post.publishedAt
                          ? formatDate(post.publishedAt)
                          : "Chưa xuất bản"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span>Lượt xem: {post.viewCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Danh mục: {post.categoryName}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
