import { BaseDto } from './base.dto'

export interface ArticleDto extends BaseDto {
  title: string
  description: string
  image: string
  isNews?: boolean
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
