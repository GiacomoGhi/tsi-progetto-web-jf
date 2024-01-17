import { BaseDto } from './base.dto'

export interface DictionaryDto extends BaseDto {
  listKey?: string
  listValue?: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
