import App from '../../App'

export abstract class BaseApiClient {
  constructor(protected controllerUrl: string) {}

  protected abortController = new AbortController()
  protected signal = this.abortController.signal

  protected get token() {
    const { cookie } = App
    const token = cookie.getJwtToken()

    return token ? token : this.loginRedirect()
  }

  protected get baseUrl() {
    const apiUrl = process.env['BASE_API_URL'] ?? ''
    return `${apiUrl}/${this.controllerUrl}`
  }

  protected async checkSessionExpired(response: Response) {
    if (!response.ok && response.status === 401) {
      this.loginRedirect()
    }
  }

  private loginRedirect() {
    //window.location.href = '/login'
  }
}
