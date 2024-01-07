import JwtCookieService from 'infrastructure/cookies/JwtCookieService'
import pack from '../package.json'
import { AuthApiClient } from './infrastructure/api-client/auth.api-client'
import { UserApiClient } from 'infrastructure/api-client/user.api-client'

export interface ApiClientService {
  auth: AuthApiClient
  users: UserApiClient
}

class App {
  private static instance: App

  public static getInstance() {
    if (!App.instance) {
      const appName = 'jf-tsi-progetto'
      const appDisplayName = 'TSI Progetto Ing. Sistemi Web'
      const appVersion: string = pack.version

      App.instance = new App(appName, appDisplayName, appVersion)
    }

    return App.instance
  }

  public isInitialized = false

  public name: string

  public displayName: string

  public version: string

  public apiClient!: ApiClientService

  public cookie!: JwtCookieService

  private constructor(name: string, displayName: string, version: string) {
    this.name = name
    this.version = version
    this.displayName = displayName
    console.log(version)
  }

  private async configureJwtCookieService(): Promise<boolean> {
    this.cookie = new JwtCookieService()

    return true
  }

  private async configureApiClientService(): Promise<boolean> {
    this.apiClient = {
      users: new UserApiClient('user'),
      auth: new AuthApiClient('auth')
    }
    return true
  }

  private async configureServices(): Promise<boolean> {
    let result = true

    result = result && (await this.configureJwtCookieService())
    result = result && (await this.configureApiClientService())

    return result
  }

  public async initialize(): Promise<boolean> {
    let appInitialized = false

    try {
      appInitialized = await this.configureServices()

      if (appInitialized) {
        console.log('App initialized.')
      } else {
        console.log('An error occured initializing app.')
      }
    } catch (error) {
      console.log('An error occured initializing app.', error)
    }

    this.isInitialized = appInitialized

    return appInitialized
  }
}

export default App.getInstance()
