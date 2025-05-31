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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  views: number;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  likes?: number;
  comments?: number;
  tags: string[];
}

interface AnalysisResult {
  disease: string;
  confidence: number;
  symptoms: string[];
  description: string;
  treatment: string;
  products: Array<{
    name: string;
    type: string;
    description: string;
    price: string;
  }>;
}
