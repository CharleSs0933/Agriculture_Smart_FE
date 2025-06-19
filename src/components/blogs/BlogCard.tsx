import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Eye, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  categoryName: string;
  authorName: string;
  createdAt: string;
  publishedAt: string | null;
  viewCount: number;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="bg-yellow-500">Bản nháp</Badge>;
      case "published":
        return <Badge className="bg-green-600">Đã xuất bản</Badge>;
      case "archived":
        return <Badge className="bg-gray-500">Lưu trữ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const displayDate = post.publishedAt || post.createdAt;

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                {post.categoryName}
              </Badge>
              {getStatusBadge(post.status)}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(displayDate).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.viewCount}
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold leading-tight hover:text-blue-600 transition-colors ">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span className="font-medium">{post.authorName}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Đọc thêm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 hover:border-gray-300">
        <CardContent className="p-4 ">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {post.categoryName}
                </Badge>
                <span>{new Date(displayDate).toLocaleDateString("vi-VN")}</span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.authorName}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.viewCount}
                </span>
              </div>
            </div>
            {post.status !== "published" && (
              <div className="flex-shrink-0">{getStatusBadge(post.status)}</div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link href={`/blogs/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="outline"
              className="group-hover:bg-blue-50 transition-colors"
            >
              {post.categoryName}
            </Badge>
            {post.status !== "published" && getStatusBadge(post.status)}
          </div>
          <CardTitle className="text-lg font-bold leading-tight  line-clamp-1 group-hover:text-green-600 transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span className="truncate font-medium">{post.authorName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(displayDate).toLocaleDateString("vi-VN")}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.viewCount}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full group-hover:bg-green-50 group-hover:border-gray-200 transition-colors"
          >
            Đọc thêm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
