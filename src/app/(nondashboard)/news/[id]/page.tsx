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
  Eye,
  Share2,
  Building,
  User,
  Facebook,
  Twitter,
  MessageCircle,
  Bookmark,
} from "lucide-react";

// Mock data - in real app, this would come from API
const newsArticle: NewsArticle = {
  id: "1",
  title: "Chính phủ công bố gói hỗ trợ 10.000 tỷ đồng cho nông nghiệp 2024",
  excerpt:
    "Thủ tướng Chính phủ vừa ký quyết định phê duyệt gói hỗ trợ tín dụng ưu đãi 10.000 tỷ đồng nhằm thúc đẩy phát triển nông nghiệp bền vững.",
  content: `
    <p>Ngày 20/1/2024, Thủ tướng Chính phủ đã ký Quyết định số 01/2024/QĐ-TTg phê duyệt gói hỗ trợ tín dụng ưu đãi 10.000 tỷ đồng cho ngành nông nghiệp trong năm 2024.</p>

    <h3>Mục tiêu của gói hỗ trợ</h3>
    <p>Gói hỗ trợ này nhằm:</p>
    <ul>
      <li>Thúc đẩy phát triển nông nghiệp bền vững, hiện đại</li>
      <li>Hỗ trợ nông dân tiếp cận nguồn vốn với lãi suất ưu đãi</li>
      <li>Đẩy mạnh ứng dụng công nghệ cao trong sản xuất nông nghiệp</li>
      <li>Nâng cao chất lượng và giá trị sản phẩm nông nghiệp</li>
    </ul>

    <h3>Đối tượng được hỗ trợ</h3>
    <p>Gói hỗ trợ sẽ ưu tiên cho các đối tượng sau:</p>
    <ul>
      <li>Hợp tác xã nông nghiệp</li>
      <li>Doanh nghiệp hoạt động trong lĩnh vực nông nghiệp</li>
      <li>Nông dân, hộ gia đình sản xuất nông nghiệp</li>
      <li>Các dự án ứng dụng công nghệ cao</li>
    </ul>

    <h3>Lãi suất và điều kiện vay</h3>
    <p>Theo quyết định, lãi suất cho vay sẽ được hỗ trợ từ 2-4%/năm tùy theo đối tượng và mục đích sử dụng vốn. Thời hạn cho vay tối đa 10 năm đối với các dự án đầu tư dài hạn.</p>

    <h3>Thủ tục đăng ký</h3>
    <p>Các đối tượng có nhu cầu vay vốn có thể nộp hồ sơ tại các ngân hàng thương mại được ủy quyền hoặc qua hệ thống trực tuyến của Bộ Nông nghiệp và Phát triển Nông thôn.</p>

    <p>Gói hỗ trợ này được kỳ vọng sẽ tạo động lực mạnh mẽ cho sự phát triển của ngành nông nghiệp Việt Nam trong năm 2024.</p>
  `,
  author: "Ban Biên tập",
  publishedAt: "2024-01-20",
  category: "Chính sách",
  image:
    "https://s3zs55b05y.ufs.sh/f/mwEfFzLmOdgcrAZxxbzaFsz5juXgEZKcWkbvBifGpJ1R4YyL",
  views: 5420,
  featured: true,
  urgent: true,
  tags: ["Chính sách", "Hỗ trợ", "Tín dụng", "Nông nghiệp"],
  source: "Bộ Nông nghiệp và Phát triển Nông thôn",
};

const relatedNews: NewsArticle[] = [
  {
    id: "2",
    title: "Cảnh báo dịch bệnh cúm gia cầm H5N1 tại các tỉnh phía Bắc",
    excerpt:
      "Cục Thú y khuyến cáo các tỉnh phía Bắc tăng cường biện pháp phòng chống dịch bệnh cúm gia cầm H5N1.",
    author: "Phòng Tin tức",
    publishedAt: "2024-01-18",
    content: "",
    category: "Cảnh báo",
    image: "/placeholder.svg?height=200&width=300",
    views: 3210,
    featured: false,
    urgent: true,
    tags: ["Dịch bệnh", "Gia cầm"],
    source: "Cục Thú y",
  },
  {
    id: "3",
    title: "Giá lúa gạo xuất khẩu tăng mạnh trong quý I/2024",
    excerpt:
      "Theo báo cáo của Hiệp hội Lương thực Việt Nam, giá lúa gạo xuất khẩu đã tăng 15% so với cùng kỳ năm trước.",
    author: "Bộ phận Thị trường",
    publishedAt: "2024-01-16",
    content: "",
    category: "Thị trường",
    image: "/placeholder.svg?height=200&width=300",
    views: 2890,
    featured: false,
    urgent: false,
    tags: ["Xuất khẩu", "Lúa gạo"],
    source: "Hiệp hội Lương thực Việt Nam",
  },
];

export default function NewsDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          <Badge variant="outline">{newsArticle.category}</Badge>
          {newsArticle.urgent && <Badge className="bg-red-600">Khẩn cấp</Badge>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {newsArticle.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {newsArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {newsArticle.source}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {newsArticle.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(newsArticle.publishedAt).toLocaleDateString(
                      "vi-VN"
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {newsArticle.views} lượt xem
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
                  src={newsArticle.image || "/placeholder.svg"}
                  alt={newsArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Content */}
              <div
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: newsArticle.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {newsArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

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
              <Card>
                <CardHeader>
                  <CardTitle>Tin tức liên quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedNews.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      variant="compact"
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Thẻ tag phổ biến</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Chính sách",
                      "Hỗ trợ",
                      "Dịch bệnh",
                      "Xuất khẩu",
                      "Thời tiết",
                      "Nghiên cứu",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
