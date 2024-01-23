import React, { useEffect, useState } from 'react'
import './ProfileView.styles.scss'
import App from 'App'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'
import Modal from 'components/modal-wrapper/ModalWrapper'
import AdminUsersAction from 'components/admin-users-action/AdminsUsersAction'

const ProfileView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [fromIsChanged, setFormIsChanged] = useState(false)
  const [userId, setUserId] = useState('')
  const [adminUser, setAdminUser] = useState(false)
  const [postCounter, setPostCounter] = useState(0)
  const [articleCounter, setArticleCounter] = useState(0)
  const [showdeleteConfermation, setShowdeleteConfermation] = useState(false)
  const [formData, setFormData] = useState<Partial<UserDto>>({
    email: '',
    name: '',
    surname: '',
    nickName: '',
    passwordHash: ''
  })
  const [initialData, setInitialData] = useState<Partial<UserDto>>({
    email: '',
    name: '',
    surname: '',
    nickName: '',
    passwordHash: ''
  })

  const initFormData = (initialFormData: Partial<UserDto>) => {
    const tempData = {
      email: initialFormData.email,
      name: initialFormData.name,
      surname: initialFormData.surname,
      nickName: initialFormData.nickName
    }
    setAdminUser(initialFormData.role === '1')
    setUserId(initialFormData.id || '')
    setInitialData(tempData)
    setFormData(tempData)
    setFormIsChanged(false)
  }

  const fetchData = async (from: number, to: number) => {
    const { apiClient } = App

    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data) {
      initFormData(response.data as Partial<UserDto>)
      const user = response.data as unknown as UserDto

      const postsResponse = await apiClient.posts.paged({
        from: 1,
        to: 0,
        filters: [{ field: 'createdByUserId', value: user.id }]
      })
      const articlesResponse = await apiClient.articles.paged({
        from: 1,
        to: 0,
        filters: [{ field: 'createdByUserId', value: user.id }]
      })
      if (!postsResponse.hasErrors && postsResponse.data && !articlesResponse.hasErrors && articlesResponse.data) {
        setArticleCounter(articlesResponse.data.totalCount)
        setPostCounter(postsResponse.data.totalCount)
      }
    }
  }

  const saveData = async () => {
    const { apiClient } = App
    const response = await apiClient.users.update(userId, formData)

    if (!response.hasErrors && response.data) {
      initFormData(response.data as Partial<UserDto>)
    }
  }

  const deleteData = async () => {
    const { apiClient } = App

    const response = await apiClient.users.delete(userId)

    if (!response.hasErrors) {
      setShowdeleteConfermation(false)
      onLogout()
    }
  }

  const handleLogout = () => {
    onLogout()
  }

  const handleFormReset = () => {
    setFormData(initialData)
    setFormIsChanged(false)
  }

  const handleSave = () => {
    saveData()
  }

  const handleDelete = () => {
    deleteData()
  }

  const handleModalClose = () => {
    setShowdeleteConfermation(false)
  }

  useEffect(() => {
    fetchData(0, 20)
  }, [])

  return (
    <>
      <Modal isOpen={showdeleteConfermation} onClose={handleModalClose}>
        <div className="mt-4 p-4">
          <h1 className="text-danger">Stai eliminando il tuo account</h1>
          <h2 className="mb-5">Vuoi veramente procedere?</h2>
          <div className="row mb-sm-3 text-center">
            <div className="col-6">
              <button className="button" onClick={handleModalClose}>
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
      <div className="d-flex justify-content-between mx-3 mx-sm-5 mt-3">
        <h1>I Miei Dati</h1>
        <button className="button" onClick={handleLogout}>
          {'<< Logout >>'}
        </button>
      </div>
      <div className="borderContainer">
        <form className="mt-3">
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                disabled
                defaultValue={initialData.email}
                className="form-control"
                placeholder="Indirizzo email"
                type="email"
              />
            </div>
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="Nickname"
                type="text"
                value={formData.nickName}
                onChange={e => {
                  setFormData({ ...formData, nickName: e.target.value })
                  setFormIsChanged(true)
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="Nome"
                type="text"
                value={formData.name || ''}
                onChange={e => {
                  setFormData({ ...formData, name: e.target.value })
                  setFormIsChanged(true)
                }}
                required
              />
            </div>
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="Cognome"
                type="text"
                value={formData.surname || ''}
                onChange={e => {
                  setFormData({ ...formData, surname: e.target.value })
                  setFormIsChanged(true)
                }}
                required
              />
            </div>
          </div>
          <div className="row mb-sm-3">
            <div className="col-sm-6 mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={formData.passwordHash || ''}
                onChange={e => {
                  setFormData({ ...formData, passwordHash: e.target.value })
                  setFormIsChanged(true)
                }}
                required
              />
            </div>
            <div className="col-sm-6 px-sm-5">
              <div className="d-flex justify-content-between secondaryBorderContainer">
                <span>{`Post: ${articleCounter}`}</span>
                <span>{`Commenti: ${postCounter}`}</span>
                <div></div>
              </div>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-between mx-0 mx-sm-5">
          <button className="formButton ms-4" disabled={!fromIsChanged} onClick={handleFormReset}>
            {'< < Annulla Modifiche'}
          </button>
          <button className="formButton ms-4" disabled={!fromIsChanged} onClick={handleSave}>
            {'Salva Modifiche > >'}
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5 pb-5 mt-3">
        <button
          className="button"
          onClick={() => {
            setShowdeleteConfermation(true)
          }}>
          {'Eliminia il Mio Account :C'}
        </button>
      </div>
      {adminUser && <AdminUsersAction />}
    </>
  )
}

export default ProfileView
