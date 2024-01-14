import { BaseDto } from './base.dto'

export interface UserDto extends BaseDto {
  email: string
  name: string
  surname: string
  nickName: string
  password: string
  createdByUserId?: string
  lastModifiedByUserId?: string
  createdByUserEmail?: string
  lastModifiedByUserEmail?: string
}
