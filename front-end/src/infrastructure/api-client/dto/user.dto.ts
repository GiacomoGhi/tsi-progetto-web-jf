import { BaseDto } from './base.dto'

export interface UserDto extends BaseDto {
  email?: string
  nickName?: string
  firstName?: string
  surname?: string
  role?: number
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
