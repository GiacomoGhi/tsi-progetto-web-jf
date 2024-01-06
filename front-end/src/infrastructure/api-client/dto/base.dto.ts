export interface BaseDto {
  id: string
  active: boolean
  createdAt?: string
  lastModifiedAt?: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
