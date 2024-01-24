import App from 'App'
import './ArticleDetailView.styles.scss'
import { PostDto } from 'infrastructure/api-client/dto/post.dto'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from 'components/modal-wrapper/ModalWrapper'

const ArticleDetailView: React.FC<{ userId: string; username: string }> = ({ userId, username }) => {
  const params = useParams()
  const articleId = params.articleId || ''
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posts, setPosts] = useState<PostDto[]>([])
  const [postsCount, setPostsCount] = useState(0)
  const [showEditor, setShowEditor] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [postDescription, setPostDescription] = useState('')
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { apiClient } = App

    const postToCreate: Partial<PostDto> = {
      description: postDescription,
      articleId: articleId
    }

    const response = await apiClient.posts.create(postToCreate)

    if (!response.hasErrors && response.data) {
      response.data.author = username
      const data = [response.data, ...posts]
      setPostsCount(postsCount + 1)
      setPosts(data)
      setSaveStatus('0')
      setPostDescription('')
      setShowEditor(false)
    } else {
      setSaveStatus('1')
    }
  }

  const handleModalClose = () => {
    setShowEditor(false)
    setSaveStatus('')
  }

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
      <Modal isOpen={showEditor} onClose={handleModalClose}>
        <div className="d-flex formContainer mt-4 p-2 justify-content-start">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <label htmlFor="comment"></label>
                <textarea
                  className="formContent"
                  placeholder="Comment"
                  id="comment"
                  name="comment"
                  value={postDescription}
                  maxLength={2000}
                  rows={6}
                  required
                  onChange={e => {
                    setPostDescription(e.target.value)
                  }}
                />
              </div>
            </div>
            {saveStatus === '1' && (
              <p className="text-danger">Something went wrong while saving your comment, please try again</p>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className="mx-3 p-4 pb-2 borderContainer">
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li>
              <button className="dropdown-item">Edit</button>
            </li>
            <li>
              <button className="dropdown-item">Delete</button>
            </li>
          </ul>
        </div>
        <div className="article">
          <h1 className="text-center">{title}</h1>
          <article>{body}</article>
        </div>
        <div>
          <div className="d-flex container justify-content-end">
            <button className="button" onClick={() => setShowEditor(true)}>
              Aggiungi un commento
            </button>
          </div>
          <div className="scrollableContainer_Adv" ref={containerRef}>
            {posts.map((post, i) => {
              return (
                <div key={i} className="row px-3">
                  <div
                    className={
                      'd-flex container ' +
                      (post.createdByUserId === userId ? 'justify-content-end' : 'justify-content-start')
                    }>
                    <div className="col-auto postContainer pb-3 offset-6">
                      <h2 className="postAuthor">{'> ' + post.author}</h2>
                      <article className="ms-2 pe-3">{post.description}</article>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleDetailView
