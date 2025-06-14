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
  SortByDiscount?: boolean;
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
