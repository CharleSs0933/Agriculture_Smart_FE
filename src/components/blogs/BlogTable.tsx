import { Archive, CheckCircle, Clock, Edit, Eye, User } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function BlogTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium">ID</th>
              <th className="text-left p-4 font-medium min-w-[300px]">
                Bài viết
              </th>
              <th className="text-left p-4 font-medium">Trạng thái</th>
              <th className="text-left p-4 font-medium">Lượt xem</th>
              <th className="text-left p-4 font-medium">Ngày tạo</th>
              <th className="text-left p-4 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b hover:bg-muted/50">
                <td className="p-4">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-64" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-4 w-12 rounded-md" />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-24 rounded-md" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="p-4 space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BlogTable({
  blogsData,
  handleViewPost,
  handleEditPost,
}: {
  blogsData: ApiResponse<BlogPost> | undefined;
  handleViewPost: (blogId: number) => void;
  handleEditPost: (blogId: number) => void;
}) {
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
        return <CheckCircle className="h-3 w-3" />;
      case "draft":
        return <Clock className="h-3 w-3" />;
      case "archived":
        return <Archive className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 font-medium">ID</th>
              <th className="text-left p-4 font-medium min-w-[300px]">
                Bài viết
              </th>
              <th className="text-left p-4 font-medium">Trạng thái</th>
              <th className="text-left p-4 font-medium">Lượt xem</th>
              <th className="text-left p-4 font-medium">Ngày tạo</th>
              <th className="text-left p-4 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {blogsData && blogsData.items.length > 0 ? (
              blogsData.items.map((post) => (
                <tr key={post.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <span className="font-mono text-sm">#{post.id}</span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-medium line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{post.authorName}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.categoryName}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={getStatusVariant(post.status)}
                      className="gap-1"
                    >
                      {getStatusIcon(post.status)}
                      {getStatusLabel(post.status)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">
                        {post.viewCount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="font-medium">
                        {formatDate(post.createdAt)}
                      </div>
                      {post.publishedAt && (
                        <div className="text-muted-foreground text-xs">
                          Xuất bản: {formatDate(post.publishedAt)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewPost(post.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPost(post.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    Không tìm thấy bài viết nào
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
