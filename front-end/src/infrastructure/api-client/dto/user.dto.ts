import { BaseDto } from './base.dto'

export interface UserDto extends BaseDto {
  email: string
  firstName: string
  lastName: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
