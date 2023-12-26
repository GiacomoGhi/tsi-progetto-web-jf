export interface PagedResultDto<T> {
  items: T[];
  skip: number;
  take: number;
  totalCount: number;
}
