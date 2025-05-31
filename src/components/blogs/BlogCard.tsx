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
  User,
  Eye,
  ArrowRight,
  Heart,
  MessageSquare,
} from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-4 left-4 bg-green-600">Nổi bật</Badge>
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Badge variant="outline">{post.category}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </span>
          </div>
          <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="h-3 w-3" />
              {post.author}
            </div>
            <Link href={`/blog/${post.id}`}>
              <Button variant="outline" size="sm">
                Đọc thêm
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
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
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Badge variant="outline" className="text-xs">
                {post.category}
              </Badge>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {post.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{post.excerpt}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-3 mb-4">
          {post.excerpt}
        </CardDescription>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User className="h-3 w-3" />
            <span className="truncate">{post.author}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </span>
            {post.likes && (
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {post.likes}
              </span>
            )}
            {post.comments && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {post.comments}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" className="w-full" size="sm">
            Đọc thêm
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
