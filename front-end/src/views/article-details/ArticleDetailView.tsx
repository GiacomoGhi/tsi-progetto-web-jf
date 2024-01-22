import App from 'App'
import { PostDto } from 'infrastructure/api-client/dto/post.dto'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ArticleDetailView = () => {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posts, setPosts] = useState<PostDto[]>()

  const fetchItems = async () => {
    const { apiClient } = App
    const articleId = params.articleId || ''

    const response = await apiClient.articles.getById(articleId)
    //const postResponse = await apiClient.posts.paged()

    if (!response.hasErrors && response.data) {
      setTitle(response.data.title)
      setBody(response.data.description)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <div className="borderContainer">
        <h1>{title}</h1>
        <article>{body}</article>
      </div>
    </>
  )
}

export default ArticleDetailView
