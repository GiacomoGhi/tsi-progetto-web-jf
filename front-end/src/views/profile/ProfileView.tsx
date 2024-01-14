import React, { useEffect, useState } from 'react'
import './ProfileView.styles.scss'
import App from 'App'
import { UserDto } from 'infrastructure/api-client/dto/user.dto'

const ProfileView: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [fromIsChanged, setFormIsChanged] = useState(false)
  const [userId, setUserId] = useState('')
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

  const fetchData = async (from: number, to: number) => {
    const { apiClient } = App

    const response = await apiClient.loggedUser.check()

    if (!response.hasErrors && response.data) {
      initFormData(response.data as Partial<UserDto>)
    }
  }

  const initFormData = (initialFormData: Partial<UserDto>) => {
    const tempData = {
      email: initialFormData.email,
      name: initialFormData.name,
      surname: initialFormData.surname,
      nickName: initialFormData.nickName
    }
    setUserId(initialFormData.id || '')
    setInitialData(tempData)
    setFormData(tempData)
    setFormIsChanged(false)
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

  const saveData = async () => {
    const { apiClient } = App
    const response = await apiClient.users.update(userId, formData)

    if (!response.hasErrors && response.data) {
      initFormData(response.data as Partial<UserDto>)
    }
  }

  useEffect(() => {
    fetchData(0, 20)
  }, [])

  return (
    <>
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
                <span>{`POST ${0}`}</span>
                <span>{`Commenti ${0}`}</span>
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
        <button className="button">{'Eliminia il Mio Account :C'}</button>
      </div>
    </>
  )
}

export default ProfileView
