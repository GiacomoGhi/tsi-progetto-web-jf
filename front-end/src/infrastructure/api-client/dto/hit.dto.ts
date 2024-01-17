import { BaseDto } from './base.dto'

export interface HitDto extends BaseDto {
  topic?: string
  author?: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
