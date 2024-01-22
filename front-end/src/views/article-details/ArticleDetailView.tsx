import App from 'App'
import { PostDto } from 'infrastructure/api-client/dto/post.dto'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const ArticleDetailView = () => {
  const params = useParams()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posts, setPosts] = useState<PostDto[]>([])
  const [postsCount, setPostsCount] = useState(0)
  const [deleteConfermation, setDeleteConfermation] = useState(false)
  const [userListIndex, setUserListIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fetchArticle = async () => {
    const { apiClient } = App
    const articleId = params.articleId || ''

    const response = await apiClient.articles.getById(articleId)
    if (!response.hasErrors && response.data) {
      setTitle(response.data.title)
      setBody(response.data.description)
    }
  }

  const fetchPosts = async (from: number, to: number, filtered = false) => {
    const { apiClient } = App
    const articleId = params.articleId || ''

    const response = await apiClient.posts.paged({
      from,
      to,
      filters: [{ field: 'articleId', value: articleId }]
    })

    if (!response.hasErrors && response.data) {
      const data = [...posts, ...response.data.items]
      setPostsCount(response.data.totalCount)
      setPosts(data)
    }
  }

  // const updateAndReplace = async (indexId: number) => {
  //   const { apiClient } = App
  //   const userToUpdate = posts[indexId]
  //   const response = await apiClient.users.update(userToUpdate.id, { active: !userToUpdate.active })

  //   if (!response.hasErrors && response.data) {
  //     const newUserList = [...users]
  //     newUserList[indexId] = response.data
  //     setUsers(newUserList)
  //   }
  // }

  // const upgradeAndReplace = async (indexId: number, currentRole: string) => {
  //   const { apiClient } = App
  //   const userToUpdate = users[indexId]
  //   let newRoleAsNumber = parseInt(currentRole) + 1
  //   if (newRoleAsNumber > 2) {
  //     newRoleAsNumber = 0
  //   }
  //   const newRole = newRoleAsNumber.toString()
  //   const response = await apiClient.users.update(userToUpdate.id, { role: newRole, active: true })

  //   if (!response.hasErrors && response.data) {
  //     const newUserList = [...users]
  //     newUserList[indexId] = response.data
  //     setUsers(newUserList)
  //   }
  // }

  // const deleteAndReplace = async (indexId: number) => {
  //   const { apiClient } = App
  //   const userToUpdate = users[indexId]
  //   const response = await apiClient.users.softDelete(userToUpdate.id)

  //   if (!response.hasErrors && response.data) {
  //     const newUserList = [...users]
  //     console.log(response.data)

  //     newUserList[indexId] = response.data
  //     setUsers(newUserList)
  //     setDeleteConfermation(false)
  //     setUserListIndex(-1)
  //   }
  // }

  // const handleUpdateAndReplace = (indexId: number) => {
  //   updateAndReplace(indexId)
  // }
  // const handleUpgradeAndReplace = (indexId: number, role: string) => {
  //   upgradeAndReplace(indexId, role)
  // }

  // const handleDeleteAndReplace = () => {
  //   if (!(userListIndex === -1)) {
  //     deleteAndReplace(userListIndex)
  //   }
  // }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const handleScroll = () => {
      const scrolled = container.scrollTop * 1.2
      const maxScroll = container.scrollHeight - container.clientHeight
      if (scrolled >= maxScroll) {
        if (posts.length === postsCount) return
        fetchPosts(posts.length + 5, posts.length)
      }
    }
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, posts])

  useEffect(() => {
    fetchArticle()
    fetchPosts(10, 0)
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
