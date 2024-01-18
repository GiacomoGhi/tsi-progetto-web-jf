import { BaseDto } from './base.dto'

export interface PostDto extends BaseDto {
  description?: string
  author?: string
  articleId?: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
