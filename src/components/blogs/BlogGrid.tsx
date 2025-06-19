"use client";

import { Leaf } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { Pagination } from "../Pagination";
import { Skeleton } from "../ui/skeleton";

interface BlogGridProps {
  blogsData: ApiResponse<BlogPost>;
  onPageChange: (page: number) => void;
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-60" />
      </div>

      {/* Blog Card Skeleton Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />{" "}
            {/* Image Placeholder */}
            <Skeleton className="h-6 w-3/4" /> {/* Title */}
            <Skeleton className="h-4 w-1/2" /> {/* Author/Date */}
            <Skeleton className="h-4 w-full" /> {/* Excerpt */}
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center pt-6">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </div>
  );
}

export function BlogGrid({ blogsData, onPageChange }: BlogGridProps) {
  const {
    items: blogs,
    totalCount,
    pageNumber,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = blogsData;

  return (
    <div className="space-y-6">
      {blogs.length > 0 ? (
        <>
          <div className="flex justify-between items-center ">
            <p className="text-sm text-gray-600">
              Hiển thị {blogs.length} trong tổng số {totalCount} sản phẩm
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard post={blog} key={blog.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Leaf className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            Không tìm thấy bài viết nào
          </h3>
          <p className="text-gray-400">
            Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
