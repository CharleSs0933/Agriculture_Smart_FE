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

interface Cart {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
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

interface AnalysisResult {
  plant_name: string;
  disease_name: string;
  confidence: number;
  symptoms: string[];
  description: string;
  treatment: string;
}

interface Ticket {
  id: number;
  title: string;
  category: string;
  cropType: string;
  location: string;
  description: string;
  priority: "low" | "medium" | "high";
  phoneNumber: string;
  imageUrl: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  farmerId: number;
  assignedEngineerId: number | null;
}

interface News {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  categoryId: number;
  categoryName: string;
  featured: boolean;
  urgent: boolean;
  tags: string;
  source: string;
  imageUrl: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}
