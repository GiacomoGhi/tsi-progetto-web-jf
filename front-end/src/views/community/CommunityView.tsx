import React, { useEffect, useRef, useState } from 'react'
import './CommunityView.styles.scss'
import App from 'App'
import { ArticleDto } from 'infrastructure/api-client/dto/article.dto'

const CommunityView = () => {
  const [articles, setArticles] = useState<ArticleDto[]>([])
  const [articlesCount, setArticlesCount] = useState(0)
  const [searchText, setSearchText] = useState('')
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
        setArticlesCount(response.data.totalCount)
        setArticles(response.data.items)
      } else {
        setArticlesCount(response.data.totalCount)
        setArticles(data)
      }
    }
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
      <div className="scrollableContainer" ref={containerRef}>
        {articles.map((article, i) => (
          <div key={i} className="borderContainer">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default CommunityView
