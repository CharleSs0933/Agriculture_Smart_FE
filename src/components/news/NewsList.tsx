import React from "react";
import { NewsCard } from "./NewsCard";
import { Leaf } from "lucide-react";
import { Pagination } from "../Pagination";
import { Skeleton } from "../ui/skeleton";

interface NewsListProps {
  newsData: ApiResponse<News>;
  onPageChange: (page: number) => void;
}

export const NewsListSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="flex gap-4 border rounded-lg p-4 animate-pulse"
        >
          <Skeleton className="w-32 h-20 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/3 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const NewsList = ({ newsData, onPageChange }: NewsListProps) => {
  const {
    items: news,
    totalCount,
    pageNumber,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  } = newsData;

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {news.length > 0 ? (
          <>
            <div className="flex justify-between items-center ">
              <p className="text-sm text-gray-600">
                Hiển thị {news.length} trong tổng số {totalCount} sản phẩm
              </p>
            </div>

            {news.map((news) => (
              <NewsCard key={news.id} news={news} variant="list" />
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-500 mb-2">
              Không tin tức nào
            </h3>
            <p className="text-gray-400">
              Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.
            </p>
          </div>
        )}
      </div>
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
};
