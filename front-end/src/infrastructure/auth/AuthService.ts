import App from 'App'
import { SingUpFormDto } from 'types/SingUpFormDto'

type LoginResponseDto = {
  access_token: string
  token_type: string
  expires_in: number
}

export class AuthService {
  protected baseUrl = process.env.REACT_APP_BASE_API_URL || ''

  public async singup(httpRequestContent: SingUpFormDto) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/sing-up`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(httpRequestContent)
      })

      const data = await response.json()
      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }

  public async login(email: string, password: string) {
    const { cookie } = App
    const httpRequestContent = {
      email: email,
      password: password
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(httpRequestContent)
      })

      const data: LoginResponseDto = await response.json()
      if (response.ok) {
        cookie.setJwtToken(data.access_token, data.expires_in)
        return true
      } else return false
    } catch (error: any) {
      return error
    }
  }

  public logout() {
    const { cookie } = App
    cookie.removeJwtToken()
  }
}
