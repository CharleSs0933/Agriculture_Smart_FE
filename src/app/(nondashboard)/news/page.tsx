"use client";

import { NewsFilter, NewsFilterSkeleton } from "@/components/news/NewsFilter";
import { NewsList, NewsListSkeleton } from "@/components/news/NewsList";

import { useGetAllNewsQuery, useGetNewsCategoriesQuery } from "@/state/api";

import React, { useCallback, useState } from "react";

const NewsPageSkeleton = () => {
  return (
    <main className="w-full h-full">
      {/* Header */}
      <section className="w-full py-12 md:py-16 bg-blue-50">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tin Tức Nông Nghiệp
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cập nhật thông tin chính thức từ các cơ quan quản lý nhà nước,
                chính sách mới, cảnh báo dịch bệnh và xu hướng thị trường.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 bg-gray-50">
        <div className="px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Skeleton */}
            <div className="lg:w-1/4">
              <NewsFilterSkeleton />
            </div>

            {/* News List Skeleton */}
            <div className="lg:w-3/4 space-y-6">
              <NewsListSkeleton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const NewsPage = () => {
  const [filters, setFilters] = useState<NewsQueryParams>({
    page: 1,
    pageSize: 10,
    categoryId: undefined,
    title: "",
    author: "",
  });

  const handleFilterChange = useCallback(
    (newFilters: Partial<NewsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const { data: newsData, isLoading: newsLoading } =
    useGetAllNewsQuery(filters);
  const { data: newsCategoriesData, isLoading: newsCategoriesLoading } =
    useGetNewsCategoriesQuery();

  if (newsLoading || newsCategoriesLoading) return <NewsPageSkeleton />;

  return (
    <main className="w-full h-full">
      <section className="w-full py-12 md:py-16 bg-blue-50">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Tin Tức Nông Nghiệp
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Cập nhật thông tin chính thức từ các cơ quan quản lý nhà nước,
                chính sách mới, cảnh báo dịch bệnh và xu hướng thị trường.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main News Content */}
      <section className="w-full py-12 bg-gray-50">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4 ">
              <NewsFilter
                categories={newsCategoriesData}
                currentFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {newsData && (
                <NewsList newsData={newsData} onPageChange={handlePageChange} />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
