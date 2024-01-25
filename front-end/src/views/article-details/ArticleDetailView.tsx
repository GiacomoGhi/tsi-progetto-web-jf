import App from 'App'
import './ArticleDetailView.styles.scss'
import { PostDto } from 'infrastructure/api-client/dto/post.dto'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'components/modal-wrapper/ModalWrapper'

const ArticleDetailView: React.FC<{ userId: string; username: string; userRole: string }> = ({
  userId,
  username,
  userRole
}) => {
  const params = useParams()
  const navigate = useNavigate()
  const articleId = params.articleId || ''
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [titleOnEdit, setTitleOnEdit] = useState('')
  const [bodyOnEdit, setBodyOnEdit] = useState('')
  const [status, setStatus] = useState(false)
  const [posts, setPosts] = useState<PostDto[]>([])
  const [postsCount, setPostsCount] = useState(0)
  const [showEditor, setShowEditor] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const [saveStatusArticle, setSaveStatusArticle] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentUserIsAuthor, setCurrentUserIsAuthor] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const fetchArticle = async () => {
    const { apiClient } = App
    const articleId = params.articleId || ''

    const response = await apiClient.articles.getById(articleId)
    if (!response.hasErrors && response.data) {
      setTitle(response.data.title)
      setBody(response.data.description)
      setTitleOnEdit(response.data.title)
      setBodyOnEdit(response.data.description)
      setStatus(response.data.isNews || false)
      setCurrentUserIsAuthor(userId === response.data.createdByUserId)
    }
  }

  const fetchPosts = async (from: number, to: number) => {
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

  const updateStatus = async () => {
    const { apiClient } = App

    const response = await apiClient.articles.update(articleId, { isNews: !status })

    if (!response.hasErrors && response.data) {
      setStatus(response.data.isNews || false)
    }
  }

  const updateArticle = async () => {
    const { apiClient } = App

    const response = await apiClient.articles.update(articleId, { title: titleOnEdit, description: bodyOnEdit })

    if (!response.hasErrors && response.data) {
      setTitle(response.data.title)
      setBody(response.data.description)
      setTitleOnEdit(response.data.title)
      setBodyOnEdit(response.data.description)
      setEditing(false)
      setSaveStatusArticle('')
    } else {
      setSaveStatusArticle('1')
    }
  }

  const deleteArticle = async () => {
    const { apiClient } = App

    const response = await apiClient.articles.delete(articleId)

    if (!response.hasErrors) {
      navigate('/community')
    }
  }

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateArticle()
  }

  const handleDelete = () => {
    deleteArticle()
  }

  const handleEditClose = () => {
    setEditing(false)
  }

  const handleDeleteClose = () => {
    setDeleting(false)
  }

  const handleUpdateStatus = () => {
    updateStatus()
  }

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
      <div className="mx-3 p-4 pb-2 borderContainer">
        {(userRole === '2' || userRole === '1' || currentUserIsAuthor) && (
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
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setEditing(true)
                  }}>
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setDeleting(true)
                  }}>
                  Delete
                </button>
              </li>
              {(userRole === '2' || userRole === '1') && (
                <li>
                  <div className="ms-3">
                    <input
                      type="checkbox"
                      id="myCheckbox"
                      name="myCheckbox"
                      aria-labelledby="checkboxLabel"
                      checked={status}
                      onChange={handleUpdateStatus}
                    />
                    <label htmlFor="myCheckbox" className="ms-1 mb-1" id="checkboxLabel">
                      Is News
                    </label>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
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
      <Modal isOpen={editing} onClose={handleEditClose}>
        <form onSubmit={handleEditSave}>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="title"></label>
              <textarea
                className="formContent"
                rows={1}
                placeholder="Titolo"
                id="title"
                name="title"
                value={titleOnEdit}
                maxLength={100}
                required
                onChange={e => {
                  setTitleOnEdit(e.target.value)
                }}
              />
            </div>
            <div>
              <label htmlFor="content"></label>
              <textarea
                className="formContent"
                placeholder="Contenuto"
                id="content"
                name="content"
                value={bodyOnEdit}
                maxLength={4000}
                rows={8}
                required
                onChange={e => {
                  setBodyOnEdit(e.target.value)
                }}
              />
            </div>
          </div>
          {saveStatusArticle === '1' && (
            <p className="text-danger">Something went wrong while saving your article, please try again</p>
          )}
          <div className="d-flex justify-content-center">
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={deleting} onClose={handleDeleteClose}>
        <div className="mt-4 p-4">
          <h1 className="text-danger">Stai eliminando l'articolo</h1>
          <h2 className="mb-5">Vuoi veramente procedere?</h2>
          <div className="row mb-sm-3 text-center">
            <div className="col-6">
              <button className="button" onClick={handleDeleteClose}>
                No
              </button>
            </div>
            <div className="col-6">
              <button className="button" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ArticleDetailView
