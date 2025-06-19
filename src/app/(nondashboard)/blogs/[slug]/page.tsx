"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Share2,
  Clock,
  MessageCircle,
  User,
  Facebook,
  Twitter,
} from "lucide-react";
import { useGetBlogBySlugQuery } from "@/state/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: post, isLoading } = useGetBlogBySlugQuery(slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800">Đã xuất bản</Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Bản nháp</Badge>
        );
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Đã lưu trữ</Badge>;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
            <Skeleton className="aspect-video w-full mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="lg:col-span-1 space-y-4">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
        <p className="text-gray-500 mb-6">
          Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/blogs">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách bài viết
          </Button>
        </Link>
      </div>
    );

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại blog
            </Button>
          </Link>
          <Badge variant="outline">{post.categoryName}</Badge>
          {getStatusBadge(post.status)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={post.authorName} />
                    <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
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
                  <CardTitle className="text-lg">Thông tin bài viết</CardTitle>
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
      </div>
    </main>
  );
}
