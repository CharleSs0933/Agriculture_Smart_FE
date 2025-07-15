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
  pageNumber?: number;
  pageSize?: number;
  farmLocation?: string;
  farmSize?: number;
  cropTypes?: string;
}

interface EngineerQueryParams {
  pageNumber?: number;
  pageSize?: number;
  specialization?: string;
  experienceYears?: number;
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

interface FarmerMutation {
  farmLocation: string;
  farmSize: number;
  cropTypes: string[];
  farmingExperienceYears: number;
}

interface OrdersQueryParams {
  pageNumber?: number;
  pageSize?: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed";
}

interface TicketUpdateRequest {
  id: number;
  status: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  assignedEngineerId?: number;
  notes?: string;
}
