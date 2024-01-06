import Cookies from 'universal-cookie'

export default class JwtCookieService {
  protected name = 'jwt_auth'
  protected cookies = new Cookies()

  public getJwtToken(): string | null {
    return this.cookies.get(this.name)
  }

  public setJwtToken(token: string, expriation: number) {
    this.cookies.set(this.name, token, {
      expires: new Date(expriation * 1000) // shifts milliseconds in seconds
    })
  }

  public removeJwtToken() {
    this.cookies.remove(this.name)
  }
}
