import { BaseDto } from './base.dto'

export interface HitDto extends BaseDto {
  articleId: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
