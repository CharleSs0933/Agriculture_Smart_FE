"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogCategories } from "@/lib/constants";

const popularTags = [
  "IoT",
  "AI",
  "Hữu cơ",
  "Bền vững",
  "Hydroponics",
  "Công nghệ",
  "Kỹ thuật",
  "Thị trường",
];

export function BlogSidebar() {
  return (
    <div className="lg:w-1/4">
      <Card>
        <CardHeader>
          <CardTitle>Danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <TabsList className="grid grid-cols-2 lg:grid-cols-1 gap-2 h-auto bg-transparent">
            {blogCategories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="justify-start gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Thẻ phổ biến</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
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
  );
}
