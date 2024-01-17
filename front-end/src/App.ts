import JwtCookieService from 'infrastructure/cookies/JwtCookieService'
import pack from '../package.json'
import { AuthApiClient } from './infrastructure/api-client/auth.api-client'
import { UserApiClient } from 'infrastructure/api-client/user.api-client'
import { AuthService } from 'infrastructure/auth/AuthService'
import { ArticleApiClient } from 'infrastructure/api-client/article.api-client'
import { DictionaryApiClient } from 'infrastructure/api-client/dictionary.api-client'
import { HitApiClient } from 'infrastructure/api-client/hit.api-client'
import { PostApiClient } from 'infrastructure/api-client/post.api-client'

export interface ApiClientService {
  users: UserApiClient
  loggedUser: AuthApiClient
  articles: ArticleApiClient
  terms: DictionaryApiClient
  hits: HitApiClient
  posts: PostApiClient
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

  public auth!: AuthService

  private constructor(name: string, displayName: string, version: string) {
    this.name = name
    this.version = version
    this.displayName = displayName
  }

  private async configureJwtCookieService(): Promise<boolean> {
    this.cookie = new JwtCookieService()

    return true
  }

  private async configureApiClientService(): Promise<boolean> {
    this.apiClient = {
      users: new UserApiClient('user'),
      loggedUser: new AuthApiClient('auth/me'),
      articles: new ArticleApiClient('article'),
      terms: new DictionaryApiClient('term'),
      hits: new HitApiClient('hit'),
      posts: new PostApiClient('post')
    }
    return true
  }

  private async configureAuthService(): Promise<boolean> {
    this.auth = new AuthService()

    return true
  }

  private async configureServices(): Promise<boolean> {
    let result = true

    result = result && (await this.configureJwtCookieService())
    result = result && (await this.configureApiClientService())
    result = result && (await this.configureAuthService())

    return result
  }

  public async loadState(invert: boolean) {
    return !invert
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
