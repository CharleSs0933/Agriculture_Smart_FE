interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  image: string;
  views: number;
  featured: boolean;
  urgent: boolean;
  tags: string[];
  source: string;
}
