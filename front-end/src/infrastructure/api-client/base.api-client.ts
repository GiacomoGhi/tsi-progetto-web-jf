import App from '../../App'

export abstract class BaseApiClient {
  constructor(protected controllerUrl: string) {}

  protected abortController = new AbortController()
  protected signal = this.abortController.signal

  protected get token() {
    const { cookie } = App
    return cookie.getJwtToken()
  }

  protected get baseUrl() {
    const apiUrl = process.env['BASE_API_URL'] ?? ''
    return `${apiUrl}/${this.controllerUrl}`
  }

  protected async checkSessionExpired(response: Response) {
    if (!response.ok && response.status === 401) {
      window.location.href = '/login'
    }
  }
}
