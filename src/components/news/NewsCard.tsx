import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Eye,
  ArrowRight,
  AlertTriangle,
  Building,
} from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact" | "list";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-blue-600">Nổi bật</Badge>
            {article.urgent && (
              <Badge className="bg-red-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Khẩn cấp
              </Badge>
            )}
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Badge variant="outline">{article.category}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.views}
            </span>
          </div>
          <CardTitle className="line-clamp-2 text-xl">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {article.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building className="h-3 w-3" />
              <span className="truncate">{article.source}</span>
            </div>
          </div>
          <Link href={`/news/${article.id}`}>
            <Button className="w-full">
              Đọc chi tiết
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="w-24 h-24 relative flex-shrink-0">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Badge variant="outline" className="text-xs">
                {article.category}
              </Badge>
              {article.urgent && (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  Khẩn cấp
                </Badge>
              )}
              <span>
                {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {article.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-48 h-32 relative flex-shrink-0">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{article.category}</Badge>
                {article.urgent && (
                  <Badge className="bg-red-100 text-red-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Khẩn cấp
                  </Badge>
                )}
              </div>
              <Link href={`/news/${article.id}`}>
                <Button variant="outline" size="sm">
                  Đọc thêm
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.views} lượt xem
                </span>
                <span className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {article.source}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
        />
        {article.urgent && (
          <Badge className="absolute top-4 left-4 bg-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Khẩn cấp
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Badge variant="outline" className="text-xs">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-3 mb-4">
          {article.excerpt}
        </CardDescription>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Building className="h-3 w-3" />
            <span className="truncate text-xs">{article.source}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Eye className="h-3 w-3" />
            {article.views}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/news/${article.id}`}>
          <Button variant="outline" className="w-full" size="sm">
            Đọc chi tiết
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
