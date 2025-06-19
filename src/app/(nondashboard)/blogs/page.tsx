"use client";

import { BlogGrid, BlogListSkeleton } from "@/components/blogs/BlogGrid";
import { BlogHero } from "@/components/blogs/BlogHero";
import { BlogFilter, BlogFilterSkeleton } from "@/components/blogs/BlogFilter";
import { useGetAllBlogsQuery, useGetBlogsCategoryQuery } from "@/state/api";
import { useCallback, useState } from "react";

const BlogsPageSkeleton = () => {
  return (
    <main>
      <BlogHero />

      <section className="w-full py-12 bg-gray-50">
        <div className="px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <BlogFilterSkeleton />
            </div>
            <div className="lg:w-3/4">
              <BlogListSkeleton />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const BlogPage = () => {
  const [filters, setFilters] = useState<BlogsQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    categoryId: undefined,
    title: "",
    author: "",
    status: "published",
  });
  const handleFilterChange = useCallback(
    (newFilters: Partial<BlogsQueryParams>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const { data: blogsData, isLoading: blogsLoading } =
    useGetAllBlogsQuery(filters);
  const { data: blogsCategories, isLoading: blogsCategoriesLoading } =
    useGetBlogsCategoryQuery();

  if (blogsLoading || blogsCategoriesLoading) return <BlogsPageSkeleton />;

  return (
    <main>
      <BlogHero />

      <section className="w-full py-12 bg-gray-50">
        <div className="px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <BlogFilter
                categories={blogsCategories}
                currentFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
            <div className="lg:w-3/4">
              {blogsData && (
                <BlogGrid
                  blogsData={blogsData}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
