interface User {
  id: number;
  userName: string;
  email: string;
  address: string;
  isActive: boolean;
  createAt: string;
  updatedAt: string;
  roles: string[];
}

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
  rating: number;
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

interface AnalysisResult {
  plant_name: string;
  disease_name: string;
  confidence: number;
  symptoms: string[];
  description: string;
  treatment: string;
}

interface Farmer {
  id: number;
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  farmLocation: string;
  farmSize: number;
  cropTypes: string;
  farmingExperienceYears: number;
  createdAt: string;
  updatedAt: string;
}

interface Engineer {
  id: number;
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  specialization: string;
  experienceYears: number;
  certification: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}
interface Ticket {
  id: number;
  title: string;
  category: string;
  cropType: string;
  location: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  contactMethod: string;
  phoneNumber: string;
  imageUrl: string;
  status: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;

  farmer?: Farmer;
  assignedEngineer?: Engineer;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  categoryName: string;
  authorName: string;
  createdAt: string;
  publishedAt: string | null;
  viewCount: number;
}

interface BlogPostDetail {
  id: number;
  title: string;
  content: string;
  featuredImage: string;
  slug: string;
  status: "draft" | "published" | "archived";
  viewCount: number;
  categoryName: string;
  categoryId: number;
  authorName: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
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

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: Product;
}

interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  paymentMethod: "cod" | "bank_transfer" | "wallet";
  paymentStatus: "pending" | "paid" | "failed";
  paidAt: string;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  userName: string;
  userEmail: string;
  orderItems: OrderItem[];
}
