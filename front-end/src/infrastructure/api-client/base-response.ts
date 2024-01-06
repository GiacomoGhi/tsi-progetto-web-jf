export interface BaseResponse<T> {
  data: T | null
  hasErrors: boolean
  error?: string
}
