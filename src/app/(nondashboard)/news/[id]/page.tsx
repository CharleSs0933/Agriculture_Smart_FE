"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { NewsCard } from "@/components/news/NewsCard";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Building,
  User,
  Facebook,
  Twitter,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { useGetAllNewsQuery, useGetNewsQuery } from "@/state/api";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const NewsDetailSkeleton = () => {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Button>
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="lg:col-span-3">
            <article>
              <div className="mb-6">
                <Skeleton className="h-10 w-3/4 mb-4 rounded" />
                <Skeleton className="h-6 w-2/3 mb-6 rounded" />

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <Skeleton className="h-8 w-28 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>

              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden bg-gray-200">
                <Skeleton className="h-full w-full" />
              </div>

              <div className="space-y-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>

              <Separator className="mb-8" />

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4">Chia sẻ bài viết này</h3>
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tin tức mới nhất</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: relatedNewsData, isLoading: relatedNewsLoading } =
    useGetAllNewsQuery({
      page: 1,
      pageSize: 3,
    });
  const { data: newsData, isLoading: newsLoading } = useGetNewsQuery(
    Number(id)
  );

  if (newsLoading || relatedNewsLoading || !newsData)
    return <NewsDetailSkeleton />;

  const { data: news } = newsData;

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại tin tức
            </Button>
          </Link>
          <Badge variant="outline">{news.categoryName}</Badge>
          {news.urgent && <Badge className="bg-red-600">Khẩn cấp</Badge>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {news.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{news.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {news.source}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {news.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(news.publishedAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark
                      className={`h-4 w-4 mr-2 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                    {isBookmarked ? "Đã lưu" : "Lưu bài"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <Image
                  src={news.imageUrl || "/placeholder.svg"}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Content */}
              <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: news.content || "" }}
              />

              <Separator className="mb-8" />

              {/* Share Section */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold mb-4">Chia sẻ bài viết này</h3>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Zalo
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Related News */}
              {relatedNewsData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tin tức mới nhất</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedNewsData.items.map((news) => (
                      <NewsCard key={news.id} news={news} variant="compact" />
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
