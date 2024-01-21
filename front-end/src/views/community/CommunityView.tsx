import React, { useCallback, useEffect, useRef, useState } from 'react'
import './CommunityView.styles.scss'
import App from 'App'
import { ArticleDto } from 'infrastructure/api-client/dto/article.dto'
import { HitDto } from 'infrastructure/api-client/dto/hit.dto'

type HitsStruct = { articleId: string; hits: number; checked: boolean }

const CommunityView = () => {
  const [articles, setArticles] = useState<ArticleDto[]>([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [hits, setHits] = useState<HitsStruct[]>([])
  const [checked, setChecked] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fetchItems = async (from: number, to: number, filtered = false) => {
    const { apiClient } = App

    const response = await apiClient.articles.paged({
      from,
      to
    })

    if (!response.hasErrors && response.data) {
      const data = [...articles, ...response.data.items]
      if (filtered) {
        await getHitCountForArticle(response.data.items)
        setArticlesCount(response.data.totalCount)
        setArticles(response.data.items)
      } else {
        await getHitCountForArticle(data)
        setArticlesCount(response.data.totalCount)
        setArticles(data)
      }
    }
  }

  const getHitCountForArticle = async (data: ArticleDto[]) => {
    const { apiClient } = App
    let articleHits: HitsStruct[] = []

    const currentUser = await apiClient.loggedUser.check()
    if (currentUser.hasErrors || !currentUser.data) return

    const userLikedArticlesResponse = await apiClient.hits.paged({
      from: 9999,
      to: 0,
      filters: [{ field: 'createdByUserId', value: currentUser.data.id }]
    })

    let userLikedArticles: HitDto[] = []

    if (!userLikedArticlesResponse.hasErrors && userLikedArticlesResponse.data) {
      userLikedArticles = userLikedArticlesResponse.data.items
    }
    console.log(userLikedArticles)

    for (let i = 0; i < data.length; i++) {
      const article = data[i]
      const response = await apiClient.hits.paged({
        from: 1,
        to: 0,
        filters: [{ field: 'articleId', value: article.id }]
      })
      if (!response.hasErrors && response.data) {
        const liked = userLikedArticles.some(item => item.articleId === article.id)
        console.log(liked)

        articleHits = [
          ...articleHits,
          {
            articleId: article.id,
            hits: response.data.totalCount,
            checked: liked
          }
        ]
      }
    }
    setHits(articleHits)
  }

  const handleHitCheck = (articleId: string) => {
    setHits(prevHits => {
      const index = prevHits.findIndex(hit => hit.articleId === articleId)
      const updatedHits = [...prevHits]
      updatedHits[index] = { ...updatedHits[index], checked: !updatedHits[index].checked }
      return updatedHits
    })
  }

  const handleFilterSelected = () => {
    fetchItems(10, 0, true)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const scrolled = container.scrollTop * 1.2
      const maxScroll = container.scrollHeight - container.clientHeight
      if (scrolled >= maxScroll) {
        if (articles.length === articlesCount) return
        fetchItems(articles.length + 5, articles.length)
      }
    }
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, articles])

  useEffect(() => {
    fetchItems(10, 0)
  }, [])

  return (
    <>
      <h1 className="ms-3 my-4">Post degli utenti</h1>
      <div className="scrollableContainerr mx-3 row pt-3" ref={containerRef}>
        {articles.map((article, i) => (
          <div key={i} className="col-md-6 px-2">
            <div className="borderContainer p-3">
              <h2>{article.title}</h2>
              <p className="mb-0">{article.description.slice(0, 200)}...</p>
              <div className="d-flex justify-content-between">
                <div className="mt-3">
                  <input
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    aria-labelledby="checkboxLabel"
                    checked={hits.find(hit => hit.articleId === article.id)?.checked || false}
                    onChange={() => {
                      handleHitCheck(article.id)
                    }}
                  />
                  <label htmlFor="myCheckbox" className="ms-1 mb-1" id="checkboxLabel">
                    Interessante: {hits.find(hit => hit.articleId === article.id)?.hits || 0}
                  </label>
                </div>
                <button className="button">Leggi Tutto</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <button className="button me-3 mb-4 mt-3">{'<< Scrivi un nuovo post  >>'}</button>
      </div>
    </>
  )
}

export default CommunityView
