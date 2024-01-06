import { BasePagedRequest } from './base-paged-request'
import { BaseResponse } from './base-response'
import { BaseApiClient } from './base.api-client'
import { BaseDto } from './dto/base.dto'
import { PagedResultDto } from './paged-result'

export abstract class BaseEntityApiClient<T extends BaseDto> extends BaseApiClient {
  constructor(controllerUrl: string) {
    super(controllerUrl)
  }

  async paged(request: BasePagedRequest): Promise<BaseResponse<PagedResultDto<T>>> {
    const httpRequestContent = {
      take: request.from,
      skip: request.to,
      filters: [] as any,
      join: request.join,
      orderBy: {
        lastModifiedAt: 'desc'
      }
    }

    if (request.active != null) {
      httpRequestContent.filters = [
        {
          field: 'active',
          type: 4,
          operator: 2,
          value: [request.active]
        }
      ]
    }

    if (request.filters != null) {
      httpRequestContent.filters = request.filters
    }

    if (request.searchText && request.searchTextField) {
      httpRequestContent.filters.push({
        field: request.searchTextField,
        type: 0,
        operator: 0,
        value: [request.searchText]
      })
    }

    try {
      const response = await fetch(`${this.baseUrl}/paged`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(httpRequestContent),
        signal: this.signal
      })
      await this.checkSessionExpired(response)

      const data: PagedResultDto<T> = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }

  async getById(id: string): Promise<BaseResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      await this.checkSessionExpired(response)

      const data: T = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }

  async create(item: Partial<T>): Promise<BaseResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(item)
      })
      await this.checkSessionExpired(response)

      const data: T = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }

  async update(id: string, item: Partial<T>): Promise<BaseResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(item)
      })
      await this.checkSessionExpired(response)

      const data: T = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }

  async delete(id: string): Promise<BaseResponse<null>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      await this.checkSessionExpired(response)

      let data
      if (!response.ok) {
        data = await response.json()
      }

      return { hasErrors: !response.ok, data: null, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }
}
