"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Eye,
  Edit,
  User,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  Archive,
} from "lucide-react";
import { Pagination } from "@/components/admin/pagination";
import { BlogDetailModal } from "@/components/admin/blog_detail_modal";
import { BlogFormDialog } from "@/components/admin/blog_form_dialog";
import { BulkActions } from "@/components/admin/bulk_actions";
import { mockPosts } from "@/lib/constants";

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Mock data

  const categories = mockPosts
    ? Array.from(new Set(mockPosts.map((post) => post.categoryName)))
    : [];

  // Filter and search logic
  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categoryName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.categoryName === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  // Statistics
  const stats = {
    total: mockPosts.length,
    published: mockPosts.filter((p) => p.status === "published").length,
    draft: mockPosts.filter((p) => p.status === "draft").length,
    totalViews: mockPosts.reduce((sum, p) => sum + p.viewCount, 0),
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

  const handleSelectPost = (postId: number, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(paginatedPosts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleBulkAction = (action: string, items: number[]) => {
    console.log(`Bulk action: ${action}`, items);
    // Implement bulk actions here
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowFormDialog(true);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowFormDialog(true);
  };

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

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              +12% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã xuất bản</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.published / stats.total) * 100).toFixed(1)}% tổng bài
              viết
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bản nháp</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">Cần hoàn thiện</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +18% so với tháng trước
            </p>
          </CardContent>
        </Card>
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bài viết, tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="published">Đã xuất bản</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                  <SelectItem value="archived">Lưu trữ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          <BulkActions
            selectedItems={selectedPosts}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedPosts([])}
          />

          {/* Table */}
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="w-12 p-4">
                      <Checkbox
                        checked={
                          selectedPosts.length === paginatedPosts.length &&
                          paginatedPosts.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
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
                  {paginatedPosts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedPosts.includes(post.id)}
                          onCheckedChange={(checked) =>
                            handleSelectPost(post.id, checked as boolean)
                          }
                        />
                      </td>
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
                            onClick={() => handleViewPost(post)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredPosts.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showDetailModal && selectedPost && (
        <BlogDetailModal
          post={selectedPost}
          open={showDetailModal}
          onOpenChange={setShowDetailModal}
        />
      )}

      {showFormDialog && (
        <BlogFormDialog
          post={editingPost}
          open={showFormDialog}
          onOpenChange={setShowFormDialog}
          onSave={(post) => {
            console.log("Save post:", post);
            setShowFormDialog(false);
          }}
        />
      )}
    </div>
  );
}
