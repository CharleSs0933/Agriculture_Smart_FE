"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FileText,
} from "lucide-react";
import { BlogFormDialog } from "@/components/blogs/BlogEditor";
import {
  useCreateBlogMutation,
  useGetMyBlogsQuery,
  useUpdateBlogMutation,
} from "@/state/api";
import { Pagination } from "@/components/Pagination";
import { toast } from "sonner";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
  archived: "bg-red-100 text-red-800",
};

const statusLabels = {
  draft: "Bản nháp",
  published: "Đã đăng",
  archived: "Đã lưu trữ",
};

export default function MyPostsPage() {
  const [filters, setFilters] = useState<BlogsQueryParams>({
    pageNumber: 1,
    pageSize: 5,
    title: "",
    author: "",
    categoryId: undefined,
    status: undefined,
  });

  const [selectedTab, setSelectedTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  const { data: blogsData, isLoading } = useGetMyBlogsQuery(filters);
  const [updateBlog] = useUpdateBlogMutation();
  const [createBlog] = useCreateBlogMutation();

  const handleFilterChange = useCallback(
    (newFilters: Partial<BlogsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    const status =
      tab === "all" ? undefined : (tab as "draft" | "published" | "archived");
    handleFilterChange({ status });
  };

  const handleSavePost = async (postData: BlogFormParams) => {
    console.log("Saving post:", postData);
    // Simulate API call
    if (editingBlogId) {
      await updateBlog({ id: editingBlogId, formData: postData })
        .unwrap()
        .then(() => {
          toast.success("Cập nhật bài viết thành công");
        })
        .catch((error) => {
          console.log("Failed to update blog:", error);
        });
    } else {
      await createBlog(postData)
        .unwrap()
        .then(() => {
          toast.success("Đăng bài viết thành cong");
        })
        .catch((error) => {
          console.log("Failed to create blog:", error);
        });
    }
    // Close dialog and refresh posts
    setShowCreateDialog(false);
    setEditingBlogId(null);
  };

  const handleEditPost = (blogId: number) => {
    setEditingBlogId(blogId);
    setShowCreateDialog(true);
  };

  const handleCreatePost = () => {
    setEditingBlogId(null);
    setShowCreateDialog(true);
  };

  return (
    <main className="flex-1 bg-gray-50">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Bài viết của tôi</h1>
            <p className="text-gray-600">
              Quản lý và theo dõi các bài viết bạn đã đăng
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleCreatePost}
          >
            <Plus className="h-4 w-4 mr-2" />
            Viết bài mới
          </Button>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-500">Tổng bài viết</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.published}
                </div>
                <div className="text-sm text-gray-500">Đã đăng</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {stats.draft}
                </div>
                <div className="text-sm text-gray-500">Bản nháp</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.archived}
                </div>
                <div className="text-sm text-gray-500">Đã lưu trữ</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.totalViews}
                </div>
                <div className="text-sm text-gray-500">Lượt xem</div>
              </CardContent>
            </Card>
          </div> */}

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={filters.title || ""}
              onChange={(e) => handleFilterChange({ title: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">Tất cả </TabsTrigger>
            <TabsTrigger value="published">Đã đăng</TabsTrigger>
            <TabsTrigger value="draft">Bản nháp</TabsTrigger>
            <TabsTrigger value="archived">Đã lưu trữ</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            {isLoading ? (
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {blogsData && blogsData.items.length > 0 ? (
                  <div className="grid gap-6">
                    {blogsData.items.map((post) => (
                      <Card
                        key={post.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className={statusColors[post.status]}>
                                {statusLabels[post.status]}
                              </Badge>
                              <Badge variant="outline">
                                {post.categoryName}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleEditPost(post.id)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Xem trước
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <h3 className="text-xl font-semibold mb-4">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.viewCount} lượt xem
                              </span>
                              <span className="text-gray-400">
                                Tác giả: {post.authorName}
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPost(post.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Chưa có bài viết nào
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Bắt đầu chia sẻ kiến thức nông nghiệp của bạn!
                    </p>
                    <Button onClick={handleCreatePost}>
                      <Plus className="h-4 w-4 mr-2" />
                      Viết bài đầu tiên
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {blogsData && blogsData.totalPages > 1 && (
                  <Pagination
                    currentPage={blogsData.pageNumber}
                    onPageChange={handlePageChange}
                    totalPages={blogsData.totalPages}
                    hasNextPage={blogsData.hasNextPage}
                    hasPreviousPage={blogsData.hasPreviousPage}
                  />
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        <BlogFormDialog
          blogId={editingBlogId}
          open={showCreateDialog}
          onOpenChange={(open) => {
            setShowCreateDialog(open);
            if (!open) {
              setEditingBlogId(null);
            }
          }}
          onSave={handleSavePost}
        />
      </div>
    </main>
  );
}
