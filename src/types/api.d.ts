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
