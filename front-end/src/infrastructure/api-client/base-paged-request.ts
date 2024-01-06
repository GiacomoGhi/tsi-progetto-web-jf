export interface BasePagedRequest {
  from: number
  to: number
  active?: boolean
  searchText?: string
  searchTextField?: string
  join?: string[]
  filters?: any[]
}
