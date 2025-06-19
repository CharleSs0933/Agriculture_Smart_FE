"use client";

import { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { BlogDetailModal } from "@/components/blogs/BlogPreview";
import {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogsCategoryQuery,
  useUpdateBlogMutation,
} from "@/state/api";
import { toast } from "sonner";
import { Pagination } from "@/components/Pagination";
import {
  BlogAdminFilter,
  BlogToolbarSkeleton,
} from "@/components/blogs/BlogAdminFilter";
import { BlogFormDialog } from "@/components/blogs/BlogEditor";
import { BlogTable, BlogTableSkeleton } from "@/components/blogs/BlogTable";

export default function AdminBlogPage() {
  const [filters, setFilters] = useState<BlogsQueryParams>({
    pageNumber: 1,
    pageSize: 5,
    title: "",
    author: "",
    categoryId: undefined,
    status: undefined,
  });

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const { data: blogsData, isLoading: blogsLoading } =
    useGetAllBlogsQuery(filters);
  const { data: blogsCategories, isLoading: blogsCategoriesLoading } =
    useGetBlogsCategoryQuery();
  const [updateBlog] = useUpdateBlogMutation();
  const [createBlog] = useCreateBlogMutation();

  const handleFilterChange = useCallback(
    (newFilters: Partial<BlogsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, pageNumber: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const handleSavePost = async (postData: BlogFormParams) => {
    console.log("Saving post:", postData);
    // Simulate API call
    if (selectedBlogId) {
      await updateBlog({ id: selectedBlogId, formData: postData })
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
    setSelectedBlogId(null);
  };

  const handleEditPost = (blogId: number) => {
    setSelectedBlogId(blogId);
    setShowCreateDialog(true);
  };

  const handleCreatePost = () => {
    setSelectedBlogId(null);
    setShowCreateDialog(true);
  };

  const handleViewPost = (blogId: number) => {
    setSelectedBlogId(blogId);
    setShowDetailModal(true);
  };

  if (blogsLoading || blogsCategoriesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quản lý Blog</h1>
            <p className="text-muted-foreground">
              Quản lý bài viết và nội dung blog
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách bài viết</CardTitle>
            <CardDescription>
              Quản lý và chỉnh sửa các bài viết blog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BlogToolbarSkeleton />

            {/* Table */}
            <BlogTableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Blog</h1>
          <p className="text-muted-foreground">
            Quản lý bài viết và nội dung blog
          </p>
        </div>
        <Button onClick={handleCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo bài viết
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
          <CardDescription>
            Quản lý và chỉnh sửa các bài viết blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BlogAdminFilter
            categories={blogsCategories}
            currentFilters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Table */}
          <BlogTable
            blogsData={blogsData}
            handleEditPost={handleEditPost}
            handleViewPost={handleViewPost}
          />

          {/* Pagination */}
          {blogsData && blogsData.totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={blogsData.pageNumber}
                onPageChange={handlePageChange}
                totalPages={blogsData.totalPages}
                hasNextPage={blogsData.hasNextPage}
                hasPreviousPage={blogsData.hasPreviousPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {showDetailModal && selectedBlogId && (
        <BlogDetailModal
          blogId={selectedBlogId}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
        />
      )}

      <BlogFormDialog
        blogId={selectedBlogId}
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) {
            setSelectedBlogId(null);
          }
        }}
        onSave={handleSavePost}
      />
    </div>
  );
}
