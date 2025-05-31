"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogHeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function BlogHero({ searchTerm, onSearchChange }: BlogHeroProps) {
  return (
    <section className="w-full py-12 md:py-16 bg-green-50">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Blog Nông Dân
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nơi các nông dân chia sẻ kinh nghiệm, kỹ thuật canh tác và câu
              chuyện thành công trong sản xuất nông nghiệp.
            </p>
          </div>
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
