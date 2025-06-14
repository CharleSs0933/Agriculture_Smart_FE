"use client";

import { NewsCard } from "@/components/news/NewsCard";
import { NewsFilter } from "@/components/news/NewsFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { newsArticles, newsCategories } from "@/lib/constants";
import { Calendar, Globe } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );

  const filteredNews = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      case "popular":
        return b.views - a.views;
      default:
        return 0;
    }
  });

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
            <div className="lg:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle>Danh mục tin tức</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {newsCategories.map((category) => {
                      const Icon = category.icon;
                      const count =
                        category.value === "all"
                          ? newsArticles.length
                          : newsArticles.filter(
                              (article) => article.category === category.value
                            ).length;

                      return (
                        <Button
                          key={category.value}
                          variant={
                            selectedCategory === category.value
                              ? "default"
                              : "ghost"
                          }
                          className="w-full justify-start gap-2"
                          onClick={() => setSelectedCategory(category.value)}
                        >
                          <Icon className="h-4 w-4" />
                          {category.name}
                          <Badge variant="secondary" className="ml-auto">
                            {count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Latest News Sidebar */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Tin mới nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newsArticles.slice(0, 5).map((article) => (
                      <div
                        key={article.id}
                        className="border-b pb-3 last:border-b-0"
                      >
                        <Link href={`/news/${article.id}`}>
                          <h4 className="text-sm font-medium line-clamp-2 hover:text-blue-600 cursor-pointer">
                            {article.title}
                          </h4>
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.publishedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <NewsFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              <div className="grid gap-6 mt-6">
                {sortedNews.map((article) => (
                  <NewsCard key={article.id} article={article} variant="list" />
                ))}
              </div>

              {sortedNews.length === 0 && (
                <div className="text-center py-12">
                  <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">
                    Không tìm thấy tin tức nào
                  </h3>
                  <p className="text-gray-400">
                    Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsPage;
