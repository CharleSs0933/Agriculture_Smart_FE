interface LoginResponse {
  token: string;
  expiration: string;
  username: string;
  email: string;
  role: Farmer | Admin | Engineer;
}

interface ApiResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface ProductsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  Name?: string;
  Description?: string;
  CategoryName?: string;
  SortByDiscountPrice?: boolean;
}

interface AIAnalysis {
  plant_name: string;
  disease_name: string;
  confidence: number;
}

interface CreateTicketRequest {
  title: string;
  category: string;
  cropType: string;
  location: string;
  description: string;
  priority: string;
  phoneNumber: string;
  imageUrl: string;
}

interface NewsQueryParams {
  page?: number;
  pageSize?: number;
  title?: string;
  author?: string;
  categoryId?: number;
}

interface BlogsQueryParams {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
  author?: string;
  categoryId?: number;
  status?: "published" | "draft" | "archived";
}

interface BlogFormParams {
  categoryId: number;
  title: string;
  content: string;
  featuredImage: string;
  slug: string;
  status: "draft" | "published" | "archived";
}
interface AdminProductsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  Name?: string;
  Description?: string;
  CategoryName?: string;
  IsActive?: boolean;
  SortByDiscountPrice?: boolean;
}

interface FarmerQueryParams {
  pageIndex?: number;
  pageSize?: number;
}

interface TicketsQueryParams {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
  farmerName?: string;
  assignedEngineerName?: string;
  status?: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high" | "urgent";
}
