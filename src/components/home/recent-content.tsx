"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, ArrowRight, Newspaper, BookOpen } from "lucide-react";
import Link from "next/link";

const recentNews = [
  {
    title: "Chính phủ công bố gói hỗ trợ 10.000 tỷ đồng cho nông nghiệp 2024",
    excerpt:
      "Thủ tướng Chính phủ vừa ký quyết định phê duyệt gói hỗ trợ tín dụng ưu đãi...",
    date: "2024-01-20",
    views: 5420,
    category: "Chính sách",
  },
  {
    title: "Cảnh báo dịch bệnh cúm gia cầm H5N1 tại các tỉnh phía Bắc",
    excerpt:
      "Cục Thú y khuyến cáo các tỉnh phía Bắc tăng cường biện pháp phòng chống...",
    date: "2024-01-18",
    views: 3210,
    category: "Cảnh báo",
  },
];

const recentBlogs = [
  {
    title: "Xu hướng nông nghiệp thông minh 2024: IoT và AI trong canh tác",
    excerpt:
      "Khám phá những công nghệ mới nhất đang thay đổi ngành nông nghiệp...",
    author: "Nguyễn Văn An",
    date: "2024-01-15",
    views: 1250,
  },
  {
    title: "Kỹ thuật trồng lúa hữu cơ: Từ giống đến thu hoạch",
    excerpt: "Hướng dẫn chi tiết về quy trình trồng lúa hữu cơ...",
    author: "Trần Thị Bình",
    date: "2024-01-12",
    views: 980,
  },
];

export function RecentContent() {
  return (
    <section className="w-full sm:px-20 md:px-36 lg:px-40 xl:px-52 py-8 md:py-12 bg-gray-50">
      <div className=" px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Tin tức & Blog mới nhất
          </h2>
          <p className="text-gray-600">
            Cập nhật thông tin và kiến thức nông nghiệp hàng ngày
          </p>
        </motion.div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Recent News */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-blue-600" />
                  Tin tức chính thức
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 md:space-y-4">
                <div className="space-y-3 md:space-y-4">
                  {recentNews.map((news, index) => (
                    <motion.div
                      key={index}
                      className="border-b pb-3 md:pb-4 last:border-b-0 last:pb-0"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {news.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-xs md:text-sm mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                        {news.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-600 mb-2 line-clamp-2">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(news.date).toLocaleDateString("vi-VN")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {news.views}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/news" className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs md:text-sm"
                  >
                    Xem tất cả tin tức
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Blogs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Blog nông dân
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-3 md:space-y-4">
                <div className="space-y-3 md:space-y-4">
                  {recentBlogs.map((blog, index) => (
                    <motion.div
                      key={index}
                      className="border-b pb-3 md:pb-4 last:border-b-0 last:pb-0"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="font-semibold text-xs md:text-sm mb-2 line-clamp-2 hover:text-green-600 cursor-pointer">
                        {blog.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-600 mb-2 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-500">
                        <span>Bởi {blog.author}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.date).toLocaleDateString("vi-VN")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {blog.views}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/blog" className="mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs md:text-sm"
                  >
                    Xem tất cả blog
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
