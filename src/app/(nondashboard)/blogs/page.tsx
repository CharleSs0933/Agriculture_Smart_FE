"use client";

import { BlogGrid } from "@/components/blogs/BlogGrid";
import { BlogHero } from "@/components/blogs/BlogHero";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { blogPosts } from "@/lib/constants";
import { useState } from "react";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      <BlogHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <section className="w-full py-12 bg-gray-50">
        <div className="px-4 md:px-6">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <BlogSidebar />
              <div className="lg:w-3/4">
                <TabsContent value={selectedCategory} className="mt-0">
                  <BlogGrid posts={filteredPosts} />
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
