export type PaginatedResponseDto<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export type PaginatedResponse<T> = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: T[];
};
