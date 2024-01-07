import Cookies from 'js-cookie'

export default class JwtCookieService {
  protected name = 'jwt_auth'

  public getJwtToken(): string | undefined {
    return Cookies.get(this.name)
  }

  public setJwtToken(token: string, expiration: number) {
    const expirationDate = new Date()
    expirationDate.setTime(expirationDate.getTime() + expiration * 1000)

    Cookies.set(this.name, token, { expires: expirationDate })
  }

  public removeJwtToken() {
    Cookies.remove(this.name)
  }
}
