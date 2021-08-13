export interface PagedList<T> {
  totalCount: number;
  pageSize: number;
  page: number;
  totalPages: number;
  items: T[];
}
