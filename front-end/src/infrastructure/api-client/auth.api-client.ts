import { BaseApiClient } from './base.api-client'

export class AuthApiClient extends BaseApiClient {
  async getUser() {
    //http://localhost:3333/api/v1/auth/me
    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      const data = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error) {
      return { hasErrors: true, error, data: null }
    }
  }
}
