import { BaseDto } from './base.dto'

export interface ArticleDto extends BaseDto {
  title?: string
  description?: string
  firstName?: string
  surname?: string
  image?: Buffer
  isNews?: boolean
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
