import { BaseEntityApiClient } from './base-entity.api-client'
import { BasePagedRequest } from './base-paged-request'
import { BaseResponse } from './base-response'
import { ArticleDto } from './dto/article.dto'
import { PagedResultDto } from './paged-result'

export class ArticleApiClient extends BaseEntityApiClient<ArticleDto> {
  async newsPaged(request: BasePagedRequest): Promise<BaseResponse<PagedResultDto<ArticleDto>>> {
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
      const response = await fetch(`${this.baseUrl}/news-paged`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(httpRequestContent),
        signal: this.signal
      })
      await this.checkSessionExpired(response)

      const data: PagedResultDto<ArticleDto> = await response.json()

      return { hasErrors: !response.ok, data, error: response.ok ? undefined : JSON.stringify(data) }
    } catch (error: any) {
      return { hasErrors: true, error, data: null }
    }
  }
}
