import { BaseEntityApiClient } from './base-entity.api-client'
import { BaseResponse } from './base-response'
import { UserDto } from './dto/user.dto'

export class UserApiClient extends BaseEntityApiClient<UserDto> {
  async softDelete(id: string): Promise<BaseResponse<UserDto>> {
    try {
      const response = await fetch(`${this.baseUrl}/soft-delete/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      await this.checkSessionExpired(response)

      const data: UserDto = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }
}
