"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Share2,
  Facebook,
  Twitter,
  MessageCircle,
  Bookmark,
  Heart,
} from "lucide-react";

// Mock data - in real app, this would come from API based on the ID
const blogPost: BlogPost = {
  id: "1",
  title: "Xu hướng nông nghiệp thông minh 2024: IoT và AI trong canh tác",
  excerpt:
    "Khám phá những công nghệ mới nhất đang thay đổi ngành nông nghiệp, từ cảm biến IoT đến trí tuệ nhân tạo.",
  content: `
    <h2>Giới thiệu về nông nghiệp thông minh</h2>
    <p>Nông nghiệp thông minh đang trở thành xu hướng không thể thiếu trong thời đại công nghệ 4.0. Việc ứng dụng IoT (Internet of Things) và AI (Artificial Intelligence) vào nông nghiệp đã mang lại những thay đổi tích cực, giúp nông dân tối ưu hóa quy trình sản xuất và nâng cao năng suất.</p>

    <h3>Ứng dụng IoT trong nông nghiệp</h3>
    <p>Các cảm biến IoT có thể theo dõi:</p>
    <ul>
      <li>Độ ẩm đất và không khí</li>
      <li>Nhiệt độ môi trường</li>
      <li>Lượng ánh sáng</li>
      <li>pH của đất</li>
      <li>Nồng độ dinh dưỡng</li>
    </ul>

    <h3>AI trong chẩn đoán bệnh cây trồng</h3>
    <p>Trí tuệ nhân tạo giúp:</p>
    <ul>
      <li>Phân tích hình ảnh để phát hiện bệnh sớm</li>
      <li>Dự đoán thời điểm tối ưu cho việc gieo trồng</li>
      <li>Tối ưu hóa việc sử dụng phân bón và thuốc bảo vệ thực vật</li>
      <li>Quản lý tưới tiêu thông minh</li>
    </ul>

    <h3>Lợi ích của nông nghiệp thông minh</h3>
    <p>Việc áp dụng công nghệ vào nông nghiệp mang lại nhiều lợi ích:</p>
    <ul>
      <li>Tăng năng suất cây trồng lên 20-30%</li>
      <li>Giảm chi phí sản xuất 15-25%</li>
      <li>Tiết kiệm nước tưới 30-40%</li>
      <li>Giảm sử dụng phân bón và thuốc bảo vệ thực vật</li>
      <li>Nâng cao chất lượng sản phẩm</li>
    </ul>

    <h3>Thách thức và giải pháp</h3>
    <p>Mặc dù có nhiều lợi ích, việc áp dụng công nghệ vào nông nghiệp vẫn gặp một số thách thức:</p>
    <ul>
      <li>Chi phí đầu tư ban đầu cao</li>
      <li>Thiếu kiến thức về công nghệ</li>
      <li>Hạ tầng mạng chưa đầy đủ ở nông thôn</li>
    </ul>

    <p>Để giải quyết những thách thức này, cần có sự hỗ trợ từ chính phủ, các tổ chức và doanh nghiệp trong việc đào tạo, tài chính và phát triển hạ tầng.</p>

    <h3>Kết luận</h3>
    <p>Nông nghiệp thông minh không chỉ là xu hướng mà đã trở thành nhu cầu thiết yếu để đảm bảo an ninh lương thực và phát triển bền vững. Việc đầu tư vào công nghệ ngay từ bây giờ sẽ giúp nông dân Việt Nam cạnh tranh tốt hơn trên thị trường quốc tế.</p>
  `,
  author: "Nguyễn Văn An",
  publishedAt: "2024-01-15",
  updatedAt: "2024-01-15",
  category: "Xu hướng",
  image: "/placeholder.svg?height=400&width=800",
  views: 1250,
  likes: 45,
  comments: 12,
  featured: true,
  tags: ["IoT", "AI", "Công nghệ", "Thông minh"],
};

export default function BlogDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blogPost.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <main>
      <div className=" mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại blog
            </Button>
          </Link>
          <Badge variant="outline">{blogPost.category}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {blogPost.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">{blogPost.excerpt}</p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={blogPost.author} />
                    <AvatarFallback>{blogPost.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{blogPost.author}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(blogPost.publishedAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>

                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {blogPost.views} lượt xem
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLike}
                    className={isLiked ? "text-red-600 border-red-600" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 mr-2 ${
                        isLiked ? "fill-current" : ""
                      }`}
                    />
                    {likesCount}
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {blogPost.comments}
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
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Content */}
              <div
                className="prose max-w-none mb-8 prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blogPost.tags.map((tag) => (
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

              {/* Author Bio */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={blogPost.author}
                      />
                      <AvatarFallback>
                        {blogPost.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">
                        {blogPost.author}
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Kỹ sư nông nghiệp với hơn 10 năm kinh nghiệm trong lĩnh
                        vực công nghệ nông nghiệp. Chuyên gia về IoT và AI trong
                        canh tác.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Theo dõi
                        </Button>
                        <Button variant="outline" size="sm">
                          Xem tất cả bài viết
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mục lục</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href="#intro"
                    className="block text-sm text-gray-600 hover:text-green-600"
                  >
                    Giới thiệu về nông nghiệp thông minh
                  </a>
                  <a
                    href="#iot"
                    className="block text-sm text-gray-600 hover:text-green-600"
                  >
                    Ứng dụng IoT trong nông nghiệp
                  </a>
                  <a
                    href="#ai"
                    className="block text-sm text-gray-600 hover:text-green-600"
                  >
                    AI trong chẩn đoán bệnh cây trồng
                  </a>
                  <a
                    href="#benefits"
                    className="block text-sm text-gray-600 hover:text-green-600"
                  >
                    Lợi ích của nông nghiệp thông minh
                  </a>
                  <a
                    href="#challenges"
                    className="block text-sm text-gray-600 hover:text-green-600"
                  >
                    Thách thức và giải pháp
                  </a>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thẻ tag phổ biến</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "IoT",
                      "AI",
                      "Hữu cơ",
                      "Bền vững",
                      "Hydroponics",
                      "Công nghệ",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-green-50"
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
