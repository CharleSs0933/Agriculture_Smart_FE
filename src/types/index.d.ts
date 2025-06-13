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

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  stock: number;
  rating?: number;
  reviews?: number;
  imageUrl: string;
  isActive: boolean;
  sku: string;
  discountPrice: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
  sku: string;
}

interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  reviewValue: number;
  reviewMessage: string;
  createdAt: string;
}

interface User {
  id?: number;
  username: string;
  email: string;
  avatar?: string;
  role: "Farmer" | "Admin" | "Engineer";
}
